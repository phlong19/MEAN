import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  imports: [],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  content = '';
  onAddPost() {
    this.content = "this user's post";
  }
}
