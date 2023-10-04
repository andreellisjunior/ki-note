import { useAuth } from "./context/AuthProvider";

const TestAuth = () => {
  const { user } = useAuth();

  return <div>You are logged in with this email: {user?.email}</div>;
};

export default TestAuth;
