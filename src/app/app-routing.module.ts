import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UploadImageComponent } from './upload-image/upload-image.component';

const routes: Routes = [
  {path:"", component: LandingPageComponent},
  {path:"uploadImage", component: UploadImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
