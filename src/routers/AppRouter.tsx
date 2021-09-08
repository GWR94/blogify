import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Link, NavLink, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { API, Auth, graphqlOperation, Hub } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import BlogDashboardPage from "../components/blogPost/BlogDashboard";
import NotFoundPage from "../components/common/NotFound";
import LoginPage from "../components/auth/LoginPage";
import * as actions from "../actions/auth.action";
import AddPost from "../components/post/AddPost";
import EditPost from "../components/post/EditPost";
import ReadPost from "../components/post/ReadPost";
import { AppState } from "../store/store";
import { getUser } from "../graphql/queries";
import { registerUser } from "../graphql/mutations";
import { HubCapsule, SignInUserData } from "./router.i";
import Profile from "../components/auth/Profile";
import awsExports from "../aws-exports";
import SearchResults from "../components/common/SearchResults";

export const history = createHistory();

const AppRouter = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { uid } = useSelector(({ auth }: AppState) => auth);

  const getUserData = async (): Promise<void> => {
    try {
      if (!uid) {
        const user = await Auth.currentAuthenticatedUser();
        const id =
          user?.attributes?.sub ??
          user?.id ??
          user.signInUserSession?.idToken?.payload?.sub;
        if (user) {
          dispatch(actions.login(id, user.attributes.name, user.attributes.email));
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  /**
   * A function to register a new user, and save it into the database by using the registerUser
   * graphQL mutation.
   * @param {SignInUserData} signInData - Object containing the current authenticated
   * users' data
   */
  const registerNewUser = async (
    signInData: SignInUserData | undefined,
  ): Promise<void> => {
    /**
     * Get the id from signInData - it's in different locations based on what provider user
     * logged in with. This will be used to check if the user is already a part of the database
     * by checking the id against the getUser query.
     */
    const id =
      signInData?.attributes?.sub ??
      signInData?.id ??
      signInData?.signInUserSession?.idToken?.payload?.sub;

    const name = signInData?.signInUserSession.idToken.payload.name;
    const email =
      signInData?.email ?? signInData?.signInUserSession.idToken.payload.email;

    // check to see if the user is in the database
    try {
      const { data } = await API.graphql(graphqlOperation(getUser, { id }));
      dispatch(
        actions.updateUser({
          followers: data.getUser.followers,
          following: data.getUser.following,
        }),
      );
      // if there is no data.getUser, then the user is not in the database
      if (!data.getUser) {
        /**
         * spread the getUserInput object into a new variable, and add the username and email
         * from signInData to it. Then set registered to true so the database holds valid
         * information.
         */
        const registerUserInput = {
          id,
          username: signInData?.username,
          name,
          email,
          followers: [],
          following: [],
          savedPosts: [],
          profileImage: {
            key: "placeholder.png",
            bucket: awsExports.aws_user_files_s3_bucket,
            region: awsExports.aws_user_files_s3_bucket_region,
          },
        };
        // execute the registerUser mutation to add the user to the database.
        await API.graphql(
          graphqlOperation(registerUser, {
            input: registerUserInput,
          }),
        );
        console.log("user created", registerUserInput);
      }
    } catch (err) {
      // log any errors
      console.error(err);
    }
  };

  const onHubCapsule = async (capsule: HubCapsule): Promise<void> => {
    switch (capsule.payload.event) {
      case "signIn": {
        await getUserData();
        await registerNewUser(capsule.payload.data);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    Hub.listen("auth", onHubCapsule);
  }, []);

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/dashboard" component={BlogDashboardPage} />
          <Route path="/create" component={AddPost} />
          <Route
            path="/edit/:id"
            component={(_: { match: { params: { id: string } } }): JSX.Element =>
              uid ? <EditPost id={_.match.params.id} /> : <Redirect to="/" />
            }
          />
          <Route
            path="/read/:id"
            component={(_: { match: { params: { id: string } } }): JSX.Element => (
              <ReadPost id={_.match.params.id} />
            )}
          />
          <Route path="/profile" component={Profile} />
          <Route path="/search" component={SearchResults} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
