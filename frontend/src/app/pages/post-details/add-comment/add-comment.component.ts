import { Component, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { NgForm } from '@angular/forms';
import { addCommentsRequest } from '../../../store/comments.actions';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
  @Input() post!: Post;
  @ViewChild('f') form!: NgForm;

  isLoading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.isLoading = store.select(state => state.comments.addLoading);
    this.error = store.select(state => state.comments.addError);
  }

  onCommentSend(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(addCommentsRequest({id: this.post._id, commentData: this.form.value}));
  }
}
