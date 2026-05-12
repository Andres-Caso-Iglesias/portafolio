// @ts-nocheck - Display-only code example
// DTOs de autenticación con class-validator - NestJS 11 + Passport JWT
// Validación estricta en la capa de entrada con decoradores

// import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';

export enum UserRole {
  ASPIRANTE = 'aspirante',
  EMPRESA = 'empresa',
}

// Register DTO: validación de email + password + rol + nombre de empresa
export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  companyName?: string;
}

// Login DTO: solo email + password
export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

// Uso en AuthController:
// @Post('register')
// @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
// async register(@Body() dto: RegisterDto) {
//   return this.authService.register(dto);
// }