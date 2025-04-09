import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.UserRepository.findOneBy({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.UserRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    await this.UserRepository.save(newUser);

    delete newUser.password;

    return newUser;
  }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.UserRepository.findOneBy({ email });
    if (!user) {
      throw new ConflictException("User not found");
    }

    if (!user.password) {
      throw new ConflictException("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    delete user.password;
    return {
      access_token: await this.jwtService.signAsync({ id: user.id }),
    };
  }

  async delete(id: number) {
    return this.UserRepository.delete(id);
  }
}
