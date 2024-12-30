import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Roles } from 'src/common/roles/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CustomGoogleAuthGuard } from 'src/guards/oauth.guard';
import { v4 as uuidv4 } from 'uuid'; // Assuming you're using UUIDs for random strings
import { SessionAuthGuard } from 'src/guards/session-auth.guard';
import * as jwt from 'jsonwebtoken';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(@InjectModel('User') private userModel: Model<User>) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates the Google OAuth flow
  }
  //res.redirect(`${process.env.FRONTEND_URL}/success?token=${req.user.jwt}`);   googleAuthRedirect(@Req() req, @Res() res: Response) {


  @Get('google/callback')
  @UseGuards(CustomGoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const randomString = uuidv4();
      await this.userModel.updateOne({ email: req.user.email }, { $set: { SessionString: randomString } }, { upsert: true });
      await this.userModel.updateOne({ email: req.user.email }, { $set: { Gtoken: req.user.jwt } }, { upsert: true });
      if (!res.headersSent) {
        return res.redirect(`${process.env.FRONTEND_URL}/success?xvlf=${randomString}`);
      }
    } catch (err) {

      if (!res.headersSent) {
        return res.status(500).json({ message: 'An error occurred' });
      }
    }
  }

  @Get('protected')
  @UseGuards(SessionAuthGuard)
  greet(@Req() req) {
    return "uwu";
  }

  @Get('verify')
  @UseGuards(SessionAuthGuard)
  verifyAlumno() { return true; }


  /* otra manera
  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  myFunction_ad(){
    return "hola, soy ruta protegida de admin";
    
  }
  */

  /* una manera
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  myFunction_ad(){
    return "hola, soy ruta protegida de admin";
    
  }
  */
  /*
  fetch('http://localhost:3000/api/auth/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('yourTokenKey')}`
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error)); 
  */
}
