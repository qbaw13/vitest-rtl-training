import { Button } from "@mui/material";
import useUser from "../../hooks/useUser";

function UserSelection() {
  const { user, userNumber, resetUser, selectUserByNumber, randomUser } = useUser();

  const handlePrevUserClick = () => {
    selectUserByNumber(userNumber - 1);
  };

  const handleNextUserClick = () => {
    selectUserByNumber(userNumber + 1);
  };

  return (
    <div>
      <header>
        <h1>User selection</h1>
      </header>
      <p>
        name: {user?.name} {user?.surname}
      </p>
      <p>premium: {user?.premium ? "YES" : "NO"}</p>
      <p>createdAt: {`${user?.createdAt}`}</p>
      <Button color="primary" variant="contained" onClick={resetUser}>
        Reset user
      </Button>
      <Button color="primary" variant="contained" onClick={handlePrevUserClick}>
        Previous user
      </Button>
      <Button color="primary" variant="contained" onClick={handleNextUserClick}>
        Next user
      </Button>
      <Button color="primary" variant="contained" onClick={randomUser}>
        Random user
      </Button>
    </div>
  );
}

export default UserSelection;
