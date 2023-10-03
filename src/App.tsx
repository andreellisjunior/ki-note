import Header from "./components/Header";
import SpeakerRequest from "./components/SpeakerRequest";
import UpcomingEvents from "./components/UpcomingEvents";

type Events = {
  id: string;
  topic: string;
  event_date: string;
  event_time: string;
  speaker: string;
  email: string;
  description: string;
}[];

function App({ events, loading }: { events: Events | null; loading: boolean }) {
  return (
    <>
      <Header events={events} />
      <div className="grid grid-cols-6 items-stretch gap-12 container mx-auto">
        <UpcomingEvents loading={loading} events={events} />
        <SpeakerRequest />
      </div>
    </>
  );
}

export default App;
