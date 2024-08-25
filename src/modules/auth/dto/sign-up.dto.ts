import { SignUpRequest, SignUpResponse } from 'src/graphql';

export class SignUpDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  static fromSignUpRequest(registerInput: SignUpRequest): SignUpDto {
    return {
      email: registerInput.email,
      password: registerInput.password,
      firstName: registerInput.firstName,
      lastName: registerInput.lastName,
    };
  }

  static toSignUpResponse(registerResponse: {
    accessToken: string;
  }): SignUpResponse {
    return {
      token: registerResponse.accessToken,
    };
  }
}
