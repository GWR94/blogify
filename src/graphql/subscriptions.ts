/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
