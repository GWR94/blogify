import React from "react";
import { Typography } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../../utils/components/MuiButton";
import { openSnackbar } from "../../utils/components/Notifier";
import { AppState } from "../../store/store";
import background from "./img/bg.jpg";

export enum CognitoHostedUIIdentityProvider {
  Cognito = "COGNITO",
  Google = "Google",
  Facebook = "Facebook",
  Amazon = "LoginWithAmazon",
  Apple = "SignInWithApple",
}

const LoginPage = (): JSX.Element => {
  const { uid } = useSelector(({ auth }: AppState) => auth);
  const history = useHistory();
  if (!uid) history.push("/dashboard");
  return (
    <div className="box-layout" style={{ background: `url(${background})` }}>
      <div className="box-layout__box">
        <div>
          <Typography
            variant="h3"
            className="box-layout__title"
            style={{
              fontSize: "30px",
              marginBottom: "14px",
              fontWeight: 600,
            }}
          >
            Blogify
          </Typography>
          <Typography gutterBottom>
            Create and share posts that are interesting to{" "}
            <span style={{ fontWeight: "bold" }}>you.</span>
          </Typography>
          <Typography style={{ fontSize: "15px", marginBottom: 18 }}>
            Let the world know what you&apos;re up to.
          </Typography>
          <button
            type="button"
            onClick={async (): Promise<void> => {
              try {
                await Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Google,
                });
                history.push("/dashboard");
                openSnackbar({
                  message: "Successfully logged in.",
                  severity: "success",
                });
              } catch (err) {
                openSnackbar({
                  message: "Unable to login. Please try again.",
                  severity: "error",
                });
              }
            }}
            className="button__login--google"
          >
            <i className="fa fa-google" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={async (): Promise<void> => {
              try {
                await Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Facebook,
                });
                history.push("/dashboard");
                openSnackbar({
                  message: "Successfully logged in.",
                  severity: "success",
                });
              } catch (err) {
                openSnackbar({
                  message: "Unable to login. Please try again.",
                  severity: "error",
                });
              }
            }}
            className="button__login--facebook"
          >
            <i className="fa fa-facebook" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={async (): Promise<void> => {
              try {
                await Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Amazon,
                });
                history.push("/dashboard");
                openSnackbar({
                  message: "Successfully logged in.",
                  severity: "success",
                });
              } catch (err) {
                openSnackbar({
                  message: "Unable to login. Please try again.",
                  severity: "error",
                });
              }
            }}
            className="button__login--amazon"
          >
            <i className="fa fa-amazon" aria-hidden="true" />
          </button>
          <Typography style={{ fontSize: "17px", margin: "0 20px 18px" }}>
            Login with any social media or search browse through public posts by clicking
            &quot;Search&quot; below
          </Typography>
          <Button
            color="primary"
            className="button"
            variant="contained"
            onClick={(): void => history.push("/dashboard?view=all")}
            style={{ textDecoration: "none", color: "white" }}
          >
            <i className="fa fa-search" style={{ marginRight: 5 }} /> Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
