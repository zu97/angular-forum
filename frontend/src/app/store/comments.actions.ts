import { createAction, props } from '@ngrx/store';
import { AddCommentData, AddCommentError, Comment, CommentError } from '../models/comment.model';

export const fetchCommentsRequest = createAction('[Comments] Fetch Request', props<{ id: string }>());
export const fetchCommentsSuccess = createAction('[Comments] Fetch Success', props<{ comments: Comment[] }>());
export const fetchCommentsFailure = createAction('[Comments] Fetch Failure', props<{ error: null | CommentError }>());

export const addCommentsRequest = createAction('[Comments] Add Request', props<{ id: string, commentData: AddCommentData }>());
export const addCommentsSuccess = createAction('[Comments] Add Success');
export const addCommentsFailure = createAction('[Comments] Add Failure', props<{ error: null | AddCommentError }>());
