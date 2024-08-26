
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
    symbol: string;
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
    userId: string;
}

export interface GetPortfolioInvestedAmountRequest {
    portfolioId: string;
}

export interface GetPortfolioVariationRequest {
    portfolioId: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IMutation {
    createAssetClass(createAssetClassInput?: Nullable<CreateAssetClassInput>): boolean | Promise<boolean>;
    createAsset(createAssetInput?: Nullable<CreateAssetInput>): boolean | Promise<boolean>;
    login(loginRequest: LoginRequest): LoginResponse | Promise<LoginResponse>;
    registerOperation(registerOperationInput?: Nullable<RegisterOperationInput>): boolean | Promise<boolean>;
    createPortfolio(): boolean | Promise<boolean>;
    signUp(signUpRequest: SignUpRequest): SignUpResponse | Promise<SignUpResponse>;
}

export interface IQuery {
    listAssets(listAssetsRequest?: Nullable<ListAssetsRequest>): Nullable<ListAssetsResponse> | Promise<Nullable<ListAssetsResponse>>;
    listAssetsClasses(listAssetsClassesRequest: ListAssetsClassesRequest): Nullable<ListAssetsClassesResponse> | Promise<Nullable<ListAssetsClassesResponse>>;
    getUserPortfolio(getUserPortfolioRequest?: Nullable<GetUserPortfolioRequest>): GetUserPortfolioResponse | Promise<GetUserPortfolioResponse>;
    getPortfolioInvestedAmount(getPortfolioInvestedAmountRequest?: Nullable<GetPortfolioInvestedAmountRequest>): GetPortfolioInvestedAmountResponse | Promise<GetPortfolioInvestedAmountResponse>;
    getPortfolioVariation(getPortfolioVariationRequest?: Nullable<GetPortfolioVariationRequest>): GetPortfolioVariationResponse | Promise<GetPortfolioVariationResponse>;
}

export interface AssetClass {
    id: string;
    name: string;
}

export interface Asset {
    id: string;
    symbol: string;
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

export interface Operation {
    asset: Asset;
    price: number;
    quantity: number;
    createdAt: string;
    type: OperationType;
}

export interface PortfolioAsset {
    id: string;
    symbol: string;
    className: string;
    numberOfShares: number;
    averagePrice: number;
    cumulativeTotal: number;
    currentPrice?: Nullable<number>;
}

export interface Portfolio {
    assets: PortfolioAsset[];
    portfolioId: string;
}

export interface GetUserPortfolioResponse {
    portfolio: Portfolio;
}

export interface GetPortfolioInvestedAmountResponse {
    totalInvestedAmount: number;
}

export interface GetPortfolioVariationResponse {
    valueVariation: number;
    percentageVariation: number;
}

export interface SignUpResponse {
    token: string;
}

type Nullable<T> = T | null;
