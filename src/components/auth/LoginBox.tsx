import { Dialog } from "@material-ui/core";
import { Auth } from "aws-amplify";
import React from "react";
import { CognitoHostedUIIdentityProvider } from "./LoginPage";

interface Props {}

const LoginBox = ({ isOpen }) => {
  return (
    <Dialog open={isOpen}>
      <button
        role="button"
        onClick={(): Promise<any> =>
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          })
        }
        className="button__login button__login--google"
      >
        <i className="fa fa-google" aria-hidden="true" />
      </button>
      <button
        onClick={() => dispatch(authActions.startLoginWithFacebook())}
        className="button__login button__login--facebook"
      >
        <i className="fa fa-facebook" aria-hidden="true" />
      </button>
      <button
        onClick={() => dispatch(authActions.startLoginWithTwitter())}
        className="button__login button__login--twitter"
      >
        <i className="fa fa-twitter" aria-hidden="true" />
      </button>
      <button
        onClick={() => dispatch(authActions.startLoginWithGithub())}
        className="button__login button__login--github"
        style={{ marginBottom: "18px" }}
      >
        <i className="fa fa-github" aria-hidden="true" />
      </button>
    </Dialog>
  );
};

export default LoginBox;
