import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { BlogPost } from "../models/blog-post";
import { ContentTransferService } from "../service/content-transfer.service";

@Component({
  selector: "app-preview-post",
  templateUrl: "./preview-post.component.html",
  styleUrls: ["./preview-post.component.css"]
})
export class PreviewPostComponent implements OnInit {
  @Input() post: BlogPost;

  constructor(
    private router: Router,
    private contentTransSev: ContentTransferService) {}
  ngOnInit() {}

  public go(): void {
    this.contentTransSev.setData(this.post);
    this.router.navigateByUrl("/post/" + this.post.slug);
  }
}
