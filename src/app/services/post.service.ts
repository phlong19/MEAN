import { Injectable } from '@angular/core';
import { ExtendedPost, Post } from '../app.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostService {
  private api = 'http://localhost:10000/api';
  private posts: ExtendedPost[] = [];
  postUpdated = new Subject<{
    posts: ExtendedPost[];
    count: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost(postPerPage?: number, page?: number, userId?: string) {
    const itemPerPage = postPerPage ? `?itemPerPage=${postPerPage}` : '';
    const pageIndex = page ? `&page=${page}` : '';
    this.http
      .get<{
        message: string;
        posts: Post[];
        count: number;
      }>(`${this.api}/post${itemPerPage}${pageIndex}`)
      .pipe(
        map((postData) => {
          return {
            ...postData,
            posts: postData.posts.map((post) => {
              const transformedPost = {
                ...post,
                id: post._id,
                isAuthor: !!userId && userId === post.author,
              };
              delete transformedPost._id;

              return transformedPost;
            }),
          };
        })
      )
      .subscribe((res) => {
        this.posts = res.posts;
        this.postUpdated.next({ posts: [...this.posts], count: res.count });
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

  addPost(post: Post, file: File) {
    const form = new FormData();
    form.append('title', post.title!.trim());
    form.append('content', post.content!.trim());
    form.append('image', file, post.title);

    this.http
      .post<{ message: string; post: Post; count: number }>(
        `${this.api}/post`,
        form
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  updatePost(postId: Post['id'], post: Post, file?: File | string) {
    const title = post.title!.trim();
    const form = new FormData();
    form.append('title', title);
    form.append('content', post.content!.trim());
    if (typeof file === 'object') {
      form.append('image', file, title);
    }

    this.http
      .patch<{ message: string; post: Post }>(
        `${this.api}/post/${postId}`,
        form
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: Post['id']) {
    return this.http.delete<{ message: string; id: Post['id'] }>(
      `${this.api}/post/${postId}`
    );
  }
}
