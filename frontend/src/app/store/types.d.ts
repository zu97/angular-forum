import { LoginError, RegisterError, User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
};

export type PostsState = {
  posts: Post[],
  post: null | Post,
  fetchLoading: boolean,
  fetchError: null | string,
  addLoading: boolean,
  addError: null | string,
  getLoading: boolean,
  getError: null | string,
};

export type CommentsState = {
  comments: Comment[],
  fetchLoading: boolean,
  fetchError: null | string,
  addLoading: boolean,
  addError: null | string,
};

export type AppState = {
  users: UsersState,
  posts: PostsState,
  comments: CommentsState,
};
