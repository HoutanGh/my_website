import { useCallback, useEffect, useRef, useState } from "react";
import { learning } from "../data/learning";
import Icon from "./Icon";
import ProjectLink from "./ProjectLink";

function OperatorItem({ status, children, action, active = false }) {
  return (
    <div className="operator-item">
      <span className={`tag${active ? " current" : ""}`}>[{status}]</span>
      <span>{children}</span>
      {action}
    </div>
  );
}

function LearningGrid() {
  const trackRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const [currentColumn, setCurrentColumn] = useState(0);

  const columns = ["piano", "language", "study"];

  const updateCurrentColumn = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const columnElements = [...track.querySelectorAll(".learning-column")];
    const closestIndex = columnElements.reduce((closest, column, index) => {
      const columnOffset = column.offsetLeft - track.offsetLeft;
      const closestOffset = columnElements[closest].offsetLeft - track.offsetLeft;
      return Math.abs(columnOffset - track.scrollLeft) < Math.abs(closestOffset - track.scrollLeft)
        ? index
        : closest;
    }, 0);
    setCurrentColumn(closestIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const handleScroll = () => {
      window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = window.setTimeout(updateCurrentColumn, 80);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.clearTimeout(scrollTimerRef.current);
    };
  }, [updateCurrentColumn]);

  const move = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const columnElements = [...track.querySelectorAll(".learning-column")];
    const nextIndex = Math.max(0, Math.min(currentColumn + direction, columnElements.length - 1));
    const target = columnElements[nextIndex];
    setCurrentColumn(nextIndex);
    track.scrollTo({
      left: target.offsetLeft - track.offsetLeft - track.clientWidth * 0.06,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="learning-stage">
        <div className="learning-columns" ref={trackRef} aria-label="Learning areas">
          <section className="learning-column" aria-labelledby="learning-piano">
            <h3 className="learning-column-title" id="learning-piano">Piano</h3>
            <div className="operator-list">
              {learning.piano.map((piece) => (
                <OperatorItem
                  key={piece.id}
                  status={piece.status}
                  active={piece.status === "LEARNING"}
                  action={(
                    <a
                      className="play-button"
                      href={piece.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Play on YouTube"
                      aria-label={`Play ${piece.title} on YouTube`}
                    >
                      <Icon name="play" />
                    </a>
                  )}
                >
                  {piece.title}
                </OperatorItem>
              ))}
            </div>
          </section>

          <section className="learning-column" aria-labelledby="learning-language">
            <h3 className="learning-column-title" id="learning-language">Language</h3>
            <div className="operator-list">
              <OperatorItem
                status={learning.language.status}
                active
              >
                {learning.language.prefix}{" "}
                <span className="rtl">{learning.language.title}</span>
              </OperatorItem>
            </div>
          </section>

          <section className="learning-column" aria-labelledby="learning-study">
            <h3 className="learning-column-title" id="learning-study">Study</h3>
            <div className="operator-list">
              <OperatorItem
                status={learning.study.status}
                active
                action={(
                  <ProjectLink href={learning.study.playlistUrl}>
                    {learning.study.completed} / {learning.study.total}
                  </ProjectLink>
                )}
              >
                {learning.study.title}
              </OperatorItem>
            </div>
          </section>
        </div>
      </div>

      <div className="learning-navigation" aria-label="Learning section navigation">
        <button
          className="learning-arrow"
          type="button"
          onClick={() => move(-1)}
          aria-label={`Previous learning section from ${columns[currentColumn]}`}
          disabled={currentColumn === 0}
        >
          ←
        </button>
        <button
          className="learning-arrow"
          type="button"
          onClick={() => move(1)}
          aria-label={`Next learning section from ${columns[currentColumn]}`}
          disabled={currentColumn === columns.length - 1}
        >
          →
        </button>
      </div>
    </>
  );
}

export default LearningGrid;
