import { createContext, useContext, useEffect, useState } from "react";
import { User, createClient } from "@supabase/supabase-js";

type AuthContext = {
  login: Function;
  user?: User | null;
  signOut: Function;
  auth: boolean;
  events: Events | null;
  isLoading: boolean;
  passwordReset: Function;
  updatePassword: Function;
};

type Events = {
  requirements: string;
  id: string;
  topic: string;
  event_date: string;
  event_time: string;
  speaker: string;
  email: string;
  description: string;
  notes: string;
  rejection_notes: string;
  status: string;
}[];

// @ts-expect-error
const AuthContext = createContext<AuthContext>();

export const useAuth = () => useContext(AuthContext);

const supabase = createClient(
  `https://${import.meta.env.VITE_SUPABASE_PROJECT}.supabase.co`,
  `${import.meta.env.VITE_SUPABASE_KEY}`
);

const login = (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

const signOut = () => supabase.auth.signOut();

const passwordReset = (email: string) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5177/update-password",
  });

const updatePassword = (updatedPassword: string) =>
  supabase.auth.updateUser({ password: updatedPassword });

const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Events | null>([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);
      setLoading(false);
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setAuth(false);
      } else if (event === "SIGNED_IN") {
        setUser(session?.user);
        setAuth(true);
        await getEvents();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });

    const getEvents = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("events")
        .select()
        .order("event_date");
      setEvents(data);
      setIsLoading(false);
    };
    getEvents();

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    !loading && (
      <AuthContext.Provider
        value={{
          auth,
          user,
          login,
          signOut,
          events,
          isLoading,
          passwordReset,
          updatePassword,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  );
};

export default AuthProvider;
