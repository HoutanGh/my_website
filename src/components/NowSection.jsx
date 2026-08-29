import { useState } from "react";
import FitnessCalendar from "./FitnessCalendar";
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
        <button
          className="now-tab"
          type="button"
          role="tab"
          aria-selected={tab === "fitness"}
          onClick={() => setTab("fitness")}
        >
          fitness
        </button>
      </div>

      <div className="now-panel" aria-live="polite" key={tab}>
        {tab === "reading" ? <ReadingList /> : null}
        {tab === "learning" ? <LearningGrid /> : null}
        {tab === "fitness" ? <FitnessCalendar /> : null}
      </div>
    </section>
  );
}

export default NowSection;
