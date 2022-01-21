import configureStore, { MockStore } from "redux-mock-store";
import { Post, Comment, PostsState } from "../../store/posts.i";
import {
  addPost,
  setComments,
  addComment,
  updateComment,
  deleteComment,
  removePost,
  loadMorePosts,
  editPost,
  setPosts,
  setPublicPosts,
  postsSlice,
} from "../../slices/post.slice";

const mockStore = configureStore();

const initialState: PostsState = {
  posts: [],
  nextToken: null,
  comments: [],
};

const post1: Post = {
  id: "123",
  author: "Bill",
  body: "test test test",
  email: "bill@test.com",
  createdAt: "123",
  overview: "test overview",
  tags: ["test"],
  title: "Test post",
  public: true,
};

const post2: Post = {
  id: "321",
  author: "Tim",
  body: "test test test",
  email: "tim@test.com",
  createdAt: "123",
  overview: "test overview 2",
  tags: ["test2"],
  title: "Test post 2",
  public: true,
};

const comment1: Comment = {
  id: "123",
  content: "test comment 1",
  likes: ["321"],
  postID: "111",
  userID: "123",
};

const comment2: Comment = {
  id: "321",
  content: "test comment 2",
  likes: ["123"],
  postID: "222",
  userID: "321",
};

describe("posts.slice", () => {
  let store: MockStore;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  describe("posts.actions", () => {
    describe("posts/addPost", () => {
      it("should generate addPost action object", () => {
        const action = addPost({ post: post1 });
        expect(action).toEqual({
          type: "posts/addPost",
          payload: {
            post: post1,
          },
        });
      });
      it("should dispatch addPost action in store", () => {
        store.dispatch(addPost({ post: post1 }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/addPost",
            payload: {
              post: post1,
            },
          },
        ]);
      });
    });
    describe("posts/setComments", () => {
      it("should generate setComments action object", () => {
        const action = setComments({ comments: [comment1] });
        expect(action).toEqual({
          type: "posts/setComments",
          payload: {
            comments: [comment1],
          },
        });
      });
      it("should dispatch setComments action in store", () => {
        store.dispatch(setComments({ comments: [comment1, comment2] }));
        const action = store.getActions();
        expect(action).toEqual([
          {
            type: "posts/setComments",
            payload: {
              comments: [comment1, comment2],
            },
          },
        ]);
      });
    });
    describe("posts/addComment", () => {
      it("should generate addComment action object", () => {
        const action = addComment({ comment: comment1 });
        expect(action).toEqual({
          type: "posts/addComment",
          payload: {
            comment: comment1,
          },
        });
      });
      it("should dispatch addComment action in store", () => {
        store.dispatch(addComment({ comment: comment1 }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/addComment",
            payload: {
              comment: comment1,
            },
          },
        ]);
      });
    });
    describe("posts/updateComment", () => {
      it("should generate updateComment action object", () => {
        const action = updateComment({
          updates: {
            likes: ["111"],
          },
          id: "123",
        });
        expect(action).toEqual({
          type: "posts/updateComment",
          payload: {
            updates: {
              likes: ["111"],
            },
            id: "123",
          },
        });
      });
      it("should dispatch updateComment action in store", () => {
        store.dispatch(updateComment({ updates: { likes: ["111"] }, id: "222" }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/updateComment",
            payload: {
              updates: {
                likes: ["111"],
              },
              id: "222",
            },
          },
        ]);
      });
    });
    describe("posts/deleteComment", () => {
      it("should generate deleteComment action object", () => {
        const action = deleteComment({ id: "123" });
        expect(action).toEqual({
          type: "posts/deleteComment",
          payload: {
            id: "123",
          },
        });
      });
      it("should dispatch deleteComment action in store", () => {
        store.dispatch(deleteComment({ id: "123" }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/deleteComment",
            payload: {
              id: "123",
            },
          },
        ]);
      });
    });
    describe("posts/removePost", () => {
      it("should generate removePost action object", () => {
        const action = removePost({ id: "123" });
        expect(action).toEqual({
          type: "posts/removePost",
          payload: {
            id: "123",
          },
        });
      });
      it("should dispatch removePost action in store", () => {
        store.dispatch(removePost({ id: "123" }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/removePost",
            payload: {
              id: "123",
            },
          },
        ]);
      });
    });
    describe("posts/loadMorePosts", () => {
      it("should generate loadMorePosts action object", () => {
        const action = loadMorePosts({ posts: [post1, post2], nextToken: "123" });
        expect(action).toEqual({
          type: "posts/loadMorePosts",
          payload: {
            posts: [post1, post2],
            nextToken: "123",
          },
        });
      });
      it("should dispatch loadMorePosts action in store", () => {
        store.dispatch(loadMorePosts({ posts: [post1], nextToken: "321" }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/loadMorePosts",
            payload: {
              posts: [post1],
              nextToken: "321",
            },
          },
        ]);
      });
    });
  });
  describe("posts.reducers", () => {
    describe("posts/addPost", () => {
      it("should place the post into the store for addPost", () => {
        const state = postsSlice.reducer(initialState, addPost({ post: post1 }));
        expect(state).toEqual({
          posts: [post1],
          nextToken: null,
          comments: [],
        });
      });
      it("should dispatch addPost action in store", () => {
        store.dispatch(addPost({ post: post1 }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/addPost",
            payload: {
              post: post1,
            },
          },
        ]);
      });
    });
    describe("posts/setComments", () => {
      it("should update comments into the store for setComments", () => {
        const state = postsSlice.reducer(
          initialState,
          setComments({ comments: [comment1, comment2] }),
        );
        expect(state).toEqual({
          posts: [],
          nextToken: null,
          comments: [comment1, comment2],
        });
      });
    });
    describe("posts/addComment", () => {
      it("should add comment into store for addComment", () => {
        const state = postsSlice.reducer(initialState, addComment({ comment: comment1 }));
        expect(state).toEqual({
          posts: [],
          nextToken: null,
          comments: [comment1],
        });
      });
      it("should dispatch addComment in store", () => {
        store.dispatch(addComment({ comment: comment1 }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/addComment",
            payload: {
              comment: comment1,
            },
          },
        ]);
      });
    });
    describe("posts/updateComment", () => {
      it("should update the comment in store for updateComment", () => {
        const state = postsSlice.reducer(
          {
            ...initialState,
            comments: [
              {
                content: "previous content",
                id: "123",
                likes: [],
                postID: "111",
                userID: "222",
              },
            ],
          },
          updateComment({
            id: "123",
            updates: {
              content: "the test works",
              likes: ["111"],
            },
          }),
        );
        expect(state).toEqual({
          posts: [],
          nextToken: null,
          comments: [
            {
              id: "123",
              content: "the test works",
              postID: "111",
              userID: "222",
              likes: ["111"],
            },
          ],
        });
      });
      it("should dispatch updateComment in store", () => {
        store.dispatch(
          updateComment({ id: post1.id as string, updates: { likes: ["123"] } }),
        );
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/updateComment",
            payload: { id: post1.id as string, updates: { likes: ["123"] } },
          },
        ]);
      });
    });
    describe("posts/deleteComment", () => {
      it("should delete the selected comment from the store for deleteComment", () => {
        const state = postsSlice.reducer(
          {
            ...initialState,
            comments: [comment1, comment2],
          },
          deleteComment({ id: "123" }),
        );
        expect(state).toEqual({
          posts: [],
          nextToken: null,
          comments: [comment2],
        });
      });
      it("should dispatch deleteComment action in store", () => {
        store.dispatch(deleteComment({ id: "123" }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/deleteComment",
            payload: {
              id: "123",
            },
          },
        ]);
      });
    });
    describe("posts/removePost", () => {
      it("should delete the post from the store for removePost", () => {
        const state = postsSlice.reducer(
          { ...initialState, posts: [post1, post2] },
          removePost({ id: "123" }),
        );
        expect(state).toEqual({
          posts: [post2],
          nextToken: null,
          comments: [],
        });
      });
      it("should dispatch removePost action in store", () => {
        store.dispatch(removePost({ id: "123" }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/removePost",
            payload: {
              id: "123",
            },
          },
        ]);
      });
    });
    describe("posts/editPost", () => {
      it("should store the edited post into the store for editPost", () => {
        const state = postsSlice.reducer(
          { ...initialState, posts: [post1, post2] },
          editPost({
            id: post1.id as string,
            updates: {
              title: "updated title",
            },
          }),
        );
        expect(state).toEqual({
          ...initialState,
          posts: [{ ...post1, title: "updated title" }, post2],
        });
      });
      it("should dispatch editPost action in store", () => {
        store.dispatch(editPost({ id: "123", updates: { title: "updated title" } }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/editPost",
            payload: {
              id: "123",
              updates: {
                title: "updated title",
              },
            },
          },
        ]);
      });
    });
    describe("posts/setPosts", () => {
      it("should set the posts into store for setPosts", () => {
        const state = postsSlice.reducer(
          { ...initialState, posts: [] },
          setPosts({ posts: [post1, post2], nextToken: null }),
        );
        expect(state).toEqual({
          comments: [],
          posts: [post1, post2],
          nextToken: null,
        });
      });
      it("should dispatch setPosts action in store", () => {
        store.dispatch(setPosts({ posts: [post1, post2], nextToken: null }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/setPosts",
            payload: {
              posts: [post1, post2],
              nextToken: null,
            },
          },
        ]);
      });
    });
    describe("posts/setPublicPosts", () => {
      it("should set the posts into store for setPublicPosts", () => {
        const state = postsSlice.reducer(
          { ...initialState, posts: [] },
          setPublicPosts({ posts: [post1, post2], nextToken: null }),
        );
        expect(state).toEqual({
          comments: [],
          posts: [post1, post2],
          nextToken: null,
        });
      });
      it("should dispatch setPublicPosts action in store", () => {
        store.dispatch(setPublicPosts({ posts: [post1, post2], nextToken: null }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "posts/setPublicPosts",
            payload: {
              posts: [post1, post2],
              nextToken: null,
            },
          },
        ]);
      });
    });
  });
});
