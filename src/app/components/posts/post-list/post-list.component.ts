import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExtendedPost, Post } from '../../../app.model';
import { PostService } from '../../../services/post.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import AuthService from '../../../services/auth.service';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-list',
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    RouterLink,
    MatPaginatorModule,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: ExtendedPost[] = [];
  isLoading = false;
  total: number = 0;
  postPerPage: number = 2;
  currentPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private userId: string;
  private _snackbar = inject(MatSnackBar);
  private postSub: Subscription;
  private authSub: Subscription;

  constructor(
    public postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.authSub = this.authService.getUserListener().subscribe((res) => {
      this.userId = res._id!;
    });
    this.postService.getPost(this.postPerPage, this.currentPage, this.userId);
    this.postSub = this.postService.getPostUpdateListener().subscribe((res) => {
      this.posts = res.posts;
      this.total = res.count;
      this.isLoading = false;
    });
  }

  onDelete(postId: Post['id']) {
    let message = '';
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe({
      next: (res) => {
        this.postService.getPost(
          this.postPerPage,
          this.currentPage,
          this.userId
        );
        message = res.message;
      },
      error: (err) => {
        this.isLoading = false;
        message = err?.error?.message;
      },
    });

    this._snackbar.open(message, undefined, { duration: 5000 });
  }

  onChangePage(e: PageEvent) {
    this.isLoading = true;
    const { pageIndex, pageSize } = e;
    this.postPerPage = pageSize;
    this.currentPage = pageIndex + 1;
    this.postService.getPost(this.postPerPage, this.currentPage, this.userId);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
