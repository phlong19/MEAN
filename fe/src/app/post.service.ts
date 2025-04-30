import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [{ title: 'hee', content: '2385' }];
  private postUpdated = new Subject<Post[]>();

  getPost() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
