import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/roles/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CustomGoogleAuthGuard } from 'src/guards/oauth.guard';
import { v4 as uuidv4 } from 'uuid'; // Assuming you're using UUIDs for random strings
import { SessionAuthGuard } from 'src/guards/session-auth.guard';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { RolesGuard } from 'src/common/roles/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

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
      if(req.user.rol == 'student'){
        await this.studentRepository.update({ mail: req.user.email }, { sessionString: randomString });
        await this.studentRepository.update({ mail: req.user.email }, { gtoken: req.user.jwt });
      }
      else if (req.user.rol == 'admin'){
        await this.userRepository.update({ mail: req.user.email }, { sessionString: randomString });
        await this.userRepository.update({ mail: req.user.email }, { gtoken: req.user.jwt });
      }
      if (!res.headersSent) {
        //Lado de estudiante
        if(req.user.rol == 'student'){
          return res.redirect(`${process.env.FRONTEND_URL}/success?xvlf=${randomString}`);
        }
        //Lado de administrador
        else if (req.user.rol == 'admin'){
          return res.redirect(`${process.env.FRONTEND_URL}/success?xvlf=${randomString}`);
        }
      }
    } catch (err) {

      if (!res.headersSent) {
        console.log(err)
        return res.status(500).json({ message: 'An error occurred' });
      }
    }
  }

  @Get('protected')
  @UseGuards(SessionAuthGuard)
  greet() {
    return "ruta verificada por session guard";
  }

  @Roles('admin')
  @Get('admin')
  @UseGuards(SessionAuthGuard, RolesGuard)
  admin() {
    return "ruta verificada por session guard y rol admin";
  }

  @Roles('student')
  @Get('student')
  @UseGuards(SessionAuthGuard, RolesGuard)
  student() {
    return "ruta verificada por session guard y rol student";
  }



  @Get('verify')
  //@UseGuards(SessionAuthGuard)
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
