import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, NEVER, tap, withLatestFrom } from 'rxjs';
import { HelpersService } from '../services/helpers.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { CommentsService } from '../services/comments.service';
import {
  addCommentsFailure,
  addCommentsRequest,
  addCommentsSuccess,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from './comments.actions';

@Injectable()
export class CommentsEffects {

  constructor(
    private router: Router,
    private actions: Actions,
    private commentsService: CommentsService,
    private helpersService: HelpersService,
    private store: Store<AppState>
  ) {
  }

  fetchComments = createEffect(() => this.actions.pipe(
    ofType(fetchCommentsRequest),
    mergeMap(({id}) => this.commentsService.fetchComments(id).pipe(
      map((comments) => fetchCommentsSuccess({comments})),
      this.helpersService.catchServerError(fetchCommentsFailure),
    )),
  ));

  addComments = createEffect(() => this.actions.pipe(
    ofType(addCommentsRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([data, user]) => {
      if (user) {
        return this.commentsService.addComment(user.token, data.id, data.commentData).pipe(
          map(() => addCommentsSuccess()),
          tap(() => {
            this.helpersService.openSnackBar('Comment successfully added');
            this.store.dispatch(fetchCommentsRequest({id: data.id}));
          }),
          this.helpersService.catchServerError(addCommentsFailure),
        )
      }

      return NEVER;
    }),
  ));

}
