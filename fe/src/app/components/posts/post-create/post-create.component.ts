import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  content = 'no content';

  onAddPost(postInput: HTMLTextAreaElement) {
    this.content = postInput.value;
  }

  enteredValue = '';
  onCreatePost() {
    this.content = this.enteredValue;
  }
}
