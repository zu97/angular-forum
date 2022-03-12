import { CommentsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  addCommentsFailure,
  addCommentsRequest,
  addCommentsSuccess,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from './comments.actions';

const initialState: CommentsState = {
  comments: [],
  fetchLoading: false,
  fetchError: null,
  addLoading: false,
  addError: null,
};

export const commentsReducer = createReducer(
  initialState,
  on(fetchCommentsRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchCommentsSuccess, (state, {comments}) => ({...state, fetchLoading: false, comments})),
  on(fetchCommentsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(addCommentsRequest, state => ({...state, addLoading: true, addError: null})),
  on(addCommentsSuccess, state => ({...state, addLoading: false})),
  on(addCommentsFailure, (state, {error}) => ({...state, addLoading: false, addError: error})),
);
