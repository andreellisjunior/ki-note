import Header from "./Header";
import Loader from "./Loader";
import SpeakerRequest from "./SpeakerRequest";
import { useParams } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import EventNotes from "./EventNotes";

const Event = () => {
  const { events, isLoading, user } = useAuth();
  const { eventID } = useParams();

  const event = events?.find((event) => {
    return event.id == eventID;
  });

  let eventDate;
  let eventTime = event?.event_time;
  let timeOfDay;
  let timeConversion;
  if (event) {
    eventDate = new Date(event.event_date);
    if (eventTime) {
      timeConversion = Number(eventTime.slice(0, 2));
      if (timeConversion > 12) {
        timeOfDay = timeConversion - 12;
      } else {
        timeOfDay = timeConversion;
      }
    }
  }
  const newTime = `${event?.event_time} ${
    Number(timeConversion) > 12 ? "PM" : "AM"
  }`;

  return (
    <>
      <Header events={events} />
      <div className="grid grid-cols-6 items-stretch gap-12 container mx-auto">
        <div className="container mx-auto my-10 col-span-4">
          <div className="p-10 h-full bg-white w-full shadow-xl rounded-3xl">
            {isLoading ? (
              <Loader />
            ) : event ? (
              <>
                <h2 className="text-3xl mb-8">Event Details</h2>
                <div className="flex flex-col gap-10">
                  <div className="text-xl flex">
                    <span className="font-extrabold min-w-[25%]">DATE: </span>
                    <span className="uppercase">
                      {eventDate?.toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {" | "}
                      {timeOfDay +
                        "" +
                        newTime.slice(2, 5) +
                        " " +
                        newTime.slice(8)}
                    </span>
                  </div>
                  <div className="text-xl flex">
                    <span className="font-extrabold min-w-[25%]">
                      SPEAKER:{" "}
                    </span>
                    <span className="">{event.speaker}</span>
                  </div>
                  <div className="text-xl flex">
                    <span className="font-extrabold min-w-[25%]">EMAIL: </span>
                    <span className="">{event.email}</span>
                  </div>
                  <div className="text-xl flex">
                    <span className="font-extrabold min-w-[25%]">
                      DESCRIPTION:{" "}
                    </span>
                    <span className="">{event.description}</span>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        {user ? <EventNotes /> : <SpeakerRequest />}
      </div>
    </>
  );
};

export default Event;
