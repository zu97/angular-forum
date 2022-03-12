import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { addPostRequest } from '../../store/posts.actions';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  @ViewChild('f') form!: NgForm;

  isLoading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.isLoading = store.select(state => state.posts.addLoading);
    this.error = store.select(state => state.posts.addError);
  }

  onSubmit(): void {
    console.log(this.form);

    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(addPostRequest({postData: this.form.value}));
  }
}
