// in the service, in here you connect your server.js
//REMEMBER: server.js is the bridge to your backend app.js

import { HttpClient } from '@angular/common/http'; // you need this import so you can inject HttpClient to this service.
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {} // You can inject things into services too, not just in components

  getPost() {
    /*
    Inside getPost, you want to send an http request and sending http requests. This is very easy with
  angular because it has a built-in http client. To use that client, you need to unlock it first and
  you can unlock things in the app module.
  import { HttpClientModule } from '@angular/common/http';
  then add HttpClientModule to imports array.

  this is an observable, that is why you can subscribe.
  you don't need the unsubscribe because for observables connected to features built into angular like
  the http client, the unsubscription will be handled for you by angular.
  you don't need to convert json back to javascript because the get method will do that for you.
  */

    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateLister() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
