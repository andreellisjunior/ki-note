import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useParams } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

type FormData = {
  notes: string;
  rejection_notes: string;
};

const EventNotes = () => {
  const { events } = useAuth();
  const { eventID } = useParams();

  const event = events?.find((event) => {
    return event.id == eventID;
  });

  useEffect(() => {
    if (event) {
      setFormData({
        notes: event?.notes,
        rejection_notes: event?.rejection_notes,
      });
      console.log(event);
    }
  }, [event]);

  const [formData, setFormData] = useState<FormData>({
    notes: "",
    rejection_notes: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("events")
        .update([
          {
            notes: formData.notes,
            rejection_notes: formData.rejection_notes,
          },
        ])
        .eq("id", eventID)
        .select();
      setMessage("Updated!");
      if (error) {
        setError("Looks like something went wrong. Try again");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto my-10 col-span-2">
      <div className="p-10 h-auto bg-white w-full shadow-xl rounded-3xl">
        <h3 className="text-2xl">Approver Notes</h3>
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
              <textarea
                name="notes"
                id="notes"
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3 h-44"
                placeholder="Andre: Made some recommendations on the requirements to an enhanced experience"
                onChange={updateData}
                value={formData.notes}
              ></textarea>
              <textarea
                name="rejection_notes"
                id="rejection_notes"
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3 h-44"
                placeholder="If rejected, here’s why? This is the only section that will be emailed."
                onChange={updateData}
                value={formData.rejection_notes}
              ></textarea>
              <div className="flex gap-10 justify-end">
                <button
                  type="submit"
                  className="bg-[#026B26] rounded-lg px-4 py-2 hover:bg-[#174828] transition text-white font-bold"
                >
                  APPROVE
                </button>
                <button
                  type="submit"
                  className="bg-[#AC0000] rounded-lg px-4 py-2 hover:bg-[#174828] transition text-white font-bold"
                >
                  REJECT
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p>
              Input your name and the notes you&apos;d like to add to the
              request.
            </p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <textarea
                name="notes"
                id="notes"
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3 h-44"
                placeholder="Andre: Made some recommendations on the requirements to an enhanced experience"
                onChange={updateData}
                value={formData.notes}
              ></textarea>
              <textarea
                name="rejection_notes"
                id="rejection_notes"
                className="border border-gray-400 bg-[#FBFBFB] rounded-lg w-full px-4 py-2 my-3 h-44"
                placeholder="If rejected, here’s why? This is the only section that will be emailed."
                onChange={updateData}
                value={formData.rejection_notes}
              ></textarea>
              <div className="flex gap-10 justify-end">
                <button
                  type="submit"
                  className="bg-[#026B26] rounded-lg px-4 py-2 hover:bg-[#174828] transition text-white font-bold"
                >
                  APPROVE
                </button>
                <button
                  type="submit"
                  className="bg-[#AC0000] rounded-lg px-4 py-2 hover:bg-[#174828] transition text-white font-bold"
                >
                  REJECT
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EventNotes;
