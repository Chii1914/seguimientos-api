import { ExecutionContext, Injectable, UnauthorizedException, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CustomGoogleAuthGuard extends AuthGuard('google') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      
      throw err ? err : new UnauthorizedException();
    }
    return user;
  }
}