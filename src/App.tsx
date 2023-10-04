import Header from "./components/Header";
import SpeakerRequest from "./components/SpeakerRequest";
import UpcomingEvents from "./components/UpcomingEvents";
import { useAuth } from "./components/context/AuthProvider";

function App() {
  const { events } = useAuth();
  return (
    <>
      <Header events={events} />
      <div className="grid grid-cols-6 items-stretch gap-12 container mx-auto">
        <UpcomingEvents />
        <SpeakerRequest />
      </div>
    </>
  );
}

export default App;
