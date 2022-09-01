import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, LoginDto, LoginResponseDto, User } from './dto/auth.dto';
import { generateUser } from './utils';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  //usually we call db
  private users: User[] = [];

  findUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  async login(data: LoginDto): Promise<LoginResponseDto> {
    const found = this.users.find((user) => user.name === data.name);

    if (found) {
      const payload: JwtPayload = { id: found.id };
      const accessToken = await this.jwtService.sign(payload);
      return { token: accessToken, user: found };
    }

    const user = generateUser(data.name);

    //usually we call db
    this.users.push(user);

    const payload: JwtPayload = { id: user.id };
    const accessToken = await this.jwtService.sign(payload);

    return { token: accessToken, user };
  }
}
