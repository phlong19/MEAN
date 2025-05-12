import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../../../app.model';
import { PostService } from '../../../post.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    RouterLink,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPost();
    this.postSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  onDelete(postId: Post['id']) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
