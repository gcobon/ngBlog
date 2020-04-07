import { ProfileModule } from "./profile/profile.module";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './../../shared/guards/auth.guard';
import { AdminComponent } from "./admin.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: "posts",
        loadChildren: () =>
          import("../posts/list-post/list-post.module").then(
            m => m.ListPostModule
          )
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./profile/profile.module").then(
            m => m.ProfileModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
