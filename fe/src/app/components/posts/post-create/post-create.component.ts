import { Component, EventEmitter, Output } from '@angular/core';
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
  title = '';
  content = '';
  errorMessage = '';

  @Output() postCreated = new EventEmitter();

  onAddPost() {
    if (this.title.trim() === '' || this.content.trim() === '') {
      this.errorMessage = 'Please fill in all fields.';
    } else {
      const post = {
        title: this.title,
        content: this.content,
      };

      this.postCreated.emit(post);
      // clear inputs
      this.title = '';
      this.content = '';
      this.errorMessage = '';
    }
  }
}
