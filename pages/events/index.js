import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/event/event-list";
import EventsSearch from "../../components/event/events-search";
import { getAllEvents } from "../../helpers/api-util";

const AllEventsPage = (props) => {
  const { events } = props;
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
  };
};
