import { LoginError, RegisterError, User } from '../models/user.model';
import { AddPostError, Post, PostError } from '../models/post.model';
import { AddCommentError, Comment, CommentError } from '../models/comment.model';

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
  fetchError: null | PostError,
  addLoading: boolean,
  addError: null | AddPostError,
  getLoading: boolean,
  getError: null | PostError,
};

export type CommentsState = {
  comments: Comment[],
  fetchLoading: boolean,
  fetchError: null | CommentError,
  addLoading: boolean,
  addError: null | AddCommentError,
};

export type AppState = {
  users: UsersState,
  posts: PostsState,
  comments: CommentsState,
};
