import EventCard from "./EventCard";
import Loader from "./Loader";
import { useAuth } from "./context/AuthProvider";

const UpcomingEvents = () => {
  const { events, user, isLoading } = useAuth();

  return (
    <>
      <div className="container mx-auto my-10 col-span-6 lg:col-span-4 px-4">
        <div className="p-10 h-full bg-white w-full shadow-xl rounded-3xl border-[1px] border-gray-300">
          {user ? (
            <h2 className="text-3xl mb-4">All Events</h2>
          ) : (
            <h2 className="text-3xl mb-4">Upcoming Events</h2>
          )}
          <div className=" flex flex-col sm:grid sm:grid-rows-5 sm:grid-flow-col">
            {isLoading ? (
              <Loader />
            ) : user ? (
              events?.map((event) => <EventCard event={event} key={event.id} />)
            ) : (
              events
                ?.filter((event) => event.status == "approved")
                .map((event) => <EventCard event={event} key={event.id} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingEvents;
