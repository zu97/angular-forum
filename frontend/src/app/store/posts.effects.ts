import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess, getPostFailure, getPostRequest, getPostSuccess
} from './posts.actions';
import { map, mergeMap, NEVER, tap, withLatestFrom } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { HelpersService } from '../services/helpers.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()
export class PostsEffects {

  constructor(
    private router: Router,
    private actions: Actions,
    private postsService: PostsService,
    private helpersService: HelpersService,
    private store: Store<AppState>
  ) {
  }

  fetchPosts = createEffect(() => this.actions.pipe(
    ofType(fetchPostsRequest),
    mergeMap(() => this.postsService.fetchPosts().pipe(
      map((posts) => fetchPostsSuccess({posts})),
      this.helpersService.catchServerError(fetchPostsFailure),
    )),
  ));

  addPost = createEffect(() => this.actions.pipe(
    ofType(addPostRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([data, user]) => {
      if (user) {
        return this.postsService.addPost(user.token, data.postData).pipe(
          map(() => addPostSuccess()),
          tap(() => {
            this.helpersService.openSnackBar('Post successfully added');
            void this.router.navigate(['/']);
          }),
          this.helpersService.catchServerError(addPostFailure),
        )
      }

      return NEVER;
    }),
  ));

  getPost = createEffect(() => this.actions.pipe(
    ofType(getPostRequest),
    mergeMap(({id}) => this.postsService.getPost(id).pipe(
      map((post) => getPostSuccess({post})),
      this.helpersService.catchServerError(getPostFailure),
    )),
  ));

}
