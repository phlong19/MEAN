import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  private mode: 'create' | 'edit' = 'create';
  private postId: string;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id')!;
        this.post = this.postService.getPostById(this.postId);
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.postService.addPost({
        title: form.value.title,
        content: form.value.content,
      });

      // clear inputs
      form.resetForm();
    }
  }
}
