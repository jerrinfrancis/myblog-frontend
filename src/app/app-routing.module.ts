import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "src/app/home/home.component";
import { AboutComponent } from "src/app/about/about.component";
import { ContactComponent } from "src/app/contact/contact.component";
import { PastPostsComponent } from "src/app/past-posts/past-posts.component";
import { ViewPostComponent } from "src/app/view-post/view-post.component";
import { NewCategoryComponent } from "./new-category/new-category.component";
import { EditorBasedPostComponent } from "./editorbased-post/editorbased-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" }, //default route
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "posts", component: PastPostsComponent },
  { path: "post/:id", component: ViewPostComponent },
  { path: "editpost/:id", component: EditPostComponent },
  {path: "new-category", component: NewCategoryComponent},
  {path:"author-post-new", component: EditorBasedPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
