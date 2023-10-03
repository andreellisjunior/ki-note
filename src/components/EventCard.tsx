import { Link } from "react-router-dom";

const EventCard = ({
  event,
}: {
  event: {
    id: string;
    event_date: string;
    event_time: string;
    topic: string;
    speaker: string;
  };
}) => {
  const eventDate = new Date(event.event_date);
  let eventTime = event.event_time;
  let timeOfDay;
  let timeConversion;
  if (eventTime) {
    timeConversion = Number(eventTime.slice(0, 2));
    if (timeConversion > 12) {
      timeOfDay = timeConversion - 12;
    } else {
      timeOfDay = timeConversion;
    }
  }

  const newTime = `${event.event_time} ${
    Number(timeConversion) > 12 ? "PM" : "AM"
  }`;

  return (
    <Link to={`/events/${event.id}`} className="relative m-4 block">
      <div className="border-l-8 border-green-800 border-l- pl-4 flex flex-col gap-2">
        <p>
          <span className="font-bold">
            {eventDate.toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>{" "}
          |{" "}
          <span>
            {timeOfDay + "" + newTime.slice(2, 5) + " " + newTime.slice(8)}
          </span>
        </p>
        <p className="text-2xl font-bold">{event.topic}</p>
        <p>
          by <span>{event.speaker}</span>
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
