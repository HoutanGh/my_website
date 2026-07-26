import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import { work } from "../data/work";
import ProjectDetails from "./ProjectDetails";
import ProjectList from "./ProjectList";

function PortfolioExplorer() {
  const [area, setArea] = useState("projects");
  const [selectedProject, setSelectedProject] = useState("trading");
  const [selectedWork, setSelectedWork] = useState("vmo2");

  const items = area === "projects" ? projects : work;
  const selectedId = area === "projects" ? selectedProject : selectedWork;
  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) || items[0],
    [items, selectedId],
  );

  const selectItem = (id) => {
    if (area === "projects") setSelectedProject(id);
    else setSelectedWork(id);
  };

  return (
    <section className="section explorer-section" aria-label="Projects and work">
      <div className="section-heading">
        <div className="section-switch" role="tablist" aria-label="Portfolio area">
          <button
            className="section-switch-button"
            type="button"
            role="tab"
            aria-selected={area === "projects"}
            onClick={() => setArea("projects")}
          >
            Projects
          </button>
          <span className="section-switch-separator" aria-hidden="true">|</span>
          <button
            className="section-switch-button"
            type="button"
            role="tab"
            aria-selected={area === "work"}
            onClick={() => setArea("work")}
          >
            Work
          </button>
        </div>
      </div>

      <div className="projects-layout">
        <ProjectList
          items={items}
          selectedId={selectedId}
          onSelect={selectItem}
          area={area}
        />
        <ProjectDetails item={selectedItem} area={area} />
      </div>
    </section>
  );
}

export default PortfolioExplorer;
