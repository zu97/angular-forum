import { PostsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess, getPostFailure, getPostRequest, getPostSuccess
} from './posts.actions';

const initialState: PostsState = {
  posts: [],
  post: null,
  fetchLoading: false,
  fetchError: null,
  addLoading: false,
  addError: null,
  getLoading: false,
  getError: null,
};

export const postsReducer = createReducer(
  initialState,
  on(fetchPostsRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchPostsSuccess, (state, {posts}) => ({...state, fetchLoading: false, posts})),
  on(fetchPostsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(addPostRequest, state => ({...state, addLoading: true, addError: null})),
  on(addPostSuccess, state => ({...state, addLoading: false})),
  on(addPostFailure, (state, {error}) => ({...state, addLoading: false, addError: error})),

  on(getPostRequest, state => ({...state, getLoading: true, getError: null})),
  on(getPostSuccess, (state, {post}) => ({...state, getLoading: false, post})),
  on(getPostFailure, (state, {error}) => ({...state, getLoading: false, getError: error})),
);
