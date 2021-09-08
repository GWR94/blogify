/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
  name: string,
  following: Array< string | null >,
  followers: Array< string | null >,
  savedPosts?: Array< string | null > | null,
  profileImage?: S3ImageInput | null,
};

export type S3ImageInput = {
  key: string,
  bucket: string,
  region: string,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  following?: ModelStringInput | null,
  followers?: ModelStringInput | null,
  savedPosts?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  email: string,
  name: string,
  following: Array< string | null >,
  followers: Array< string | null >,
  savedPosts?: Array< string | null > | null,
  profileImage?: S3Image | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
  posts?: ModelPostConnection | null,
};

export type S3Image = {
  __typename: "S3Image",
  key: string,
  bucket: string,
  region: string,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items?:  Array<Post | null > | null,
  nextToken?: string | null,
};

export type Post = {
  __typename: "Post",
  author: string,
  body: string,
  email: string,
  id: string,
  overview: string,
  tags: Array< string | null >,
  public?: boolean | null,
  title: string,
  userID?: string | null,
  createdAt: string,
  updatedAt: string,
  user?: User | null,
  comments?: ModelCommentConnection | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items?:  Array<Comment | null > | null,
  nextToken?: string | null,
};

export type Comment = {
  __typename: "Comment",
  id: string,
  postID: string,
  likes: Array< string | null >,
  content: string,
  userID?: string | null,
  createdAt: string,
  updatedAt: string,
  post?: Post | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  name?: string | null,
  following?: Array< string | null > | null,
  followers?: Array< string | null > | null,
  savedPosts?: Array< string | null > | null,
  profileImage?: S3ImageInput | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreatePostInput = {
  author: string,
  body: string,
  email: string,
  id?: string | null,
  overview: string,
  tags: Array< string | null >,
  public?: boolean | null,
  title: string,
  userID?: string | null,
};

export type ModelPostConditionInput = {
  author?: ModelStringInput | null,
  body?: ModelStringInput | null,
  email?: ModelStringInput | null,
  overview?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  public?: ModelBooleanInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePostInput = {
  author?: string | null,
  body?: string | null,
  email?: string | null,
  id: string,
  overview?: string | null,
  tags?: Array< string | null > | null,
  public?: boolean | null,
  title?: string | null,
  userID?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type CreateCommentInput = {
  id?: string | null,
  postID: string,
  likes: Array< string | null >,
  content: string,
  userID?: string | null,
};

export type ModelCommentConditionInput = {
  postID?: ModelIDInput | null,
  likes?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateCommentInput = {
  id: string,
  postID?: string | null,
  likes?: Array< string | null > | null,
  content?: string | null,
  userID?: string | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type ModelPostFilterInput = {
  author?: ModelStringInput | null,
  body?: ModelStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  overview?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  public?: ModelBooleanInput | null,
  title?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  postID?: ModelIDInput | null,
  likes?: ModelStringInput | null,
  content?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type RegisterUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type RegisterUserMutation = {
  registerUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    name: string,
    following: Array< string | null >,
    followers: Array< string | null >,
    savedPosts?: Array< string | null > | null,
    profileImage?:  {
      __typename: "S3Image",
      key: string,
      bucket: string,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        author: string,
        body: string,
        email: string,
        id: string,
        overview: string,
        tags: Array< string | null >,
        public?: boolean | null,
        title: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    name: string,
    following: Array< string | null >,
    followers: Array< string | null >,
    savedPosts?: Array< string | null > | null,
    profileImage?:  {
      __typename: "S3Image",
      key: string,
      bucket: string,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        author: string,
        body: string,
        email: string,
        id: string,
        overview: string,
        tags: Array< string | null >,
        public?: boolean | null,
        title: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    name: string,
    following: Array< string | null >,
    followers: Array< string | null >,
    savedPosts?: Array< string | null > | null,
    profileImage?:  {
      __typename: "S3Image",
      key: string,
      bucket: string,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        author: string,
        body: string,
        email: string,
        id: string,
        overview: string,
        tags: Array< string | null >,
        public?: boolean | null,
        title: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    author: string,
    body: string,
    email: string,
    id: string,
    overview: string,
    tags: Array< string | null >,
    public?: boolean | null,
    title: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      name: string,
      following: Array< string | null >,
      followers: Array< string | null >,
      savedPosts?: Array< string | null > | null,
      profileImage?:  {
        __typename: "S3Image",
        key: string,
        bucket: string,
        region: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postID: string,
        likes: Array< string | null >,
        content: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    author: string,
    body: string,
    email: string,
    id: string,
    overview: string,
    tags: Array< string | null >,
    public?: boolean | null,
    title: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      name: string,
      following: Array< string | null >,
      followers: Array< string | null >,
      savedPosts?: Array< string | null > | null,
      profileImage?:  {
        __typename: "S3Image",
        key: string,
        bucket: string,
        region: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postID: string,
        likes: Array< string | null >,
        content: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    author: string,
    body: string,
    email: string,
    id: string,
    overview: string,
    tags: Array< string | null >,
    public?: boolean | null,
    title: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      name: string,
      following: Array< string | null >,
      followers: Array< string | null >,
      savedPosts?: Array< string | null > | null,
      profileImage?:  {
        __typename: "S3Image",
        key: string,
        bucket: string,
        region: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postID: string,
        likes: Array< string | null >,
        content: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    postID: string,
    likes: Array< string | null >,
    content: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      author: string,
      body: string,
      email: string,
      id: string,
      overview: string,
      tags: Array< string | null >,
      public?: boolean | null,
      title: string,
      userID?: string | null,
      createdAt: string,
      updatedAt: string,
      user?:  {
        __typename: "User",
        id: string,
        username: string,
        email: string,
        name: string,
        following: Array< string | null >,
        followers: Array< string | null >,
        savedPosts?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    postID: string,
    likes: Array< string | null >,
    content: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      author: string,
      body: string,
      email: string,
      id: string,
      overview: string,
      tags: Array< string | null >,
      public?: boolean | null,
      title: string,
      userID?: string | null,
      createdAt: string,
      updatedAt: string,
      user?:  {
        __typename: "User",
        id: string,
        username: string,
        email: string,
        name: string,
        following: Array< string | null >,
        followers: Array< string | null >,
        savedPosts?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    postID: string,
    likes: Array< string | null >,
    content: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      author: string,
      body: string,
      email: string,
      id: string,
      overview: string,
      tags: Array< string | null >,
      public?: boolean | null,
      title: string,
      userID?: string | null,
      createdAt: string,
      updatedAt: string,
      user?:  {
        __typename: "User",
        id: string,
        username: string,
        email: string,
        name: string,
        following: Array< string | null >,
        followers: Array< string | null >,
        savedPosts?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    name: string,
    following: Array< string | null >,
    followers: Array< string | null >,
    savedPosts?: Array< string | null > | null,
    profileImage?:  {
      __typename: "S3Image",
      key: string,
      bucket: string,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        author: string,
        body: string,
        email: string,
        id: string,
        overview: string,
        tags: Array< string | null >,
        public?: boolean | null,
        title: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    author: string,
    body: string,
    email: string,
    id: string,
    overview: string,
    tags: Array< string | null >,
    public?: boolean | null,
    title: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      name: string,
      following: Array< string | null >,
      followers: Array< string | null >,
      savedPosts?: Array< string | null > | null,
      profileImage?:  {
        __typename: "S3Image",
        key: string,
        bucket: string,
        region: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postID: string,
        likes: Array< string | null >,
        content: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items?:  Array< {
      __typename: "Post",
      author: string,
      body: string,
      email: string,
      id: string,
      overview: string,
      tags: Array< string | null >,
      public?: boolean | null,
      title: string,
      userID?: string | null,
      createdAt: string,
      updatedAt: string,
      user?:  {
        __typename: "User",
        id: string,
        username: string,
        email: string,
        name: string,
        following: Array< string | null >,
        followers: Array< string | null >,
        savedPosts?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    postID: string,
    likes: Array< string | null >,
    content: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      author: string,
      body: string,
      email: string,
      id: string,
      overview: string,
      tags: Array< string | null >,
      public?: boolean | null,
      title: string,
      userID?: string | null,
      createdAt: string,
      updatedAt: string,
      user?:  {
        __typename: "User",
        id: string,
        username: string,
        email: string,
        name: string,
        following: Array< string | null >,
        followers: Array< string | null >,
        savedPosts?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items?:  Array< {
      __typename: "Comment",
      id: string,
      postID: string,
      likes: Array< string | null >,
      content: string,
      userID?: string | null,
      createdAt: string,
      updatedAt: string,
      post?:  {
        __typename: "Post",
        author: string,
        body: string,
        email: string,
        id: string,
        overview: string,
        tags: Array< string | null >,
        public?: boolean | null,
        title: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    author: string,
    body: string,
    email: string,
    id: string,
    overview: string,
    tags: Array< string | null >,
    public?: boolean | null,
    title: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      name: string,
      following: Array< string | null >,
      followers: Array< string | null >,
      savedPosts?: Array< string | null > | null,
      profileImage?:  {
        __typename: "S3Image",
        key: string,
        bucket: string,
        region: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postID: string,
        likes: Array< string | null >,
        content: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    author: string,
    body: string,
    email: string,
    id: string,
    overview: string,
    tags: Array< string | null >,
    public?: boolean | null,
    title: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      name: string,
      following: Array< string | null >,
      followers: Array< string | null >,
      savedPosts?: Array< string | null > | null,
      profileImage?:  {
        __typename: "S3Image",
        key: string,
        bucket: string,
        region: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postID: string,
        likes: Array< string | null >,
        content: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    author: string,
    body: string,
    email: string,
    id: string,
    overview: string,
    tags: Array< string | null >,
    public?: boolean | null,
    title: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      name: string,
      following: Array< string | null >,
      followers: Array< string | null >,
      savedPosts?: Array< string | null > | null,
      profileImage?:  {
        __typename: "S3Image",
        key: string,
        bucket: string,
        region: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postID: string,
        likes: Array< string | null >,
        content: string,
        userID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    postID: string,
    likes: Array< string | null >,
    content: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      author: string,
      body: string,
      email: string,
      id: string,
      overview: string,
      tags: Array< string | null >,
      public?: boolean | null,
      title: string,
      userID?: string | null,
      createdAt: string,
      updatedAt: string,
      user?:  {
        __typename: "User",
        id: string,
        username: string,
        email: string,
        name: string,
        following: Array< string | null >,
        followers: Array< string | null >,
        savedPosts?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    postID: string,
    likes: Array< string | null >,
    content: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      author: string,
      body: string,
      email: string,
      id: string,
      overview: string,
      tags: Array< string | null >,
      public?: boolean | null,
      title: string,
      userID?: string | null,
      createdAt: string,
      updatedAt: string,
      user?:  {
        __typename: "User",
        id: string,
        username: string,
        email: string,
        name: string,
        following: Array< string | null >,
        followers: Array< string | null >,
        savedPosts?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    postID: string,
    likes: Array< string | null >,
    content: string,
    userID?: string | null,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      author: string,
      body: string,
      email: string,
      id: string,
      overview: string,
      tags: Array< string | null >,
      public?: boolean | null,
      title: string,
      userID?: string | null,
      createdAt: string,
      updatedAt: string,
      user?:  {
        __typename: "User",
        id: string,
        username: string,
        email: string,
        name: string,
        following: Array< string | null >,
        followers: Array< string | null >,
        savedPosts?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};
