import { Routes } from '@angular/router';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './components/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  {
    path: 'edit/:id',
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
