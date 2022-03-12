import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { AddCommentData, Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private http: HttpClient,
  ) {}

  fetchComments(id: string) {
    return this.http.get<Comment[]>(env.apiUrl + '/comments/' + id);
  }

  addComment(token: string, id: string, commentData: AddCommentData) {
    return this.http.post(env.apiUrl + '/comments/' + id, commentData, {
      headers: new HttpHeaders({'Authorization': token})
    });
  }
}
