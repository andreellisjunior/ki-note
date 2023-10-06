import Header from "./Header";
import Loader from "./Loader";
import SpeakerRequest from "./SpeakerRequest";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import EventNotes from "./EventNotes";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

type FormData = {
  full_name: string;
  email: string;
  topic: string;
  day: string;
  time: string;
  description: string;
  requirements: string;
  status: string;
};

const Event = () => {
  const { events, isLoading, user } = useAuth();
  const { eventID } = useParams();
  // const [events, setEvents] = useState<Events | null>([]);

  const event = events?.find((event) => {
    return event.id == eventID;
  });

  useEffect(() => {
    if (event) {
      setFormData({
        full_name: event?.speaker,
        email: event?.email,
        topic: event?.topic,
        day: event?.event_date,
        time: event?.event_time,
        description: event?.description,
        requirements: event?.requirements,
        status: event?.status,
      });
    }
  }, [event]);

  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    topic: "",
    day: "",
    time: "",
    description: "",
    requirements: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const inputFields = document.querySelectorAll("input");
  const textArea = document.querySelector("textarea");

  let eventDate;
  let eventTime = formData.time;
  let timeOfDay;
  let timeConversion;
  if (event) {
    eventDate = new Date(formData.day);
    if (eventTime) {
      timeConversion = Number(eventTime.slice(0, 2));
      if (timeConversion > 12) {
        timeOfDay = timeConversion - 12;
      } else {
        timeOfDay = timeConversion;
      }
    }
  }
  const newTime = `${formData.time} ${
    Number(timeConversion) > 12 ? "PM" : "AM"
  }`;

  let badgeColor;
  switch (event?.status) {
    case "rejected":
      badgeColor = "bg-red-100 text-red-800";
      break;
    case "approved":
      badgeColor = "bg-green-100 text-green-800";
      break;
    default:
      badgeColor = "text-blue-800 bg-blue-100";
      break;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("events")
        .update([
          {
            speaker: formData.full_name,
            email: formData.email,
            topic: formData.topic,
            event_date: formData.day,
            description: formData.description,
            requirements: formData.requirements,
            event_time: formData.time,
          },
        ])
        .eq("id", eventID)
        .select();
      setMessage("✅");
      setIsEditing(false);
      inputFields.forEach((item) => {
        item.setAttribute("readonly", "true");
      });
      textArea?.setAttribute("readonly", "true");
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const enableEditing = () => {
    setIsEditing(true);
    inputFields.forEach((item) => {
      item.removeAttribute("readonly");
    });
    textArea?.removeAttribute("readonly");
  };

  const deleteEvent = async () => {
    if (confirm("Are you sure you'd like to delete the event?") == true) {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventID);
      navigate("/");
      if (error) return error;
    } else {
      return;
    }
  };

  return (
    <>
      <Header events={events} />
      <div className="grid grid-cols-6 items-stretch gap-12 container mx-auto">
        <div className="container mx-auto my-10 lg:col-span-4 col-span-6">
          <div className="p-10 h-full bg-white w-full shadow-xl rounded-3xl border-[1px] border-gray-300">
            {isLoading ? (
              <Loader />
            ) : event ? (
              <>
                <h2 className="text-3xl mb-8">Event Details</h2>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-10">
                    {user && (
                      <div className="text-xl flex items-center">
                        <span className="font-extrabold min-w-[25%]">
                          TOPIC:{" "}
                        </span>
                        <input
                          type="text"
                          name="topic"
                          id="topic"
                          onChange={updateData}
                          className="w-full"
                          value={formData.topic}
                          readOnly
                        />
                      </div>
                    )}
                    {user && (
                      <div className="text-xl flex items-center">
                        <span className="font-extrabold min-w-[25%]">
                          STATUS:{" "}
                        </span>
                        <span
                          className={`${badgeColor} font-black mr-2 px-2.5 py-0.5 rounded`}
                        >
                          {formData.status}
                        </span>
                      </div>
                    )}
                    <div className="text-xl flex">
                      <span className="font-extrabold min-w-[25%]">DATE: </span>
                      <div>
                        {user && isEditing && (
                          <div className="flex gap-4 mb-4">
                            <input
                              type="date"
                              name="day"
                              id="day"
                              onChange={updateData}
                              readOnly
                              className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full"
                            />
                            <input
                              type="time"
                              name="time"
                              id="time"
                              pattern="[0-9]{2}:[0-9]{2}"
                              onChange={updateData}
                              readOnly
                              className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full"
                            />
                          </div>
                        )}

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
                    </div>
                    <div className="text-xl flex">
                      <span className="font-extrabold min-w-[25%]">
                        SPEAKER:{" "}
                      </span>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        placeholder="Full Name..."
                        onChange={updateData}
                        className="w-full"
                        value={formData.full_name}
                        readOnly
                      />
                    </div>
                    <div className="text-xl flex">
                      <span className="font-extrabold min-w-[25%]">
                        EMAIL:{" "}
                      </span>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Work email..."
                        onChange={updateData}
                        className=" w-full"
                        value={formData.email}
                        readOnly
                      />
                    </div>
                    <div className="text-xl flex">
                      <span className="font-extrabold min-w-[25%]">DESC: </span>
                      {/* <span className="" onChange={updateData}>
                        {formData.description}
                      </span> */}
                      <textarea
                        name="description"
                        id="description"
                        onChange={updateData}
                        value={formData.description}
                        className="h-44 w-full"
                        readOnly
                      ></textarea>
                    </div>
                  </div>
                  {isEditing && user && (
                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Update
                      </button>
                    </div>
                  )}
                </form>
                {!isEditing && user && (
                  <>
                    <button
                      type="button"
                      onClick={enableEditing}
                      className="inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit
                    </button>
                    {message && (
                      <span className="text-3xl absolute">{message}</span>
                    )}
                  </>
                )}
                {user && (
                  <button
                    type="button"
                    onClick={deleteEvent}
                    className="sticky left-full bg-red-100 text-red-800 font-black mr-2 px-3 py-2 rounded-md"
                  >
                    Remove Event
                  </button>
                )}
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
