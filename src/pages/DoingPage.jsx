import { activities } from "../data/activities";

function DoingPage() {
  const sortedActivities = [...activities].sort((a, b) => {
    if (a.endDate === null && b.endDate !== null) {
      return -1;
    }
    if (a.endDate !== null && b.endDate === null) {
      return 1;
    }
    return 0;
  });

  return (
    <section className="page-section">
      <h1>Currently Doing</h1>
      <ul id="activities-list">
        {sortedActivities.map((activity) => (
          <li key={`${activity.title}-${activity.startDate}`} className={activity.endDate ? "completed" : ""}>
            {`${activity.title} (${activity.startDate}${activity.endDate ? ` - ${activity.endDate}` : " - Present"})`}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DoingPage;
