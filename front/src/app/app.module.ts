import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';

import { LoginPageComponent } from './login-page/login-page.component';


const routes:Routes = [
  {
    path:"",
    component: LoginPageComponent
  },
  {
    path:"home",
    component: AssignmentsComponent
  },
  {
    path:"add",
    component: AddAssignmentComponent
  },
  {
    path:"assignment/:id",
    component: AssignmentDetailComponent
  },
  {
    path:"assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate : [AuthGuard]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginPageComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    FormsModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule,
    MatCheckboxModule, MatSlideToggleModule, HttpClientModule,
    RouterModule.forRoot(routes), MatTableModule, MatPaginatorModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
