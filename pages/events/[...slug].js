import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Botton from "../../components/ui/botton";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";

export default function FilteredEventPage({ hasError, events, dateTime }) {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter.Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Botton link="/events">Show All Events</Botton>
        </div>
      </>
    );
  }

  if (!events || events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Botton link="/events">Show All Events</Botton>
        </div>
      </>
    );
  }

  const date = new Date(dateTime.numYear, dateTime.numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList itmes={events} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      events: filteredEvents,
      dateTime: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
