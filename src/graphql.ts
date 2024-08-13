
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract GetUserAssets(id: number): Asset[] | Promise<Asset[]>;
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

type Nullable<T> = T | null;
