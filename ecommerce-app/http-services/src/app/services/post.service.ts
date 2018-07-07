import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AppError } from '../common/validators/app-error';
import { NotFoundError } from '../common/validators/not-found-error';
import { BadInput } from '../common/validators/bad-input';
import 'rxjs/add/observable/throw';

@Injectable()
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) { }

  getPosts() {
    return this.http.get(this.url).catch(this.handleError);
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post))
    .catch(this.handleError);
  }

  updatePost(post) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isReady: true}))
    .catch(this.handleError)
  }

  deletePost(id) {
    return this.http.delete(this.url + '/' + id)
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw (new AppError(error));
  }
}