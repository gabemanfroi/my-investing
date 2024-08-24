
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

export interface ListAssetsRequest {
    query: string;
}

export interface ListAssetsClassesRequest {
    query: string;
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
    createAssetClass(createAssetClassInput?: Nullable<CreateAssetClassInput>): boolean | Promise<boolean>;
    createAsset(createAssetInput?: Nullable<CreateAssetInput>): boolean | Promise<boolean>;
    login(loginRequest: LoginRequest): LoginResponse | Promise<LoginResponse>;
    register(registerRequest: RegisterRequest): RegisterResponse | Promise<RegisterResponse>;
    registerOperation(registerOperationInput?: Nullable<RegisterOperationInput>): boolean | Promise<boolean>;
    createPortfolio(): Portfolio | Promise<Portfolio>;
}

export interface IQuery {
    listAssets(listAssetsRequest?: Nullable<ListAssetsRequest>): Nullable<ListAssetsResponse> | Promise<Nullable<ListAssetsResponse>>;
    listAssetsClasses(listAssetsClassesRequest: ListAssetsClassesRequest): Nullable<ListAssetsClassesResponse> | Promise<Nullable<ListAssetsClassesResponse>>;
    getUserPortfolio(getUserPortfolioRequest?: Nullable<GetUserPortfolioRequest>): GetUserPortfolioResponse | Promise<GetUserPortfolioResponse>;
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

export interface ListAssetsResponse {
    assets: Nullable<Asset>[];
}

export interface ListAssetsClassesResponse {
    assetClasses: Nullable<AssetClass>[];
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

export interface PortfolioAsset {
    id: string;
    ticker: string;
    className: string;
    totalAmount: number;
    averagePrice: number;
    cumulativeTotal: number;
    currentPrice?: Nullable<number>;
}

export interface Portfolio {
    assets: PortfolioAsset[];
}

export interface GetUserPortfolioResponse {
    portfolio: Portfolio;
}

type Nullable<T> = T | null;
