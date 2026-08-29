import Icon from "./Icon";

const schedule = [
  { day: "MON", activities: [{ type: "football", label: "Football" }] },
  { day: "TUE", activities: [{ type: "badminton", label: "Badminton" }] },
  {
    day: "WED",
    activities: [
      { type: "football", label: "Football" },
      { type: "gym", label: "Gym", workout: "Back and biceps" },
    ],
  },
  {
    day: "THU",
    activities: [
      { type: "badminton", label: "Badminton" },
      { type: "gym", label: "Gym", workout: "Legs" },
    ],
  },
  {
    day: "FRI",
    activities: [{ type: "gym", label: "Gym", workout: "Chest, triceps and shoulders" }],
  },
  {
    day: "SAT",
    activities: [
      { type: "football", label: "Football" },
      { type: "gym", label: "Gym", workout: "Back and biceps" },
    ],
  },
  {
    day: "SUN",
    activities: [{ type: "gym", label: "Gym", workout: "Chest, triceps, shoulders and abs" }],
  },
];

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function getWeekDates(today) {
  const monday = new Date(today);
  const daysSinceMonday = (today.getDay() + 6) % 7;
  monday.setDate(today.getDate() - daysSinceMonday);
  monday.setHours(12, 0, 0, 0);

  return schedule.map((_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return date;
  });
}

function formatDateRange(dates) {
  const first = dates[0];
  const last = dates[dates.length - 1];
  const firstMonth = months[first.getMonth()];
  const lastMonth = months[last.getMonth()];

  if (first.getMonth() === last.getMonth()) {
    return `${first.getDate()}—${last.getDate()} ${lastMonth}`;
  }

  return `${first.getDate()} ${firstMonth}—${last.getDate()} ${lastMonth}`;
}

function isSameDate(first, second) {
  return first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate();
}

function Activity({ activity, day }) {
  if (activity.type === "gym") {
    return (
      <span
        className="fitness-activity fitness-gym-activity"
        data-workout={activity.workout}
        role="img"
        aria-label={`${activity.label} on ${day}: ${activity.workout}`}
        tabIndex={0}
      >
        <Icon name="dumbbell" />
      </span>
    );
  }

  return (
    <span
      className={`fitness-activity fitness-${activity.type}-activity`}
      role="img"
      aria-label={`${activity.label} on ${day}`}
    >
      <Icon name={activity.type} />
    </span>
  );
}

function FitnessCalendar() {
  const today = new Date();
  const dates = getWeekDates(today);

  return (
    <section className="fitness-stage" aria-label="Weekly fitness schedule">
      <div className="fitness-calendar-heading">
        <span>THIS WEEK</span>
        <span>{formatDateRange(dates)}</span>
      </div>

      <div className="fitness-calendar">
        {schedule.map((entry, index) => {
          const date = dates[index];
          const isToday = isSameDate(date, today);

          return (
            <article className={isToday ? "is-today" : ""} key={entry.day}>
              <div className="fitness-date">
                <span>{entry.day}</span>
                <strong>{date.getDate()}</strong>
                {isToday ? <small>TODAY</small> : null}
              </div>
              <div className="fitness-activities">
                {entry.activities.map((activity) => (
                  <Activity
                    activity={activity}
                    day={entry.day}
                    key={`${entry.day}-${activity.type}`}
                  />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default FitnessCalendar;
