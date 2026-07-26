import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import ProjectLink from "./ProjectLink";

const MOBILE_QUERY = "(max-width: 650px)";

function ProjectList({ items, selectedId, onSelect, area }) {
  const listRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    hasOverflow: false,
    atEnd: true,
    horizontal: false,
  });

  const updateScrollState = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const horizontal = window.matchMedia(MOBILE_QUERY).matches;
    const hasOverflow = horizontal
      ? list.scrollWidth > list.clientWidth + 2
      : list.scrollHeight > list.clientHeight + 2;
    const atEnd = horizontal
      ? list.scrollLeft + list.clientWidth >= list.scrollWidth - 3
      : list.scrollTop + list.clientHeight >= list.scrollHeight - 3;

    setScrollState({ hasOverflow, atEnd: !hasOverflow || atEnd, horizontal });
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;

    list.scrollTo({ top: 0, left: 0 });
    const frame = window.requestAnimationFrame(updateScrollState);
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(list);
    list.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      list.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items, updateScrollState]);

  const showCue = scrollState.hasOverflow && !scrollState.atEnd;
  const shellClasses = [
    "project-list-shell",
    scrollState.hasOverflow ? "has-overflow" : "",
    scrollState.atEnd ? "at-end" : "",
  ].filter(Boolean).join(" ");

  const scrollMore = () => {
    const list = listRef.current;
    if (!list) return;

    list.scrollBy(
      scrollState.horizontal
        ? { left: list.clientWidth * 0.72, behavior: "smooth" }
        : { top: list.clientHeight * 0.72, behavior: "smooth" },
    );
  };

  return (
    <div className={shellClasses}>
      <nav
        className="project-list"
        ref={listRef}
        aria-label={area === "projects" ? "Project list" : "Work list"}
      >
        {items.map((item, index) => {
          const isSelected = selectedId === item.id;
          const rowClasses = `project-select${item.private ? " is-private" : ""}`;

          return (
            <div
              className={rowClasses}
              aria-selected={isSelected}
              aria-disabled={item.private || undefined}
              key={item.id}
            >
              {item.private ? (
                <span className="project-select-hit" title={`${item.title} is private`} />
              ) : (
                <button
                  className="project-select-hit"
                  type="button"
                  aria-label={`Show ${item.title} details`}
                  aria-pressed={isSelected}
                  onClick={() => onSelect(item.id)}
                />
              )}
              <span className="project-number">0{index + 1}</span>
              <span className="project-main">
                <span className="project-title-line">
                  {item.hasSite ? (
                    <ProjectLink
                      href={item.siteUrl}
                      className="project-name"
                      ariaLabel={`${item.title} website`}
                    >
                      {item.title}
                    </ProjectLink>
                  ) : (
                    <span className="project-name">{item.title}</span>
                  )}
                </span>
                <span className="project-short">{item.short}</span>
                <span className="project-stack">{item.stack}</span>
              </span>
              <span className="project-row-actions">
                {item.status ? (
                  <span
                    className={`status-light ${item.statusTone}`}
                    title={item.status}
                    aria-label={item.status}
                  />
                ) : null}
                {item.private ? (
                  <span className="project-lock" title="Private project" aria-label="Private project">
                    <Icon name="lock" />
                  </span>
                ) : null}
              </span>
            </div>
          );
        })}
      </nav>
      <button
        className="project-scroll-cue"
        type="button"
        onClick={scrollMore}
        aria-label={scrollState.horizontal
          ? "Scroll through more projects horizontally"
          : "Scroll through more projects"}
        aria-hidden={!showCue}
        tabIndex={showCue ? 0 : -1}
      >
        {scrollState.horizontal ? "→ scroll" : "↓ scroll"}
      </button>
    </div>
  );
}

export default ProjectList;
