
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class AssetClass {
    id: string;
    name: string;
}

export class Asset {
    id: string;
    ticker: string;
    class: AssetClass;
}

export abstract class IQuery {
    abstract GetUserPortfolio(userId: number): Asset[] | Promise<Asset[]>;
}

type Nullable<T> = T | null;
