import { Controller, Post, Body, Delete, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "./auth.guard";

@Controller("auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.name || !createUserDto.email || !createUserDto.password) {
      return "All fields are required";
    }
    if (createUserDto.password.length < 8) return "Password must be at least 8 characters";
    return this.usersService.signUp(createUserDto);
  }

  @Post("signin")
  signIn(@Body() signInDto: CreateUserDto) {
    if (!signInDto.email || !signInDto.password) {
      return "All fields are required";
    }
    return this.usersService.signIn(signInDto.email, signInDto.password);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.usersService.delete(+id);
  }
}
