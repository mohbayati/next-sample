import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvetns } from "../../helpers/api-util";

export default function AllEventsPage({ events }) {
  const router = useRouter();

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList itmes={events} />
    </>
  );
}
export async function getStaticProps() {
  const events = await getAllEvetns();
  return {
    props: {
      events,
    },
    revalidate: 10,
  };
}
