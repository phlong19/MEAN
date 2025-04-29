import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

export interface Post {
  title: string;
  content: string;
}
@Component({
  selector: 'app-post-list',
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  @Input() posts: Post[] = [];
}
