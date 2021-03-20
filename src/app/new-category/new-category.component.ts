import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BlogPostService } from "../service/blog-post.service";
import { Category } from "../models/category";

@Component({
  selector: "app-new-category",
  templateUrl: "./new-category.component.html",
  styleUrls: ["./new-category.component.css"]
})

export class NewCategoryComponent implements OnInit {
  public category: Category;
  public submitted: boolean;
  public processing: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;

  constructor(private postService: BlogPostService) {}
  ngOnInit() {
    this.category = new Category();
   }

   public submit(): void {
   
    this.submitted = this.processing = true
    this.postService.CreateCategory(this.category).subscribe(
      // response => console.log('response on new post: ' + JSON.stringify(response))
      response => {
        // Handle each observable response
      console.log("result: " + response);
       this.processing = false;
      },
      error => {
        //error response code
        console.log(error)
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