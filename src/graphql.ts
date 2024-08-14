
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

export interface IMutation {
    CreateAssetClass(createAssetClassInput?: Nullable<CreateAssetClassInput>): boolean | Promise<boolean>;
    CreateAsset(createAssetInput?: Nullable<CreateAssetInput>): boolean | Promise<boolean>;
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

export interface Operation {
    asset: Asset;
    price: number;
    quantity: number;
    createdAt: string;
    type: OperationType;
}

export interface IQuery {
    GetUserPortfolio(userId: number): Portfolio | Promise<Portfolio>;
}

export interface Portfolio {
    assets: Asset[];
}

type Nullable<T> = T | null;
