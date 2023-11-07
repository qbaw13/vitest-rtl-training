import { useCallback, useEffect, useMemo, useState } from "react";
import fetchUser from "../api/rest/fetch-user";
import { User } from "../types/user";

const DEFAULT_NUMBER = 1;

interface UseUserOutput {
  user?: User;
  userNumber: number;
  resetUser: () => void;
  randomUser: () => void;
  selectUserByNumber: (number: number) => void;
}

function useUser(initialUserNumber = DEFAULT_NUMBER): UseUserOutput {
  const [userNumber, setUserNumber] = useState(initialUserNumber);
  const [user, setUser] = useState<User>();

  const updateUser = useCallback(async () => {
    const response = await fetchUser(String(userNumber));
    const { data } = response;
    setUser(data);
  }, [setUser, userNumber]);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  const resetUser = useCallback(() => {
    setUserNumber(DEFAULT_NUMBER);
  }, [setUserNumber]);

  const randomUser = useCallback(() => {
    setUserNumber(Math.floor(Math.random() * 100));
  }, [setUserNumber]);

  const selectUserByNumber = useCallback(
    (number: number) => {
      if (number < 1 || number > 100) {
        return;
      }
      setUserNumber(number);
    },
    [setUserNumber],
  );

  const result = useMemo(
    () => ({
      user,
      userNumber,
      resetUser,
      randomUser,
      selectUserByNumber,
    }),
    [user, userNumber, resetUser, randomUser, selectUserByNumber],
  );

  return result;
}

export default useUser;
