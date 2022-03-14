import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { Observable } from 'rxjs';
import { Comment, CommentError } from '../../../models/comment.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { ActivatedRoute } from '@angular/router';
import { fetchCommentsRequest } from '../../../store/comments.actions';

@Component({
  selector: 'app-comment-items',
  templateUrl: './comment-items.component.html',
  styleUrls: ['./comment-items.component.css']
})
export class CommentItemsComponent implements OnInit {
  @Input() post!: Post;

  comments: Observable<Comment[]>;
  isLoading: Observable<boolean>;
  error: Observable<null | CommentError>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.comments = store.select(state => state.comments.comments);
    this.isLoading = store.select(state => state.comments.fetchLoading);
    this.error = store.select(state => state.comments.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = <string>params['id'];
      this.store.dispatch(fetchCommentsRequest({id}));
    });
  }

}
