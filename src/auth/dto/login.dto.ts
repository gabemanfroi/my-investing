import { LoginResponse } from 'src/graphql';

export class LoginDto {
  email: string;
  password: string;

  static toLoginResponse(loginResponse: { accessToken: string }): LoginResponse {
    return {
      token: loginResponse.accessToken,
    };
  }
}
