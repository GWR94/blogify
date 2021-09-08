import React, { useState } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Button from "../../utils/components/MuiButton";
import { openSnackbar } from "../../utils/components/Notifier";
import { AppState } from "../../store/store";
import * as actions from "../../actions/posts.action";
import { listPosts } from "../../graphql/ownQueries";
import { Post } from "../../store/posts.i";

/**
 * TODO
 * [ ] Test isLoading(s)
 */

export enum CognitoHostedUIIdentityProvider {
  Cognito = "COGNITO",
  Google = "Google",
  Facebook = "Facebook",
  Amazon = "LoginWithAmazon",
  Apple = "SignInWithApple",
}

const LoginPage = (): JSX.Element => {
  const [isLoading, setLoading] = useState(false);
  const { uid } = useSelector(({ auth }: AppState) => auth);
  const history = useHistory();
  const dispatch = useDispatch();

  return isLoading ? (
    <div>
      <CircularProgress size={30} />
    </div>
  ) : uid ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="box-layout">
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
          <Typography style={{ fontSize: "15px", marginBottom: "18px" }}>
            Let the world know what you&apos;re up to.
          </Typography>
          <button
            type="button"
            onClick={async (): Promise<void> => {
              try {
                await Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Google,
                });
                openSnackbar({
                  message: "Successfully logged in.",
                  severity: "success",
                });
                history.push("/dashboard");
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
                const res = await Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Facebook,
                });
                if (res) {
                  openSnackbar({
                    message: "Successfully logged in.",
                    severity: "success",
                  });
                  console.log(res);
                  history.push("/dashboard");
                }
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
                openSnackbar({
                  message: "Successfully logged in.",
                  severity: "success",
                });
                history.push("/dashboard");
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
