
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum TransactionType {
    BUY = "BUY",
    SELL = "SELL"
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

export interface GetUserPortfolioRequest {
    userId: string;
}

export interface GetPortfolioInvestedAmountRequest {
    portfolioId: string;
}

export interface GetPortfolioVariationRequest {
    portfolioId: string;
}

export interface TransactionInput {
    assetId: string;
    price: number;
    quantity: number;
    type: TransactionType;
}

export interface RegisterTransactionRequest {
    transaction: TransactionInput;
    portfolioId: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IQuery {
    listAssets(listAssetsRequest?: Nullable<ListAssetsRequest>): Nullable<ListAssetsResponse> | Promise<Nullable<ListAssetsResponse>>;
    listAssetsClasses(listAssetsClassesRequest: ListAssetsClassesRequest): Nullable<ListAssetsClassesResponse> | Promise<Nullable<ListAssetsClassesResponse>>;
    getUserPortfolio(getUserPortfolioRequest?: Nullable<GetUserPortfolioRequest>): GetUserPortfolioResponse | Promise<GetUserPortfolioResponse>;
    getPortfolioInvestedAmount(getPortfolioInvestedAmountRequest?: Nullable<GetPortfolioInvestedAmountRequest>): GetPortfolioInvestedAmountResponse | Promise<GetPortfolioInvestedAmountResponse>;
    getPortfolioVariation(getPortfolioVariationRequest?: Nullable<GetPortfolioVariationRequest>): GetPortfolioVariationResponse | Promise<GetPortfolioVariationResponse>;
}

export interface Industry {
    id: string;
    name: string;
}

export interface Sector {
    id: string;
    name: string;
}

export interface Exchange {
    id: string;
    name: string;
}

export interface AssetClass {
    id: string;
    name: string;
}

export interface Asset {
    id: string;
    symbol: string;
    class: AssetClass;
    sector: Sector;
    industry: Industry;
    exchange: Exchange;
    currency: Currency;
}

export interface ListAssetsResponse {
    assets: Nullable<Asset>[];
}

export interface ListAssetsClassesResponse {
    assetClasses: Nullable<AssetClass>[];
}

export interface IMutation {
    login(loginRequest: LoginRequest): LoginResponse | Promise<LoginResponse>;
    createPortfolio(): boolean | Promise<boolean>;
    registerTransaction(registerTransactionRequest?: Nullable<RegisterTransactionRequest>): boolean | Promise<boolean>;
    signUp(signUpRequest: SignUpRequest): SignUpResponse | Promise<SignUpResponse>;
}

export interface LoginResponse {
    token: string;
}

export interface Currency {
    id: string;
    name: string;
    symbol: string;
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

export interface Transaction {
    asset: Asset;
    price: number;
    quantity: number;
    createdAt: string;
    type: TransactionType;
}

export interface SignUpResponse {
    token: string;
}

type Nullable<T> = T | null;
