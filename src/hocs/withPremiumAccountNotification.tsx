import { useState, ComponentType } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import useUser from "../hooks/useUser";
import upgradeAccount from "../api/rest/upgrade-account";
import { useSelector } from "../store";
import { selectActiveUserId } from "../store/selectors/select-active-user-id";

function withPremiumAccountNotification<T extends object>(WrappedComponent: ComponentType<T>) {
  return function Wrapper(props: T) {
    const activeUserId = useSelector(selectActiveUserId);
    const { user } = useUser(activeUserId);
    const [open, setOpen] = useState(true);

    const handleUpgradeClick = () => {
      upgradeAccount();
      setOpen(false);
    };

    const handleCloseClick = () => {
      setOpen(false);
    };

    if (!user || user.premium) {
      return <WrappedComponent {...props} />;
    }

    return (
      <>
        <Dialog open={open} onClose={handleCloseClick}>
          <DialogTitle>Account plan</DialogTitle>
          <DialogContent>
            <DialogContentText>Upgrade your account to premium</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseClick} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpgradeClick} color="primary" autoFocus>
              Upgrade
            </Button>
          </DialogActions>
        </Dialog>
        <WrappedComponent {...props} />
      </>
    );
  };
}

export default withPremiumAccountNotification;
