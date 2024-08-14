
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum OperationType {
    BUY = "BUY",
    SELL = "SELL"
}

export class CreateAssetInput {
    ticker: string;
    assetClassId: string;
}

export class CreateAssetClassInput {
    name: string;
}

export class LoginRequest {
    email: string;
    password: string;
}

export class RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class OperationInput {
    assetId: string;
    price: number;
    quantity: number;
    type: OperationType;
}

export class RegisterOperationInput {
    operation: OperationInput;
    portfolioId: string;
}

export class GetUserPortfolioRequest {
    userId: number;
}

export abstract class IMutation {
    abstract createAssetClass(createAssetClassInput?: Nullable<CreateAssetClassInput>): boolean | Promise<boolean>;

    abstract createAsset(createAssetInput?: Nullable<CreateAssetInput>): boolean | Promise<boolean>;

    abstract login(loginRequest: LoginRequest): LoginResponse | Promise<LoginResponse>;

    abstract register(registerRequest: RegisterRequest): RegisterResponse | Promise<RegisterResponse>;

    abstract registerOperation(registerOperationInput?: Nullable<RegisterOperationInput>): boolean | Promise<boolean>;

    abstract createPortfolio(userId: number): Portfolio | Promise<Portfolio>;
}

export class AssetClass {
    id: string;
    name: string;
}

export class Asset {
    id: string;
    ticker: string;
    class: AssetClass;
}

export class LoginResponse {
    token: string;
}

export class RegisterResponse {
    token: string;
}

export class Operation {
    asset: Asset;
    price: number;
    quantity: number;
    createdAt: string;
    type: OperationType;
}

export abstract class IQuery {
    abstract getUserPortfolio(getUserPortfolioRequest?: Nullable<GetUserPortfolioRequest>): GetUserPortfolioResponse | Promise<GetUserPortfolioResponse>;
}

export class PortfolioAsset {
    id: string;
    ticker: string;
    className: string;
    totalAmount: number;
    averagePrice: number;
    cumulativeTotal: number;
}

export class Portfolio {
    assets: PortfolioAsset[];
}

export class GetUserPortfolioResponse {
    portfolio: Portfolio;
}

type Nullable<T> = T | null;
