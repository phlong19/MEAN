import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../../../app.model';
import { PostService } from '../../../post.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  private postSub: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPost();
    this.postSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts) => {
        this.posts = posts;
        this.isLoading = false;
      });
  }

  onDelete(postId: Post['id']) {
    this.postService.deletePost(postId);
    this.postSub = this.postService.getPostUpdateListener().subscribe();
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
