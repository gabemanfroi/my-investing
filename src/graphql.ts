
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

export class ListAssetsRequest {
    query: string;
}

export class ListAssetsClassesRequest {
    query: string;
}

export class LoginRequest {
    email: string;
    password: string;
}

export class GetUserPortfolioRequest {
    userId: string;
}

export class GetPortfolioInvestedAmountRequest {
    portfolioId: string;
}

export class GetPortfolioVariationRequest {
    portfolioId: string;
}

export class TransactionInput {
    assetId: string;
    price: number;
    quantity: number;
    type: TransactionType;
}

export class RegisterTransactionRequest {
    transaction: TransactionInput;
    portfolioId: string;
}

export class SignUpRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export abstract class IQuery {
    abstract listAssets(listAssetsRequest?: Nullable<ListAssetsRequest>): Nullable<ListAssetsResponse> | Promise<Nullable<ListAssetsResponse>>;

    abstract listAssetsClasses(listAssetsClassesRequest: ListAssetsClassesRequest): Nullable<ListAssetsClassesResponse> | Promise<Nullable<ListAssetsClassesResponse>>;

    abstract getUserPortfolio(getUserPortfolioRequest?: Nullable<GetUserPortfolioRequest>): GetUserPortfolioResponse | Promise<GetUserPortfolioResponse>;

    abstract getPortfolioInvestedAmount(getPortfolioInvestedAmountRequest?: Nullable<GetPortfolioInvestedAmountRequest>): GetPortfolioInvestedAmountResponse | Promise<GetPortfolioInvestedAmountResponse>;

    abstract getPortfolioVariation(getPortfolioVariationRequest?: Nullable<GetPortfolioVariationRequest>): GetPortfolioVariationResponse | Promise<GetPortfolioVariationResponse>;
}

export class Industry {
    id: string;
    name: string;
}

export class Sector {
    id: string;
    name: string;
}

export class Exchange {
    id: string;
    name: string;
}

export class AssetClass {
    id: string;
    name: string;
}

export class Asset {
    id: string;
    symbol: string;
    class: AssetClass;
    sector: Sector;
    industry: Industry;
    exchange: Exchange;
    currency: Currency;
}

export class ListAssetsResponse {
    assets: Nullable<Asset>[];
}

export class ListAssetsClassesResponse {
    assetClasses: Nullable<AssetClass>[];
}

export abstract class IMutation {
    abstract login(loginRequest: LoginRequest): LoginResponse | Promise<LoginResponse>;

    abstract createPortfolio(): boolean | Promise<boolean>;

    abstract registerTransaction(registerTransactionRequest?: Nullable<RegisterTransactionRequest>): boolean | Promise<boolean>;

    abstract signUp(signUpRequest: SignUpRequest): SignUpResponse | Promise<SignUpResponse>;
}

export class LoginResponse {
    token: string;
}

export class Currency {
    id: string;
    name: string;
    symbol: string;
}

export class PortfolioAsset {
    id: string;
    symbol: string;
    className: string;
    numberOfShares: number;
    averagePrice: number;
    cumulativeTotal: number;
    currentPrice?: Nullable<number>;
}

export class Portfolio {
    assets: PortfolioAsset[];
    portfolioId: string;
}

export class GetUserPortfolioResponse {
    portfolio: Portfolio;
}

export class GetPortfolioInvestedAmountResponse {
    totalInvestedAmount: number;
}

export class GetPortfolioVariationResponse {
    valueVariation: number;
    percentageVariation: number;
}

export class Transaction {
    asset: Asset;
    price: number;
    quantity: number;
    createdAt: string;
    type: TransactionType;
}

export class SignUpResponse {
    token: string;
}

type Nullable<T> = T | null;
