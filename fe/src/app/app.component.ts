import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { HeaderComponent } from './components/header/header.component';
import {
  Post,
  PostListComponent,
} from './components/posts/post-list/post-list.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    PostCreateComponent,
    PostListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'social-media';
  posts: Post[] = [];

  onAddPost(post: Post) {
    this.posts.push(post);
  }
}
