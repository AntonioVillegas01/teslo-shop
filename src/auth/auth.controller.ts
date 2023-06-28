import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";

import { User } from "./entities/user.entity";
import { Auth, GetUser, RawHeaders, RoleProtected } from "./decorators";
import { UserRoleGuard } from "./guards/user-role.guard";
import { ValidRoles } from "./interfaces";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards( AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,

    @RawHeaders() rawHeaders: string [],
  ){
    // console.log({user: request.user})
    // console.log(request)

    return{
      ok:true,
      message:"hola mundo testing",
      user,
      userEmail,
      rawHeaders
    }
  }


  // @SetMetadata('roles', ['admin', 'super-user'])

  @Get('private2')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards( AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(
    @GetUser() user : User
  ){
    return{
      ok:true,
      user

    }
  }

  @Get('private3')
  // @Auth() sin argumentos protejemos rutas para todos los usuarios sin roles
  @Auth(ValidRoles.admin, ) // protegemos rutas con roles
  testingPrivateRoute3(
    @GetUser() user : User
  ){
    return{
      ok:true,
      user

    }
  }
}
