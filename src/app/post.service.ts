import { Injectable } from '@angular/core';
import { Post } from './app.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostService {
  private api = 'http://localhost:3000';
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPost() {
    this.http
      .get<{ message: string; posts: Post[] }>(`${this.api}/posts`)
      .pipe(
        map((postData) =>
          postData.posts.map((post) => {
            const transformedPost = { ...post, id: post._id };
            delete transformedPost._id;

            return transformedPost;
          })
        )
      )
      .subscribe((res) => {
        this.posts = res;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostById(id: string) {
    return this.http.get<{ code: number; post?: Post; message: string }>(
      `${this.api}/post/${id}`
    );
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(post: Post) {
    this.http
      .post<{ message: string; post: Post }>(`${this.api}/create-post`, post)
      .subscribe((res) => {
        this.posts.push(res.post);
        this.postUpdated.next([...this.posts]);
      });
  }

  updatePost(postId: Post['id'], post: Post) {
    this.http
      .patch<{ message: string; post: Post }>(
        `${this.api}/post/${postId}`,
        post
      )
      .subscribe((res) => {
        const updatedPosts = [...this.posts];
        const index = updatedPosts.findIndex((i) => i.id === postId);

        if (index !== -1) {
          updatedPosts[index] = { ...res.post };
        }
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: Post['id']) {
    this.http
      .delete<{ message: string; id: Post['id'] }>(`${this.api}/post/${postId}`)
      .subscribe((res) => {
        const updatedPosts = this.posts.filter((item) => item.id !== res.id);
        this.postUpdated.next([...updatedPosts]);
      });
  }
}
