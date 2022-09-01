import { Transform } from 'class-transformer';
import { MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @MinLength(2)
  @MaxLength(32)
  @Transform((params) => params.value.toLowerCase().trim())
  name: string;
}

export class User {
  id: string;
  name: string;
}

export class JwtPayload {
  id: string;
}

export class LoginResponseDto {
  token: string;
  user: User;
}
