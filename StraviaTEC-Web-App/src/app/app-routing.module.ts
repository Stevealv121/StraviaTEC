import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleteSearchComponent } from './athlete-search/athlete-search.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UploadActivityComponent } from './upload-activity/upload-activity.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login" },
  { path: "login", component: LoginComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "home", component: HomeComponent },
  { path: "settings", component: SettingsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "athlete-search", component: AthleteSearchComponent },
  { path: "upload-activity", component: UploadActivityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
