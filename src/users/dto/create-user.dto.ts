export class CreateUserDto {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  refreshToken?: string;
}
