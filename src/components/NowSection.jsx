import { useState } from "react";
import LearningGrid from "./LearningGrid";
import ReadingList from "./ReadingList";

function NowSection() {
  const [tab, setTab] = useState("reading");

  return (
    <section className="section explorer-section" aria-labelledby="now-title">
      <div className="section-heading">
        <h2 className="section-title" id="now-title">Now</h2>
      </div>

      <div className="now-tabs" role="tablist" aria-label="Current interests">
        <button
          className="now-tab"
          type="button"
          role="tab"
          aria-selected={tab === "reading"}
          onClick={() => setTab("reading")}
        >
          reading
        </button>
        <button
          className="now-tab"
          type="button"
          role="tab"
          aria-selected={tab === "learning"}
          onClick={() => setTab("learning")}
        >
          learning
        </button>
      </div>

      <div className="now-panel" aria-live="polite" key={tab}>
        {tab === "reading" ? <ReadingList /> : <LearningGrid />}
      </div>
    </section>
  );
}

export default NowSection;
