import { useEffect, useState } from "react";
import { createUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const useCurrentUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("curent user hook");
        const res = await fetch("http://127.0.0.1:3000/getUser", {
          credentials: "include",
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();

        dispatch(
          createUser({
            name: data.user.name,
            email: data.user.email,
            username: data.user.username,
          }),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [dispatch]);

  return { loading };
};
