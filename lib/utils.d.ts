import { BigNumber } from 'bignumber.js';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { Amount, AmountInternal, AnyExchangeEvent, AnyExchangeEventRaw } from './typings';
/**
 * Returns a `Promise` with a JSON object from given URL.
 * @param url
 * @param options (optional)
 */
export declare const fetchUrl: <T>(url: string, options?: object) => Promise<T>;
/**
 * Returns an Observable for a websocket stream.
 * @param url URL to open websocket stream to.
 * @param functionName Name of function to call on opened websocket.
 * @param args Arguments for above function.
 */
export declare const websocketStream: (url: string, functionName: string, args: object) => Observable<any>;
/**
 * Encodes URI components and returns a URL.
 * @param baseUrl base URL
 * @param params (optional) parameters for queries
 */
export declare const buildUrl: (baseUrl: string, params?: any) => string;
/**
 * Returns a trustlines.network link.
 * @param params parameters for link
 */
export declare const createLink: (params: any[]) => string;
/**
 * Returns the smallest representation of a number.
 * @param value Representation of number in biggest unit.
 * @param decimals Number of decimals.
 */
export declare const calcRaw: (value: string | number | BigNumber, decimals: number) => BigNumber;
/**
 * Returns the biggest representation of a number.
 * @param raw Representation of number in smallest unit.
 * @param decimals Number of decimals.
 */
export declare const calcValue: (raw: string | number | BigNumber, decimals: number) => BigNumber;
/**
 * Formats number into an AmountInternal object which is intended for internal use.
 * @param raw Representation of number in smallest unit.
 * @param decimals Number of decimals.
 */
export declare const formatToAmountInternal: (raw: string | number | BigNumber, decimals: number) => AmountInternal;
/**
 * Converts an AmountInternal to Amount object.
 * @param amount AmountInternal object.
 */
export declare const convertToAmount: (amount: AmountInternal) => Amount;
/**
 * Formats raw representation of number into a Amount object.
 * @param raw Representation of number in smallest unit.
 * @param decimals Number of decimals.
 */
export declare const formatToAmount: (raw: string | number | BigNumber, decimals: number) => Amount;
/**
 * Formats the number values of a raw event returned by the relay.
 * @param event raw event
 * @param networkDecimals decimals of currency network
 * @param interestRateDecimals interest rate decimals of currency network
 */
export declare const formatEvent: <T>(event: any, networkDecimals: number, interestRateDecimals: number) => T;
/**
 * Formats the number values of a raw Exchange event as returned by the relay.
 * @param exchangeEvent raw exchange event: `LogFill` or `LogCancel`
 * @param makerDecimals decimals in maker token
 * @param takerDecimals decimals in taker token
 */
export declare const formatExchangeEvent: (exchangeEvent: AnyExchangeEventRaw, makerDecimals: number, takerDecimals: number) => AnyExchangeEvent;
/**
 * Checks if given address is a valid address
 * @param address ethereum address
 */
export declare const checkAddress: (address: string) => boolean;
/**
 * Converts eth to wei
 * @param value value in eth
 */
export declare const convertEthToWei: (value: string | number) => number;
/**
 * Returns the hexdecimal representation of given decimal string. The value has to be an integer.
 * @param decimalStr Decimal string representation of number.
 */
export declare const convertToHexString: (decimalStr: string | number | BigNumber) => string;
/**
 * Generates a random number with specified decimals.
 * @param decimals Decimals which determine size of generated number.
 */
export declare const generateRandomNumber: (decimals: number) => BigNumber;
/**
 * Checks if given string is a valid url.
 * @param str String to check.
 */
export declare const isURL: (str: any) => boolean;
/**
 * Returns URL by concatenating protocol, host, port and path.
 * @param protocol relay api endpoint protocol
 * @param host relay api host address
 * @param port relay api port
 * @param path relay api base endpoint
 */
export declare const buildApiUrl: (protocol: string, host: string, port: string | number, path: string) => string;
/**
 * Adds a slash to the endpoint if it does not start with it.
 * @param endpoint Endpoint to format.
 */
export declare const formatEndpoint: (endpoint: string) => string;
/**
 * Trims url from slashes.
 * @param url URL to be trimmed from slashes.
 */
export declare const trimUrl: (url: string) => string;
declare const _default: {
    buildApiUrl: (protocol: string, host: string, port: string | number, path: string) => string;
    buildUrl: (baseUrl: string, params?: any) => string;
    calcRaw: (value: string | number | BigNumber, decimals: number) => BigNumber;
    calcValue: (raw: string | number | BigNumber, decimals: number) => BigNumber;
    checkAddress: (address: string) => boolean;
    convertEthToWei: (value: string | number) => number;
    convertToAmount: (amount: AmountInternal) => Amount;
    convertToHexString: (decimalStr: string | number | BigNumber) => string;
    createLink: (params: any[]) => string;
    fetchUrl: <T>(url: string, options?: object) => Promise<T>;
    formatEndpoint: (endpoint: string) => string;
    formatEvent: <T>(event: any, networkDecimals: number, interestRateDecimals: number) => T;
    formatExchangeEvent: (exchangeEvent: AnyExchangeEventRaw, makerDecimals: number, takerDecimals: number) => AnyExchangeEvent;
    formatToAmount: (raw: string | number | BigNumber, decimals: number) => Amount;
    formatToAmountInternal: (raw: string | number | BigNumber, decimals: number) => AmountInternal;
    generateRandomNumber: (decimals: number) => BigNumber;
    isURL: (str: any) => boolean;
    trimUrl: (url: string) => string;
    websocketStream: (url: string, functionName: string, args: object) => Observable<any>;
};
export default _default;
