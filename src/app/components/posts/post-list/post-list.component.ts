import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../../../app.model';
import { PostService } from '../../../services/post.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import AuthService from '../../../services/auth.service';

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
  posts: Post[] = [];
  isLoading = false;
  total: number = 0;
  postPerPage: number = 2;
  currentPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userAuthenticated = false;
  private postSub: Subscription;
  private authSub: Subscription;

  constructor(
    public postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPost(this.postPerPage, this.currentPage);
    this.postSub = this.postService.getPostUpdateListener().subscribe((res) => {
      this.posts = res.posts;
      this.total = res.count;
      this.isLoading = false;
    });
    this.userAuthenticated = this.authService.getIsAuthenticated();
    this.authSub = this.authService.getUserListener().subscribe((res) => {
      this.userAuthenticated = !!res._id;
    });
  }

  onDelete(postId: Post['id']) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPost(this.postPerPage, this.currentPage);
    });
  }

  onChangePage(e: PageEvent) {
    this.isLoading = true;
    const { pageIndex, pageSize } = e;
    this.postPerPage = pageSize;
    this.currentPage = pageIndex + 1;
    this.postService.getPost(this.postPerPage, this.currentPage);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
