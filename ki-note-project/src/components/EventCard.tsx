import { Link } from "react-router-dom";

const EventCard = () => {
  return (
    <Link to="/events/1">
      <div className="border-l-8 border-green-800 border-l- pl-4 flex flex-col gap-2">
        <p>
          <span className="font-bold">OCT 4TH, 2023</span> | 9:00 A.M.
        </p>
        <p className="text-2xl font-bold">THE POWER OF HABIT</p>
        <p>
          by <span>Andre Ellis Jr.</span>
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
