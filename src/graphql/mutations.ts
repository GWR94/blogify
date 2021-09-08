/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const registerUser = /* GraphQL */ `
  mutation RegisterUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    registerUser(input: $input, condition: $condition) {
      id
      username
      email
      name
      following
      followers
      savedPosts
      profileImage {
        key
        bucket
        region
      }
      createdAt
      updatedAt
      owner
      posts {
        items {
          author
          body
          email
          id
          overview
          tags
          public
          title
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      name
      following
      followers
      savedPosts
      profileImage {
        key
        bucket
        region
      }
      createdAt
      updatedAt
      owner
      posts {
        items {
          author
          body
          email
          id
          overview
          tags
          public
          title
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      name
      following
      followers
      savedPosts
      profileImage {
        key
        bucket
        region
      }
      createdAt
      updatedAt
      owner
      posts {
        items {
          author
          body
          email
          id
          overview
          tags
          public
          title
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      author
      body
      email
      id
      overview
      tags
      public
      title
      userID
      createdAt
      updatedAt
      user {
        id
        username
        email
        name
        following
        followers
        savedPosts
        profileImage {
          key
          bucket
          region
        }
        createdAt
        updatedAt
        owner
        posts {
          nextToken
        }
      }
      comments {
        items {
          id
          postID
          likes
          content
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      author
      body
      email
      id
      overview
      tags
      public
      title
      userID
      createdAt
      updatedAt
      user {
        id
        username
        email
        name
        following
        followers
        savedPosts
        profileImage {
          key
          bucket
          region
        }
        createdAt
        updatedAt
        owner
        posts {
          nextToken
        }
      }
      comments {
        items {
          id
          postID
          likes
          content
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      author
      body
      email
      id
      overview
      tags
      public
      title
      userID
      createdAt
      updatedAt
      user {
        id
        username
        email
        name
        following
        followers
        savedPosts
        profileImage {
          key
          bucket
          region
        }
        createdAt
        updatedAt
        owner
        posts {
          nextToken
        }
      }
      comments {
        items {
          id
          postID
          likes
          content
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      postID
      likes
      content
      userID
      createdAt
      updatedAt
      post {
        author
        body
        email
        id
        overview
        tags
        public
        title
        userID
        createdAt
        updatedAt
        user {
          id
          username
          email
          name
          following
          followers
          savedPosts
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
      }
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      postID
      likes
      content
      userID
      createdAt
      updatedAt
      post {
        author
        body
        email
        id
        overview
        tags
        public
        title
        userID
        createdAt
        updatedAt
        user {
          id
          username
          email
          name
          following
          followers
          savedPosts
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
      }
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      postID
      likes
      content
      userID
      createdAt
      updatedAt
      post {
        author
        body
        email
        id
        overview
        tags
        public
        title
        userID
        createdAt
        updatedAt
        user {
          id
          username
          email
          name
          following
          followers
          savedPosts
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
      }
    }
  }
`;
