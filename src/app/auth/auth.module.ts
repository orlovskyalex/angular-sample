import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormSignInComponent } from './components/form-sign-in/form-sign-in.component';
import { FormSignUpComponent } from './components/form-sign-up/form-sign-up.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AuthPageComponent,
    AuthComponent,
    FormSignInComponent,
    FormSignUpComponent,
  ],
})
export class AuthModule {
}
