import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
    const user = await this.authService.findUser(email);
    if (!user) {
      done(new UnauthorizedException(), false);
    } else {
      const jwt = await this.authService.validateOAuthLogin(profile.id, 'google', email, user.rol, user.sede || null);
      done(null, { jwt ,email: email, rol: user.rol});
    }
  }
}