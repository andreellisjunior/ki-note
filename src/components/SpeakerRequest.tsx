import { useState } from "react";
import { supabase } from "../supabase/client";

type FormData = {
  full_name: string;
  email: string;
  topic: string;
  day: string;
  time: string;
  description: string;
  requirements: string;
};

const SpeakerRequest = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    topic: "",
    day: "",
    time: "",
    description: "",
    requirements: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // create new event

    try {
      const { error } = await supabase.from("events").insert([
        {
          speaker: formData.full_name,
          email: formData.email,
          topic: formData.topic,
          event_date: new Date(formData.day),
          description: formData.description,
          requirements: formData.requirements,
          event_time: formData.time,
          status: "pending",
        },
      ]);
      setMessage("Event submitted! Keep an 👀 on your email for updates!");
      if (error) {
        setError("Looks like something went wrong. Try again");
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

  return (
    <div className="container mx-auto my-10 lg:col-span-2 col-span-6 px-4">
      <div className="p-10 h-auto bg-white w-full shadow-xl rounded-3xl border-[1px] border-gray-300">
        <h3 className="text-2xl">Want to Speak?</h3>
        {message ? (
          <>
            <p
              className={`${
                error ? "text-red-800" : "text-green-800"
              } font-bold mt-4`}
            >
              {error ? error : message}
            </p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Full Name..."
                onChange={updateData}
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
              />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Work email..."
                onChange={updateData}
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
              />
              <input
                type="text"
                name="topic"
                id="topic"
                placeholder="Topic"
                onChange={updateData}
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
              />
              <input
                type="date"
                name="day"
                id="day"
                onChange={updateData}
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
              />
              <input
                type="time"
                name="time"
                id="time"
                pattern="[0-9]{2}:[0-9]{2}"
                onChange={updateData}
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
              />
              <textarea
                name="description"
                id="description"
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
                placeholder="Topic Description"
                onChange={updateData}
              ></textarea>
              <textarea
                name="requirements"
                id="requirements"
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
                placeholder="Any requirements? (optional)"
                onChange={updateData}
              ></textarea>
              <button
                type="submit"
                className="bg-[#026B26] rounded-lg px-4 py-2 hover:bg-[#174828] transition text-white font-bold"
              >
                SUBMIT FOR REVIEW
              </button>
            </form>
          </>
        ) : (
          <>
            <p>Fill out the form below and we&apos;ll get back to you soon!</p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Full Name..."
                onChange={updateData}
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
              />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Work email..."
                onChange={updateData}
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
              />
              <input
                type="text"
                name="topic"
                id="topic"
                placeholder="Topic"
                onChange={updateData}
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
              />
              <input
                type="date"
                name="day"
                id="day"
                onChange={updateData}
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
              />
              <input
                type="time"
                name="time"
                id="time"
                pattern="[0-9]{2}:[0-9]{2}"
                onChange={updateData}
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
              />
              <textarea
                name="description"
                id="description"
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
                placeholder="Topic Description"
                onChange={updateData}
              ></textarea>
              <textarea
                name="requirements"
                id="requirements"
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3"
                placeholder="Any requirements? (optional)"
                onChange={updateData}
              ></textarea>
              <button
                type="submit"
                className="bg-[#026B26] rounded-lg px-4 py-2 hover:bg-[#174828] transition text-white font-bold"
              >
                SUBMIT FOR REVIEW
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SpeakerRequest;
