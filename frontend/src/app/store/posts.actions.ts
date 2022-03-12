import { createAction, props } from '@ngrx/store';
import { Post, AddPostData } from '../models/post.model';

export const fetchPostsRequest = createAction('[Posts] Fetch Request');
export const fetchPostsSuccess = createAction('[Posts] Fetch Success', props<{ posts: Post[] }>());
export const fetchPostsFailure = createAction('[Posts] Fetch Failure', props<{ error: null | string }>());

export const addPostRequest = createAction('[Posts] Add Request', props<{ postData: AddPostData }>());
export const addPostSuccess = createAction('[Posts] Add Success');
export const addPostFailure = createAction('[Posts] Add Failure', props<{ error: null | string }>());

export const getPostRequest = createAction('[Posts] Get Request', props<{ id: string }>());
export const getPostSuccess = createAction('[Posts] Get Success', props<{ post: Post }>());
export const getPostFailure = createAction('[Posts] Get Failure', props<{ error: null | string }>());
