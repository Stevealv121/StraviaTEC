import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AthleteSearchComponent } from './athlete-search/athlete-search.component';
import { UploadActivityComponent } from './upload-activity/upload-activity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RaceInscriptionComponent } from './competitive/race-inscription/race-inscription.component';
import { FindRaceComponent } from './competitive/find-race/find-race.component';
import { ChallengesComponent } from './competitive/challenges/challenges.component';
import { GroupsComponent } from './groups/groups.component';
import { CompetitionsComponent } from './competitive/competitions/competitions.component';
import { OrganizerMenuComponent } from './organizer-menu/organizer-menu.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CompetitionComponent } from './competition/competition.component';
import { NewCompetitionComponent } from './competition/new-competition/new-competition.component';
import { NewChallengeComponent } from './challenge/new-challenge/new-challenge.component';
import { EditChallengeComponent } from './challenge/edit-challenge/edit-challenge.component';
import { EditCompetitionComponent } from './competition/edit-competition/edit-competition.component';
import { InfoRaceComponent } from './competition/info-race/info-race.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { NewGroupComponent } from './group-management/new-group/new-group.component';
import { GroupGestionComponent } from './group-management/group-gestion/group-gestion.component';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { PositionsReportsComponent } from './competition/positions-reports/positions-reports.component';
import { MembersReportsComponent } from './competition/members-reports/members-reports.component';
import { ChallengeInfoComponent } from './challenge-info/challenge-info.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    SettingsComponent,
    ProfileComponent,
    AthleteSearchComponent,
    UploadActivityComponent,
    RaceInscriptionComponent,
    FindRaceComponent,
    ChallengesComponent,
    GroupsComponent,
    CompetitionsComponent,
    OrganizerMenuComponent,
    ChallengeComponent,
    CompetitionComponent,
    NewCompetitionComponent,
    NewChallengeComponent,
    EditChallengeComponent,
    EditCompetitionComponent,
    InfoRaceComponent,
    GroupManagementComponent,
    NewGroupComponent,
    GroupGestionComponent,
    MyActivitiesComponent,
    ChallengeInfoComponent,
    LeaderboardComponent,
    PositionsReportsComponent,
    MembersReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
