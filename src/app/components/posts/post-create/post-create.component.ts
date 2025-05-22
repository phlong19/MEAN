import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../../../app.model';

@Component({
  selector: 'app-post-create',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent implements OnInit {
  post: Post;
  mode: 'create' | 'edit' = 'create';
  isLoading = false;
  form: FormGroup;
  private postId: string;

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    // init the form
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    // check id in params to fetch data for edit
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoading = true;
        this.mode = 'edit';
        this.postId = paramMap.get('id')!;
        this.postService.getPostById(this.postId).subscribe((res) => {
          this.post = { ...res.post!, id: res.post?._id };
          this.isLoading = false;
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });

    // subscribe the post updated
    this.postService.postUpdated.subscribe(() => {
      if (this.isLoading) {
        this.isLoading = false;
        this.form.reset();
        this.router.navigate(['/']);
      }
    });
  }

  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.postId) {
      this.postService.updatePost(this.postId, { ...this.form.value });
    } else {
      this.postService.addPost({
        title: this.form.value.title,
        content: this.form.value.content,
      });
    }
  }
}
