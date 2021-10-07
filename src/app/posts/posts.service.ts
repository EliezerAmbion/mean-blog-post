// in the service, in here you connect your server.js
//REMEMBER: server.js is the bridge to your backend app.js

import { HttpClient } from '@angular/common/http'; // you need this import so you can inject HttpClient to this service.
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {} // You can inject things into services too, not just in components

  getPosts() {
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
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map(
            (post: { title: any; content: any; _id: any }) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
              };
            }
          );
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    ('deleted');
  }
}
