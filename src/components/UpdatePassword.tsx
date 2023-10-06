import { Link, useNavigate } from "react-router-dom";
import LogoDark from "../assets/Logo-dark.png";
import { useState } from "react";
import { useAuth } from "./context/AuthProvider";

type FormData = {
  password: string;
  confirmPassword: string;
};

const UpdatePassword = () => {
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmPassword) {
      setMessage("Please fill in all the fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords doesn't match. Try again.");
      return;
    }
    try {
      setMessage("");
      setLoading(true);
      const { error } = await updatePassword(formData.password);
      if (!error) {
        navigate("/");
      }
    } catch (e) {
      setMessage("Error updating password. Please try again.");
      console.log(e);
    }
    setLoading(false);
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen bg-transparent">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/">
          <img
            className="mx-auto h-10 w-auto"
            src={LogoDark}
            alt="Your Company"
          />
        </Link>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p>{message}</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={updateData}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1e4e2f] sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                onChange={updateData}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1e4e2f] sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-[#026B26] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#194829] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
