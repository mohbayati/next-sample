import EventItem from "./event-item";
import classes from "./event-list.module.css";

export default function EventList({ itmes }) {
  return (
    <ul className={classes.list}>
      {itmes.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          image={event.image}
          date={event.date}
        />
      ))}
    </ul>
  );
}
