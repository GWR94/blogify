/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      social
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
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
        social
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        user {
          id
          username
          social
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
          social
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
      }
      nextToken
    }
  }
`;
