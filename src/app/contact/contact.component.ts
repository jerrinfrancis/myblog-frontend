import { Component, OnInit } from "@angular/core";
import { BlogPostService } from "../service/blog-post.service";
import { Contact } from "../models/contact";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  public contact: Contact
  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;
  constructor(private postService: BlogPostService) {}
 
  ngOnInit() {
    this.contact = new Contact();
  }

  public submit(): void{
    console.log(this.contact)
    this.submitted = this.processing = true
    this.failure = this.success = false
    this.postService.SendContact(this.contact).subscribe(
      // response => console.log('response on new post: ' + JSON.stringify(response))
      response => {
        // Handle each observable response
      console.log("result: " + response);
      this.processing = false
 
      },
      error => {
        //error response code
        console.log(error)
        this.processing = false
        this.failure = true;

      },
      () => {
        //success response code
        this.processing = false
        this.success = true;

      }
    );
  }
}
