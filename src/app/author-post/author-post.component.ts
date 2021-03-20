import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BlogPostService } from "../service/blog-post.service";
import { BlogPost } from "../models/blog-post";
import { Category } from "../models/category";

@Component({
  selector: "app-author-post",
  templateUrl: "./author-post.component.html",
  styleUrls: ["./author-post.component.css"]
})
export class AuthorPostComponent implements OnInit {
  public post: BlogPost;
  public categories1: Category[];
  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;
  public selectedCategory: string;

  constructor(private postService: BlogPostService) {}

  ngOnInit() {
    this.post = new BlogPost();
    this.getCategories()
    
  }
  private getCategories(): void {
    this.postService.GetCategories().subscribe(categories => {
      this.categories1 = categories;
    });}

  public submit(): void {
    this.processing = this.submitted = true;
    console.log("submitting blog post: " + JSON.stringify(this.post));
    this.post.category = [...this.post.category, this.selectedCategory]
    this.postService.CreatePost(this.post).subscribe(
      // response => console.log('response on new post: ' + JSON.stringify(response))
      response => {
        // Handle each observable response
        console.log("result: " + response);
        this.processing = false;
      },
      error => {
        //error response code
        this.processing = false;
        this.failure = true;
      },
      () => {
        //success response code
        this.processing = false;
        this.success = true;
      }
    );
  }
}
