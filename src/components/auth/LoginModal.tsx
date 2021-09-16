import React from "react";
import {
  Dialog,
  Typography,
  DialogActions,
  useMediaQuery,
  Divider,
} from "@material-ui/core";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "./LoginPage";
import Button from "../../utils/components/MuiButton";
import { breakpoints } from "../../utils";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }): JSX.Element => {
  const fullscreen = useMediaQuery(breakpoints.down("xs"));
  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullscreen}>
      <div className="login__modal--container">
        <Typography variant="h5" className="login__modal--title" gutterBottom>
          Login to Blogify
        </Typography>
        <Typography variant="subtitle2">
          Please login by clicking one of the social media buttons below
        </Typography>
        <div className="login__buttonContainer">
          <button
            type="button"
            onClick={(): Promise<any> =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google,
              })
            }
            className="button__login--google"
          >
            <i className="fa fa-google" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(): Promise<any> =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Facebook,
              })
            }
            className="button__login--facebook"
          >
            <i className="fa fa-facebook" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(): Promise<any> =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Amazon,
              })
            }
            className="button__login--amazon"
          >
            <i className="fa fa-amazon" aria-hidden="true" />
          </button>
        </div>
        <Divider className="login__modal--divider" />
        <Typography variant="subtitle2" style={{ textAlign: "center" }}>
          Or continue browsing public posts by clicking the &apos;Search&apos; button
          below.
        </Typography>
        <div className="login__buttonContainer">
          <Button
            color="info"
            variant="outlined"
            onClick={(): void => {
              console.log("TODO"); // FIXME
            }}
          >
            Search
          </Button>
        </div>
      </div>

      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
