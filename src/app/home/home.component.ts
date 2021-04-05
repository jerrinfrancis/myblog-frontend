import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { BlogPostService } from "../service/blog-post.service";
import { BlogPost } from "../models/blog-post";
import { environment } from "../../environments/environment";




@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  posts: BlogPost[];
  IS_PROD: boolean = environment.production

  constructor(private postService: BlogPostService, private router: Router) {}

  ngOnInit() {
    this.getPosts();
  }

  private getPosts(): void {
    this.postService.GetPosts('3').subscribe(posts => {
      this.posts = posts;
      this.loading = false;
    });
  }
}
