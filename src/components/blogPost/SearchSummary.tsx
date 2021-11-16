import React, { useState } from "react";
import { Container, createTheme, Typography, useMediaQuery } from "@material-ui/core";
import Button from "../../utils/components/MuiButton";
import LoginModal from "../auth/LoginModal";

const SearchSummary = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const theme = createTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <section className="page-header">
        <Container className="search__container">
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
            Viewing public posts
          </Typography>
          <Typography className="summary__subtitle" style={{ marginBottom: "10px" }}>
            To make your own posts, or to comment & share these fantastic articles, simply
            login below!
          </Typography>
          <div className="header__buttonContainer">
            <Button
              color="info"
              onClick={(): void => setOpen(true)}
              variant={isOpen ? "contained" : "outlined"}
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                fontSize: mobile ? "12px" : "14px",
              }}
            >
              Login to View Feed
            </Button>
            <Button
              color="info"
              variant={!isOpen ? "contained" : "outlined"}
              className="summary__button"
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                fontSize: mobile ? "12px" : "14px",
              }}
            >
              {isOpen ? "View" : "Viewing"} Public Posts
            </Button>
          </div>
        </Container>
      </section>
      <LoginModal open={isOpen} onClose={(): void => setOpen(false)} />
    </>
  );
};

export default SearchSummary;
