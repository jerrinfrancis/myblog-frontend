import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { ApiService } from "./api.service";
import { environment } from "../../environments/environment";
import { BlogPost } from "../models/blog-post";
import { Category } from "../models/category"
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BlogPostService {
  constructor(private apiService: ApiService) {}

  public GetPosts(): Observable<BlogPost[]> {
    return this.apiService.Get(environment.api.entries).pipe(
      map(json => {
        return json.map(post => new BlogPost(post));
      })
    );
  }
public GetCategories(): Observable<Category[]>{
  return this.apiService.Get(environment.api.categories).pipe(
    map(json => {
      //console.log(json)
      return json.map(category => new Category(category));
    })
  );
}
  public GetPost(id: string): Observable<BlogPost> {
    return this.apiService.Get(environment.api.entries + "/" + id).pipe(
      map(json => {
        return new BlogPost(json);
      })
    );
  }

  public CreatePost(post: BlogPost): Observable<any> {
    return this.apiService.Post(environment.api.entry, post);
  }

  public CreateCategory(category: Category): Observable<any> {
    return this.apiService.Post(environment.api.category, category);
  }

  public deletePost(id) {
    return this.apiService.Delete(environment.api.entries + "/" + id);
  }
}
