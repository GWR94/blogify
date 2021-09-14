import React, { useState } from "react";
import { API, Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import Headroom from "react-headroom";
import {
  AppBar,
  capitalize,
  ClickAwayListener,
  Collapse,
  Container,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { LibraryBooksRounded, MenuRounded } from "@material-ui/icons";
import { AppState } from "../../store/store";
import LoginModal from "../auth/LoginModal";
import { openSnackbar } from "../../utils/components/Notifier";
import { breakpoints } from "../../utils";
import * as authActions from "../../actions/auth.action";
import SearchAutoComplete from "./SearchAutoComplete";

const Header: React.FC = (): JSX.Element => {
  const history = useHistory();
  const { uid } = useSelector(({ auth }: AppState) => auth);
  const dispatch = useDispatch();
  const mobile = useMediaQuery(breakpoints.only("xs"));

  const [loginOpen, setLoginOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const handleSignOut = async (): Promise<void> => {
    try {
      history.push("/");
      dispatch(authActions.logout());
      await Auth.signOut({ global: true });
      openSnackbar({
        message: "Successfully signed out.",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      openSnackbar({
        severity: "error",
        message: "Unable to sign out. Please try again.",
      });
    }
  };

  return (
    <>
      <ClickAwayListener onClickAway={(): void => setNavOpen(false)}>
        <Headroom
          wrapperStyle={{
            position: "relative",
            zIndex: 2,
            height: "70px",
            background: "#3f51b5",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <AppBar
            position="relative"
            elevation={4}
            style={{
              borderTop: `3px solid skyblue`,
              borderBottom: "none",
              padding: "0 20px",
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              width: "100%",
            }}
          >
            <Container>
              <div className="nav__container">
                <div className="header__content">
                  <div
                    className="header__title"
                    role="button"
                    tabIndex={0}
                    onClick={(): void => {
                      history.push("/dashboard");
                      setNavOpen(false);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Typography variant="h5" style={{ textDecoration: "none" }}>
                      Blogify
                    </Typography>
                    <LibraryBooksRounded
                      style={{
                        marginLeft: 5,
                        color: "rgba(255,255,255,0.5)",
                      }}
                    />
                  </div>
                  <div className="header__search--container">
                    {!mobile && <SearchAutoComplete redirect />}
                    <MenuRounded
                      onClick={(): void => setNavOpen(!navOpen)}
                      style={{ color: "#fff", marginLeft: 20 }}
                    />
                  </div>
                </div>
              </div>
              <Collapse in={navOpen}>
                {uid ? (
                  <div className="header__collapsed">
                    {mobile && <SearchAutoComplete redirect />}
                    <div
                      className="header__link"
                      tabIndex={0}
                      role="button"
                      onClick={(): void => {
                        history.push("/create");
                        setNavOpen(false);
                      }}
                    >
                      Create Post
                    </div>
                    <div
                      className="header__link"
                      tabIndex={0}
                      role="button"
                      onClick={(): void => {
                        history.push("/profile");
                        setNavOpen(false);
                      }}
                    >
                      View Profile
                    </div>
                    <div
                      className="header__link"
                      tabIndex={0}
                      role="button"
                      onClick={(): void => {
                        history.push("/dashboard?view=personal");
                        setNavOpen(false);
                      }}
                    >
                      View Feed
                    </div>
                    <div
                      tabIndex={0}
                      role="button"
                      className="header__link"
                      onClick={handleSignOut}
                    >
                      Logout
                    </div>
                  </div>
                ) : (
                  <div className="header__collapsed">
                    <div
                      className="header__link"
                      tabIndex={0}
                      role="button"
                      onClick={(): void => {
                        setLoginOpen(true);
                        setNavOpen(false);
                      }}
                    >
                      Login
                    </div>
                  </div>
                )}
              </Collapse>
            </Container>
          </AppBar>
        </Headroom>
      </ClickAwayListener>
      <LoginModal open={loginOpen} onClose={(): void => setLoginOpen(false)} />
    </>
  );
};

export default Header;
