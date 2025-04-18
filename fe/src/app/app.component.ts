import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostCreateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'social-media';
}
