import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleteSearchComponent } from './athlete-search/athlete-search.component';
import { FindRaceComponent } from './competitive/find-race/find-race.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RaceInscriptionComponent } from './competitive/race-inscription/race-inscription.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UploadActivityComponent } from './upload-activity/upload-activity.component';
import { ChallengesComponent } from './competitive/challenges/challenges.component';
import { GroupedObservable } from 'rxjs';
import { GroupsComponent } from './groups/groups.component';
import { CompetitionsComponent } from './competitive/competitions/competitions.component';
import { OrganizerMenuComponent } from './organizer-menu/organizer-menu.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CompetitionComponent } from './competition/competition.component';
import { NewCompetitionComponent } from './competition/new-competition/new-competition.component';
import { NewChallengeComponent } from './challenge/new-challenge/new-challenge.component';
import { EditCompetitionComponent } from './competition/edit-competition/edit-competition.component';
import { EditChallengeComponent } from './challenge/edit-challenge/edit-challenge.component';
import { InfoRaceComponent } from './competition/info-race/info-race.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { NewGroupComponent } from './group-management/new-group/new-group.component';
import { GroupGestionComponent } from './group-management/group-gestion/group-gestion.component';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { ChallengeInfoComponent } from './challenge-info/challenge-info.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PositionsReportsComponent } from './competition/positions-reports/positions-reports.component';
import { MembersReportsComponent } from './competition/members-reports/members-reports.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login" },
  { path: "login", component: LoginComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "home", component: HomeComponent },
  { path: "settings", component: SettingsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "athlete-search", component: AthleteSearchComponent },
  { path: "upload-activity", component: UploadActivityComponent },
  { path: "race-inscription", component: RaceInscriptionComponent },
  { path: "find-race", component: FindRaceComponent },
  { path: "challenges", component: ChallengesComponent },
  { path: "groups", component: GroupsComponent },
  { path: "competitions", component: CompetitionsComponent },
  { path: "menu", component: OrganizerMenuComponent },
  { path: "challenge", component: ChallengeComponent },
  { path: "competition", component: CompetitionComponent },
  { path: "NewCompetition", component: NewCompetitionComponent },
  { path: "NewChallenge", component: NewChallengeComponent },
  { path: "EditRace", component: EditCompetitionComponent },
  { path: "EditChallenge", component: EditChallengeComponent },
  { path: "InfoRace", component: InfoRaceComponent },
  { path: "GroupsManagement", component: GroupManagementComponent },
  { path: "NewGroup", component: NewGroupComponent },
  { path: "GroupInfo", component: GroupGestionComponent },
  { path: "my-activities", component: MyActivitiesComponent },
  { path: "challenge-info", component: ChallengeInfoComponent },
  { path: "leaderboard", component: LeaderboardComponent },
  { path: "PositionReport", component:PositionsReportsComponent},
  {path: "MemberReport", component:MembersReportsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
