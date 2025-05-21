import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../../app.model';

@Component({
  selector: 'app-post-create',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent implements OnInit {
  post: Post;
  mode: 'create' | 'edit' = 'create';
  isLoading = false;
  private postId: string;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoading = true;
        this.mode = 'edit';
        this.postId = paramMap.get('id')!;
        this.postService.getPostById(this.postId).subscribe((res) => {
          this.post = { ...res.post!, id: res.post?._id };
          this.isLoading = false;
        });
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    } else if (this.postId) {
      this.postService.updatePost(this.postId, { ...form.value });
    } else {
      this.postService.addPost({
        title: form.value.title,
        content: form.value.content,
      });
    }

    // clear inputs
    form.resetForm();
  }
}
