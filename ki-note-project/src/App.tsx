import "./App.css";
import EventCard from "./components/EventCard";

function App() {
  return (
    <>
      <div className="container mx-auto my-10">
        <div className="p-10 h-96 bg-white w-full shadow-2xl rounded-3xl">
          <h2 className="text-3xl mb-4">Upcoming Events</h2>
          <EventCard />
        </div>
      </div>
    </>
  );
}

export default App;
