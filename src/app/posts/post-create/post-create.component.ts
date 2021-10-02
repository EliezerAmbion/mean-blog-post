import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>();

  constructor() {}

  onAddPost() {
    // console.log(this.enteredContent, this.enteredTitle);
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent,
    };
    this.postCreated.emit(post);
  }
}
