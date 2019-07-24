import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedService} from './shared.service';
import {RecoverLoginCredentialsComponent} from './recover-login-credentials/recover-login-credentials.component';
import {HttpClientModule} from '@angular/common/http';
import {RegistrationComponent} from './registration/registration.component';
import {DatepickerModule} from 'ngx-bootstrap';
import {MyLearningsComponent} from './dashboard/my-learnings/my-learnings.component';
import {TopicsToExploreComponent} from './dashboard/topics-to-explore/topics-to-explore.component';
import {ReferencesComponent} from './dashboard/references/references.component';
import {TopicsCoveredComponent} from './dashboard/topics-covered/topics-covered.component';
import {LoggedInUsersComponent} from './logged-in-users/logged-in-users.component';
import { UpdateUserDetailsComponent } from './update-details/update-user-details/update-user-details.component';
import { ConfirmDetailsComponent } from './update-details/update-user-details/confirm-details/confirm-details.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'recover-login-credentials', component: RecoverLoginCredentialsComponent},
  {path: 'registration', component: RegistrationComponent},
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'my-learnings'},
      {path: 'my-learnings', component: MyLearningsComponent},
      {path: 'topics-covered', component: TopicsCoveredComponent},
      {path: 'topics-to-explore', component: TopicsToExploreComponent},
      {path: 'references', component: ReferencesComponent}
    ]
  },
  {path: 'recover-credentials', component: RecoverLoginCredentialsComponent},
  {path: 'registration', component: RegistrationComponent},
  {
    path: 'logged-in-users', component: LoggedInUsersComponent
  },
  {path: 'update-details/:id', component: UpdateUserDetailsComponent, children: [
      {path: 'confirm-details', component: ConfirmDetailsComponent}
    ]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RecoverLoginCredentialsComponent,
    RegistrationComponent,
    MyLearningsComponent,
    TopicsCoveredComponent,
    TopicsToExploreComponent,
    ReferencesComponent,
    LoggedInUsersComponent,
    UpdateUserDetailsComponent,
    ConfirmDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    DatepickerModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
