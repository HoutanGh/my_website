import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { books } from "../data/books";

const CARD_WIDTH = 370;
const CARD_GAP = 10;
const CARD_INSET = 12;
const COMMENT_MAX_HEIGHT = 150;
const VIEWPORT_INSET = 8;
const CLOSE_DELAY = 120;

const commentDate = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function datedComments(book) {
  return [...(book.comments ?? [])].sort((a, b) => a.date.localeCompare(b.date));
}

function formatCommentDate(date) {
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? date : commentDate.format(parsed);
}

function ReadingList() {
  const stageRef = useRef(null);
  const scrollRef = useRef(null);
  const cardRef = useRef(null);
  const commentContentRef = useRef(null);
  const activeAnchorRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [activeBookIndex, setActiveBookIndex] = useState(null);
  const [activeCommentIndex, setActiveCommentIndex] = useState(0);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [cardPosition, setCardPosition] = useState({ top: CARD_INSET, left: CARD_INSET });
  const [cardSide, setCardSide] = useState("right");
  const [commentHeight, setCommentHeight] = useState(0);

  const activeBook = activeBookIndex === null ? null : books[activeBookIndex];
  const comments = activeBook ? datedComments(activeBook) : [];
  const activeComment = comments[activeCommentIndex] ?? null;

  const positionCard = useCallback(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    const anchor = activeAnchorRef.current;

    if (!stage || !card || !anchor) return;

    const stageBox = stage.getBoundingClientRect();
    const anchorBox = anchor.getBoundingClientRect();
    const cardBox = card.getBoundingClientRect();
    const toolbarBox = card.querySelector(".book-comment-toolbar")?.getBoundingClientRect();
    const width = cardBox.width || Math.min(CARD_WIDTH, stageBox.width - (CARD_INSET * 2));
    const height = cardBox.height;
    const rightSide = anchorBox.right - stageBox.left + CARD_GAP;
    const leftSide = anchorBox.left - stageBox.left - width - CARD_GAP;
    const canFitRight = rightSide + width <= stageBox.width - CARD_INSET;
    const canFitLeft = leftSide >= CARD_INSET;
    let left;
    let side;

    if (canFitRight) {
      left = rightSide;
      side = "right";
    } else if (canFitLeft) {
      left = leftSide;
      side = "left";
    } else {
      left = Math.min(
        Math.max(CARD_INSET, anchorBox.left - stageBox.left),
        Math.max(CARD_INSET, stageBox.width - width - CARD_INSET),
      );
      side = "overlap";
    }

    const toolbarCenter = toolbarBox
      ? toolbarBox.top - cardBox.top + (toolbarBox.height / 2)
      : CARD_INSET;
    const desiredViewportTop = anchorBox.top + (anchorBox.height / 2) - toolbarCenter;
    const maxViewportTop = Math.max(VIEWPORT_INSET, window.innerHeight - height - VIEWPORT_INSET);
    const viewportTop = Math.min(
      Math.max(VIEWPORT_INSET, desiredViewportTop),
      maxViewportTop,
    );

    setCardPosition({ top: viewportTop - stageBox.top, left });
    setCardSide(side);
  }, []);

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setIsCommentOpen(false);
      closeTimerRef.current = null;
    }, CLOSE_DELAY);
  };

  useEffect(() => {
    if (!isCommentOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsCommentOpen(false);
    };
    const closeOutside = (event) => {
      if (!stageRef.current?.contains(event.target)) setIsCommentOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [isCommentOpen]);

  useLayoutEffect(() => {
    if (!activeComment || !commentContentRef.current) return;
    setCommentHeight(Math.min(commentContentRef.current.scrollHeight, COMMENT_MAX_HEIGHT));
  }, [activeComment]);

  useLayoutEffect(() => {
    if (isCommentOpen) positionCard();
  }, [activeBookIndex, activeCommentIndex, commentHeight, isCommentOpen, positionCard]);

  useEffect(() => {
    if (!isCommentOpen) return undefined;

    const scrollArea = scrollRef.current;
    window.addEventListener("resize", positionCard);
    scrollArea?.addEventListener("scroll", positionCard, { passive: true });
    return () => {
      window.removeEventListener("resize", positionCard);
      scrollArea?.removeEventListener("scroll", positionCard);
    };
  }, [isCommentOpen, positionCard]);

  useEffect(() => () => cancelClose(), []);

  const openBook = (index, anchor) => {
    cancelClose();
    activeAnchorRef.current = anchor;
    setActiveBookIndex(index);
    setActiveCommentIndex(0);
    setIsCommentOpen(true);
  };

  return (
    <>
      <div
        className="reading-stage"
        ref={stageRef}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div
          className="book-scroll"
          ref={scrollRef}
          tabIndex="0"
          aria-label="Scrollable reading list"
        >
          <table className="book-list">
            <tbody>
              {books.map((book, index) => {
                const isActive = isCommentOpen && activeBookIndex === index;

                return (
                  <tr key={`${book.status}-${book.title}`}>
                    <td>
                      <span className={`tag ${book.status.toLowerCase()}`}>
                        [{book.status}]
                      </span>
                    </td>
                    <td className={book.rtl ? "book-title-cell rtl" : "book-title-cell"}>
                      <button
                        className="book-title-button"
                        type="button"
                        aria-expanded={isActive}
                        aria-controls="book-comment-card"
                        onMouseEnter={(event) => openBook(index, event.currentTarget)}
                        onFocus={(event) => openBook(index, event.currentTarget)}
                        onClick={(event) => openBook(index, event.currentTarget)}
                      >
                        <span className="book-title-text">{book.title}</span>
                      </button>
                    </td>
                    <td>{book.author}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <aside
          className={`book-comment-card${isCommentOpen ? " is-visible" : ""}`}
          ref={cardRef}
          id="book-comment-card"
          aria-hidden={!isCommentOpen}
          aria-live="polite"
          data-side={cardSide}
          style={cardPosition}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {activeComment ? (
            <>
              <div className="book-comment-toolbar">
                <div className="book-comment-navigation">
                  <span className="book-comment-index">
                    {activeCommentIndex + 1} / {comments.length}
                  </span>
                  <div className="book-comment-arrows" aria-label="Browse dated comments">
                    <button
                      type="button"
                      aria-label="Older comment"
                      title="Older comment"
                      tabIndex={isCommentOpen ? 0 : -1}
                      disabled={activeCommentIndex === 0}
                      onClick={() => setActiveCommentIndex((index) => index - 1)}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      aria-label="Newer comment"
                      title="Newer comment"
                      tabIndex={isCommentOpen ? 0 : -1}
                      disabled={activeCommentIndex === comments.length - 1}
                      onClick={() => setActiveCommentIndex((index) => index + 1)}
                    >
                      →
                    </button>
                  </div>
                </div>
                <time className="book-comment-date" dateTime={activeComment.date}>
                  {formatCommentDate(activeComment.date)}
                </time>
              </div>
              <p
                className="book-comment-copy"
                style={{ height: commentHeight }}
              >
                <span
                  className="book-comment-copy-inner"
                  ref={commentContentRef}
                  key={`${activeBook.title}-${activeComment.date}-${activeCommentIndex}`}
                >
                  {activeComment.text}
                </span>
              </p>
            </>
          ) : null}
        </aside>
      </div>

      <div className="list-footer">
        <span>shelf: {books.length} tracked</span>
      </div>
    </>
  );
}

export default ReadingList;
