import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Event from "./components/Event.tsx";
import { createClient } from "@supabase/supabase-js";

type Events = {
  id: string;
  topic: string;
  event_date: string;
  event_time: string;
  speaker: string;
}[];

const supabase = createClient(
  `https://${import.meta.env.VITE_SUPABASE_PROJECT}.supabase.co`,
  `${import.meta.env.VITE_SUPABASE_KEY}`
);

const Main = () => {
  const [events, setEvents] = useState<Events | null>([]);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    const { data } = await supabase.from("events").select();
    setEvents(data);
  }
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App events={events} />} />
          <Route path="/events/:event" element={<Event />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
