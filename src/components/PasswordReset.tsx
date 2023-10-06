import { Link } from "react-router-dom";
import LogoDark from "../assets/Logo-dark.png";
import { useState } from "react";
import { useAuth } from "./context/AuthProvider";

type FormData = {
  email: string;
};

const PasswordReset = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { passwordReset } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await passwordReset(formData.email);
      console.log(error);
      console.log(data);
      setMessage("Password reset has been sent to your email");
    } catch (e) {
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
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={updateData}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#184a29] sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-[#026B26] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#194829] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send Reset Link
            </button>
          </div>
          <div className="w-100 text-center mt-2">
            Back to login?{" "}
            <a
              href="/login"
              className=" font-semibold text-[#026B26] hover:text-[#1e4e2f]"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
