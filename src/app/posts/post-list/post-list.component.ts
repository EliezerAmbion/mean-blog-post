import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription | any;

  // posts = [
  //   { title: 'First Post', content: `This is the first post's content` },
  //   { title: 'Second Post', content: `This is the second post's content` },
  //   { title: 'Third Post', content: `This is the Third post's content` },
  // ];

  constructor(public postService: PostsService) {}

  ngOnInit() {
    this.postService.getPost();

    this.postsSub = this.postService
      .getPostUpdateLister()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
