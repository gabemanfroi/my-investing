import { RegisterRequest, RegisterResponse } from 'src/graphql';

export class RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  static fromRegisterRequest(registerInput: RegisterRequest): RegisterDto {
    return {
      email: registerInput.email,
      password: registerInput.password,
      firstName: registerInput.firstName,
      lastName: registerInput.lastName,
    };
  }

  static toRegisterResponse(registerResponse: {
    accessToken: string;
  }): RegisterResponse {
    return {
      token: registerResponse.accessToken,
    };
  }
}
