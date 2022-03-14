import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostError } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { getPostRequest } from '../../store/posts.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  user: Observable<null | User>;
  post: Observable<null | Post>;

  isLoading: Observable<boolean>;
  error: Observable<null | PostError>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.user = store.select(state => state.users.user);
    this.post = store.select(state => state.posts.post);

    this.isLoading = store.select(state => state.posts.getLoading);
    this.error = store.select(state => state.posts.getError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = <string>params['id'];
      this.store.dispatch(getPostRequest({id}));
    });
  }

}
