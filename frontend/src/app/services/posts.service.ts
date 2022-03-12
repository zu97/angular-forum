import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { AddPostData, Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient,
  ) {}

  fetchPosts() {
    return this.http.get<Post[]>(env.apiUrl + '/posts');
  }

  addPost(token: string, postData: AddPostData) {
    const formData = new FormData();

    Object.keys(postData).forEach((key) => {
      if (postData[key]) {
        formData.append(key, postData[key]);
      }
    });

    return this.http.post(env.apiUrl + '/posts', formData, {
      headers: new HttpHeaders({'Authorization': token})
    });
  }

  getPost(id: string) {
    return this.http.get<Post>(env.apiUrl + '/posts/' + id);
  }

}
