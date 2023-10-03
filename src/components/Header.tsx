import { Link, useParams } from "react-router-dom";
import logo from "../assets/Logo.png";
import watermark from "../assets/watermark.png";

type Events = {
  id: string;
  topic: string;
  event_date: string;
  event_time: string;
  speaker: string;
  email: string;
  description: string;
}[];

const Header = ({ events }: { events: Events | null }) => {
  const { eventID } = useParams();
  console.log(eventID);
  const event = events?.find((event) => {
    return event.id == eventID;
  });

  return (
    <div className="h-96 hero-section after:bg-black after:bg-opacity-60 relative flex flex-col overflow-hidden text-white">
      <div className="header container mx-auto p-4 flex items-center justify-between relative z-10">
        <Link to="/">
          <img src={logo} alt="Ki-note logo" />
        </Link>
        <nav className="flex items-center gap-8 uppercase font-extrabold">
          <Link className="" to="/">
            Upcoming Events
          </Link>
          <Link
            to="/login"
            className="bg-[#026B26] rounded-lg px-4 py-2 hover:bg-[#174828] transition"
          >
            Admin Login
          </Link>
          {/* <a
            href="#_"
            className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative text-white">Button Text</span>
          </a> */}
        </nav>
      </div>
      <img src={watermark} alt="Ki-note logo" className="absolute  right-0" />
      <div className="container mx-auto p-4 h-full flex flex-col justify-center mb-12 z-10">
        {event ? (
          <>
            <h6 className="text-2xl mb-4 font-bold">TOPIC:</h6>
            <h1 className="text-5xl uppercase">{event.topic}</h1>
          </>
        ) : (
          <>
            <h1 className="text-5xl">Empowering Expert Experiences</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
