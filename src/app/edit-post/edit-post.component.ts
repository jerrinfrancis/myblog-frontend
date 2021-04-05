import { Component, OnInit } from "@angular/core";
import { BlogPostService } from "../service/blog-post.service";
import { BlogPost } from "../models/blog-post";
import { Category } from "../models/category";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
@Component(
  {
    selector:"app-edit-post",
    templateUrl: "./edit-post.component.html",
    styleUrls:["./edit-post.component.css"]
  }
)

export class EditPostComponent implements OnInit {
  loading: boolean = true;
  public post: BlogPost = new BlogPost();
  public categories: Category[];
  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;
  public selectedCategory: string;

 constructor(
   private postService: BlogPostService,
   private route: ActivatedRoute,
   private sanitizer: DomSanitizer
   ){}
  ngOnInit(){
    this.getPost();
    this.getCategories()
  }
  private getCategories(): void {
    this.postService.GetCategories().subscribe(categories => {
      this.categories = categories;
    });}

    private getPost(): void {
      const id = this.route.snapshot.paramMap.get("id"); //+ is JS conversion from string to int (which id should be)
      console.log("id: " + id);
  
      this.postService.GetPost(id).subscribe(post => {
        console.log("post: " + JSON.stringify(post));
        this.post = post;
        this.loading = false;
      });
    }
    //
    public submit(): void {
      this.processing = this.submitted = true;
      console.log("submitting blog post: " + JSON.stringify(this.post));
      this.post.category = [...this.post.category, this.selectedCategory]
      this.postService.EditPost(this.post).subscribe(
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