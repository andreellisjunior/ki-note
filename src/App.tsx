import SpeakerRequest from "./components/SpeakerRequest";
import UpcomingEvents from "./components/UpcomingEvents";

type Events = {
  id: string;
  topic: string;
  event_date: string;
  event_time: string;
  speaker: string;
}[];

function App({ events }: { events: Events | null }) {
  return (
    <>
      <div className="grid grid-cols-6 items-stretch gap-12 container mx-auto">
        <UpcomingEvents events={events} />
        <SpeakerRequest />
      </div>
    </>
  );
}

export default App;
