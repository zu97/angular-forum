import { Component, OnInit } from '@angular/core';
import { Post, PostError } from '../../models/post.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchPostsRequest } from '../../store/posts.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Observable<Post[]>;
  isLoading: Observable<boolean>;
  error: Observable<null | PostError>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.posts = store.select(state => state.posts.posts);
    this.isLoading = store.select(state => state.posts.fetchLoading);
    this.error = store.select(state => state.posts.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPostsRequest());
  }

}
