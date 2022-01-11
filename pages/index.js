import { Fragment } from "react";

import EventList from "../components/event/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

export default function Home(props) {
  return (
    <Fragment>
      <EventList items={props.events} />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};
