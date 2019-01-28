import { JWT_OPTIONS } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';
import { JwtService } from '../services/jwt.service';

const jwtOptionsFactory = (jwtService) => ({
  tokenGetter: () => jwtService.getToken(),
  whitelistedDomains: [environment.hostUrl],
  authScheme: 'JWT ',
});

export const jwtOptionsProvider = {
  provide: JWT_OPTIONS,
  useFactory: jwtOptionsFactory,
  deps: [JwtService],
};
