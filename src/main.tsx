import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Event from "./components/Event.tsx";
import { createClient } from "@supabase/supabase-js";

type Events = {
  id: string;
  topic: string;
  event_date: string;
  event_time: string;
  speaker: string;
  email: string;
  description: string;
}[];

const supabase = createClient(
  `https://${import.meta.env.VITE_SUPABASE_PROJECT}.supabase.co`,
  `${import.meta.env.VITE_SUPABASE_KEY}`
);

const Main = () => {
  const [events, setEvents] = useState<Events | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    setIsLoading(true);
    const { data } = await supabase.from("events").select();
    setEvents(data);
    setIsLoading(false);
  }
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<App loading={isLoading} events={events} />}
          />
          <Route
            path="/events/:eventID"
            element={<Event loading={isLoading} events={events} />}
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
