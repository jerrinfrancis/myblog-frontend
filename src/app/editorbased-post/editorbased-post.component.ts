import { Component, OnInit } from "@angular/core";
import { BlogPostService } from "../service/blog-post.service";
import { BlogPost } from "../models/blog-post";
import { Category } from "../models/category";
@Component(
  {
    selector:"app-author-post-new",
    templateUrl: "./editorbased-post.component.html",
    styleUrls:["./editorbased-post.component.css"]
  }
)

export class EditorBasedPostComponent implements OnInit {
  public post: BlogPost;
  public categories: Category[];
  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;
  public selectedCategory: string;

 constructor(private postService: BlogPostService){}
  ngOnInit(){
    this.post = new BlogPost();
    this.getCategories()
  }
  private getCategories(): void {
    this.postService.GetCategories().subscribe(categories => {
      this.categories = categories;
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