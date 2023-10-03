import EventCard from "./EventCard";

type Events = {
  id: string;
  topic: string;
  event_date: string;
  event_time: string;
  speaker: string;
}[];

const UpcomingEvents = ({ events }: { events: Events | null }) => {
  return (
    <>
      <div className="container mx-auto my-10 col-span-4">
        <div className="p-10 h-full bg-white w-full shadow-xl rounded-3xl">
          <h2 className="text-3xl mb-4">Upcoming Events</h2>
          <div className="grid grid-rows-4 grid-cols-2">
            {events?.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingEvents;