
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

export interface CreateAssetInput {
    ticker: string;
    assetClassId: string;
}

export interface CreateAssetClassInput {
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface OperationInput {
    assetId: string;
    price: number;
    quantity: number;
    type: OperationType;
}

export interface RegisterOperationInput {
    operation: OperationInput;
    portfolioId: string;
}

export interface GetUserPortfolioRequest {
    userId: number;
}

export interface IMutation {
    CreateAssetClass(createAssetClassInput?: Nullable<CreateAssetClassInput>): boolean | Promise<boolean>;
    CreateAsset(createAssetInput?: Nullable<CreateAssetInput>): boolean | Promise<boolean>;
    Login(loginRequest: LoginRequest): LoginResponse | Promise<LoginResponse>;
    Register(registerRequest: RegisterRequest): RegisterResponse | Promise<RegisterResponse>;
    RegisterOperation(registerOperationInput?: Nullable<RegisterOperationInput>): boolean | Promise<boolean>;
    CreatePortfolio(userId: number): Portfolio | Promise<Portfolio>;
}

export interface AssetClass {
    id: string;
    name: string;
}

export interface Asset {
    id: string;
    ticker: string;
    class: AssetClass;
}

export interface LoginResponse {
    token: string;
}

export interface RegisterResponse {
    token: string;
}

export interface Operation {
    asset: Asset;
    price: number;
    quantity: number;
    createdAt: string;
    type: OperationType;
}

export interface IQuery {
    GetUserPortfolio(getUserPortfolioRequest?: Nullable<GetUserPortfolioRequest>): GetUserPortfolioResponse | Promise<GetUserPortfolioResponse>;
}

export interface PortfolioAsset {
    id: string;
    ticker: string;
    className: string;
    totalAmount: number;
    averagePrice: number;
    cumulativeTotal: number;
}

export interface Portfolio {
    assets: PortfolioAsset[];
}

export interface GetUserPortfolioResponse {
    portfolio: Portfolio;
}

type Nullable<T> = T | null;
