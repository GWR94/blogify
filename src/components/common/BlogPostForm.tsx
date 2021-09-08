import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { TextField, Grid, Checkbox, FormControlLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import QuillEditor from "./QuillEditor";
import { BlogPostFormProps, BlogPostFormState } from "../../interfaces/BlogPostForm.i";
import Button from "../../utils/components/MuiButton";
import { openSnackbar } from "../../utils/components/Notifier";
import { useHistory } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { deletePost } from "../../graphql/mutations";
import { useDispatch } from "react-redux";
import * as actions from "../../actions/posts.action";
import { Container } from "@material-ui/core";

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, onSubmit }): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState<BlogPostFormState>({
    id: post?.id ?? "",
    title: post?.title ?? "",
    overview: post?.overview ?? "",
    body: post?.body ?? "",
    author: post?.author ?? "",
    email: post?.email ?? "",
    tags: post?.tags ?? [],
    error: {
      title: "",
      overview: "",
      body: "",
      author: "",
      email: "",
      tags: "",
    },
    publicPost: post?.public ?? false,
  });

  const onRemove = async (): Promise<void> => {
    try {
      await API.graphql(
        graphqlOperation(deletePost, {
          input: {
            id: post?.id,
          },
        }),
      );
      dispatch(actions.removePost(post?.id as string));
      openSnackbar({
        message: "Post successfully deleted.",
        severity: "success",
      });
      history.push("/dashboard");
    } catch (err) {
      console.error(err);
      openSnackbar({
        message: "Unable to delete post. Please try again",
        severity: "error",
      });
    }
  };

  const handleValidation = (): boolean => {
    const { tags } = state;
    let validated = true;
    if (tags.length === 0) {
      setState({
        ...state,
        error: { ...state.error, tags: "Please provide at least one tag" },
      });
      validated = false;
    }
    return validated;
  };

  const onHandleSubmit = (e): void => {
    e.preventDefault();
    const validated = handleValidation();
    if (!validated) return;
    const { tags, title, overview, body, author, email, publicPost } = state;
    onSubmit({
      title,
      overview,
      body,
      author,
      email,
      tags,
      public: publicPost,
    });
  };

  const { title, overview, body, author, email, tags, publicPost, error } = state;

  return (
    <Container>
      <form className="form" onSubmit={onHandleSubmit}>
        <TextField
          placeholder="Title"
          label="Title"
          variant="outlined"
          autoFocus
          helperText={error.title}
          error={!!error.title}
          value={title}
          onChange={(e): void =>
            setState({
              ...state,
              error: { ...state.error, title: "" },
              title: e.target.value,
            })
          }
          style={{ marginBottom: 12 }}
        />
        <TextField
          label="Overview"
          variant="outlined"
          helperText={error.overview}
          error={!!error.overview}
          placeholder="Enter the overview of the current post"
          value={overview}
          onChange={(e): void =>
            setState({
              ...state,
              error: { ...state.error, overview: "" },
              overview: e.target.value,
            })
          }
          style={{ marginBottom: 12 }}
        />
        <QuillEditor
          passedBody={body}
          onUpdate={(updatedBody: string): void =>
            setState({
              ...state,
              error: { ...state.error, body: "" },
              body: updatedBody,
            })
          }
        />
        <Autocomplete
          multiple
          id="collections-input"
          options={tags.sort((a, b) => -b.slice(0, 1).localeCompare(a.slice(0, 1)))}
          filterSelectedOptions
          fullWidth
          autoComplete
          freeSolo
          value={tags || []}
          onChange={(_event, tags): void => {
            setState((prevState): BlogPostFormState => {
              if (prevState.tags.length >= 10) {
                openSnackbar({
                  severity: "error",
                  message: `Please only add up to 10 tags.`,
                });
                return prevState;
              }
              return {
                ...prevState,
                tags: tags.sort((a, b) => -b.slice(0, 1).localeCompare(a.slice(0, 1))),
              };
            });
          }}
          classes={{
            tag: null, // todo
          }}
          renderInput={(params): JSX.Element => (
            <TextField
              {...params}
              variant="outlined"
              helperText={error.tags}
              error={!!error.tags}
              label="Tags"
              fullWidth
            />
          )}
          style={{ margin: "12px 0" }}
        />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              className="form__author"
              placeholder="Enter Author name"
              label="Author"
              variant="outlined"
              helperText={error.author}
              error={!!error.author}
              value={author}
              onChange={(e): void => setState({ ...state, author: e.target.value })}
              fullWidth
              style={{ marginBottom: 4 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className="form__author"
              variant="outlined"
              type="email"
              placeholder="Enter email address of Author"
              label="Email Address"
              value={email}
              helperText={error.email}
              error={!!error.email}
              onChange={(e): void => setState({ ...state, email: e.target.value })}
              fullWidth
              style={{ marginBottom: 4 }}
            />
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={publicPost}
                onChange={(e): void =>
                  setState({ ...state, publicPost: e.target.checked })
                }
                name="publicPost"
              />
            }
            label="Public Post"
          />
        </Grid>
      </form>
      <div className="form__buttonContainer">
        <Button
          onClick={(): void => {
            if (post) onRemove();
            history.push("/dashboard");
          }}
          variant="outlined"
          color="error"
          style={{ marginRight: 10 }}
        >
          {post ? "Remove Post" : "Cancel"}
        </Button>
        <Button onClick={onHandleSubmit} color="primary" variant="contained">
          {post ? "Save Post" : "Add Post"}
        </Button>
      </div>
    </Container>
  );
};

export default BlogPostForm;
