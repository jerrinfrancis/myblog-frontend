import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { BlogPostService } from "src/app/service/blog-post.service";
import { BlogPost } from "src/app/models/blog-post";
import { JsonPipe } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "../../environments/environment";
import { ThrowStmt } from "@angular/compiler";
import { ContentTransferService } from "../service/content-transfer.service";

@Component({
  selector: "app-view-post",
  templateUrl: "./view-post.component.html",
  styleUrls: ["./view-post.component.css"]
})
export class ViewPostComponent implements OnInit {
  loading: boolean = true;
  post: BlogPost;
  IS_PROD: boolean = environment.production

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: BlogPostService,
    private sanitizer: DomSanitizer,
    private contentTransSrv: ContentTransferService
  ) {}

  ngOnInit() {
    this.post = this.contentTransSrv.getData();
    if (this.post){
      this.loading = false;
    }else{
      this.getPost()
    }

  }

  public deletePost() {
    const id = this.route.snapshot.paramMap.get("id");
    this.postService.deletePost(id).subscribe(res => {
      console.log("Deleted Post" + id);
      this.router.navigate(["/home"]);
    });
  }
  public createTrustedHtml(blogContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(blogContent);
 }
 public editPost(): void{
   console.log("slug is present" + this.post.slug)
   this.router.navigateByUrl("/editpost/" + this.post.slug )
 }
  private getPost(): void {
    const id = this.route.snapshot.paramMap.get("id"); //+ is JS conversion from string to int (which id should be)
    console.log("id: " + id);

    this.postService.GetPost(id).subscribe(post => {
      console.log("post: " + JSON.stringify(post));
      this.post = post;
      this.loading = false;
    });
  }
}
