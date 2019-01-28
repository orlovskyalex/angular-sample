import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { FormFieldRequiredDirective } from './directives/form-field-required.directive';
import { MaterialModule } from './material/material.module';
import { AuthService } from './services/auth.service';
import { FormErrorService } from './services/form-error.service';
import { HttpErrorService } from './services/http-error.service';
import { JwtService } from './services/jwt.service';
import { LocalStorageService } from './services/local-storage.service';
import { RouterService } from './services/router.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
  ],
  declarations: [
    FormFieldRequiredDirective,
  ],
  exports: [
    MaterialModule,
    FormFieldRequiredDirective,
  ],
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        HttpErrorService,
        LocalStorageService,
        FormErrorService,
        RouterService,
        JwtService,
      ],
    };
  }

}
