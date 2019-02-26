import { CurrencyNetwork } from './CurrencyNetwork';
import { Event } from './Event';
import { Payment } from './Payment';
import { TLProvider } from './providers/TLProvider';
import { Transaction } from './Transaction';
import { User } from './User';
import { AnyExchangeEvent, EventFilterOptions, ExchangeOptions, ExchangeTx, ExchangeTxOptions, Orderbook, OrderbookOptions, OrderOptions, OrdersQuery, RawTxObject, SignedOrder, TxObject } from './typings';
/**
 * The Exchange class contains all methods for making/taking orders, retrieving the orderbook
 * and more.
 */
export declare class Exchange {
    private event;
    private user;
    private transaction;
    private currencyNetwork;
    private payment;
    private provider;
    constructor(params: {
        currencyNetwork: CurrencyNetwork;
        event: Event;
        payment: Payment;
        provider: TLProvider;
        transaction: Transaction;
        user: User;
    });
    /**
     * Returns all known exchange contract addresses.
     */
    getExAddresses(): Promise<string[]>;
    /**
     * Returns a specific order by its hash.
     * @param orderHash keccak-256 hash of order.
     * @param options See `OrderOptions` for more details.
     * @param options.makerTokenDecimals Decimals of maker token can be provided manually.
     *                                   NOTE: If maker token is NOT a currency network, then decimals have to be explicitly given.
     * @param options.takerTokenDecimals Decimals of taker token can be provided manually.
     *                                   NOTE: If taker token is NOT a currency network, then decimals have to be explicitly given.
     */
    getOrderByHash(orderHash: string, options?: OrderOptions): Promise<SignedOrder>;
    /**
     * Returns orders that match given query parameters.
     * @param query See `OrdersQuery` for more information.
     * @param query.exchangeContractAddress Orders for this exchange address.
     * @param query.tokenAddress Orders where `makerTokenAddress` or `takerTokenAddress` is `tokenAddress`.
     * @param query.makerTokenAddress Orders with specified makerTokenAddress.
     * @param query.takerTokenAddress Orders with specified takerTokenAddress.
     * @param query.maker Orders with specified maker address.
     * @param query.taker Orders with specified taker address.
     * @param query.trader Orders where `maker` or `taker` is `trader`.
     */
    getOrders(query?: OrdersQuery): Promise<SignedOrder[]>;
    /**
     * Returns the orderbook for a given token pair.
     * @param baseTokenAddress Address of base token.
     * @param quoteTokenAddress Address of quote token.
     * @param options See `OrderbookOptions` for more details.
     * @param options.baseTokenDecimals Decimals of base token can be provided manually.
     *                                  NOTE: If base token is NOT a currency network, then decimals have to be explicitly given.
     * @param options.quoteTokenDecimals Decimals of quote token can be provided manually.
     *                                   NOTE: If quote token is NOT a currency network, then decimals have to be explicitly given.
     */
    getOrderbook(baseTokenAddress: string, quoteTokenAddress: string, options?: OrderbookOptions): Promise<Orderbook>;
    /**
     * Creates an order and posts it to the relay server. If successful, the method returns the created order.
     * @param exchangeContractAddress Address of exchange contract.
     * @param makerTokenAddress Address of token the maker (loaded user) is offering.
     * @param takerTokenAddress Address of token the maker (loaded user) is requesting from the taker.
     * @param makerTokenValue Amount of token the maker (loaded user) is offering.
     * @param takerTokenValue Amount of token the maker (loaded user) is requesting from the taker.
     * @param options See `ExchangeOptions` for more information.
     * @param options.makerTokenDecimals Decimals of maker token can be provided manually.
     *                                   NOTE: If maker token is NOT a currency network, then decimals have to be explicitly given.
     * @param options.takerTokenDecimals Decimals of taker token can be provided manually.
     *                                   NOTE: If taker token is NOT a currency network, then decimals have to be explicitly given.
     * @param options.expirationUnixTimestampSec Date on when the order will expire in UNIX time.
     */
    makeOrder(exchangeContractAddress: string, makerTokenAddress: string, takerTokenAddress: string, makerTokenValue: number | string, takerTokenValue: number | string, options?: ExchangeOptions): Promise<SignedOrder>;
    /**
     * Prepares an ethereum transaction object for taking an order.
     * @param signedOrder The order to take as returned by `getOrderbook`, `getOrders` or `getOrderByHash`.
     * @param fillTakerTokenValue Amount of tokens the taker (loaded user) wants to fill.
     * @param options See `ExchangeTxOptions` for more information.
     * @param options.gasLimit Custom gas limit.
     * @param options.gasPrice Custom gas price.
     * @param options.makerTokenDecimals Decimals of maker token can be provided manually.
     *                                   NOTE: If maker token is NOT a currency network, then decimals have to be explicitly given.
     * @param options.takerTokenDecimals Decimals of taker token can be provided manually.
     *                                   NOTE: If taker token is NOT a currency network, then decimals have to be explicitly given.
     */
    prepTakeOrder(signedOrder: SignedOrder, fillTakerTokenValue: number | string, options?: ExchangeTxOptions): Promise<ExchangeTx>;
    /**
     * Prepares an ethereum transaction for cancelling an order.
     * @param signedOrder The order to cancel as returned by `getOrderbook`, `getOrders` or `getOrderByHash`.
     * @param cancelTakerTokenValue Amount of tokens the maker (loaded user) wants to cancel.
     * @param options See `ExchangeTxOptions` for more information.
     * @param options.gasLimit Custom gas limit.
     * @param options.gasPrice Custom gas price.
     * @param options.makerTokenDecimals Decimals of maker token can be provided manually.
     *                                   NOTE: If maker token is NOT a currency network, then decimals have to be explicitly given.
     * @param options.takerTokenDecimals Decimals of taker token can be provided manually.
     *                                   NOTE: If taker token is NOT a currency network, then decimals have to be explicitly given.
     */
    prepCancelOrder(signedOrder: SignedOrder, cancelTakerTokenValue: number | string, options?: ExchangeTxOptions): Promise<TxObject>;
    /**
     * Signs a raw transaction object as returned by `prepCancelOrder` or `prepFillOrder`
     * and sends the signed transaction.
     * @param rawTx Raw transaction object.
     */
    confirm(rawTx: RawTxObject): Promise<string>;
    /**
     * Returns event logs of the Exchange contract for the loaded user.
     * @param exchangeAddress Address of Exchange contract.
     * @param filter Event filter object. See `EventFilterOptions` for more information.
     * @param filter.type Available event types are `LogFill` and `LogCancel`.
     * @param filter.fromBlock Start of block range for event logs.
     */
    getLogs(exchangeAddress: string, filter?: EventFilterOptions): Promise<AnyExchangeEvent[]>;
    /**
     * Returns a path for a transfer and an empty path if given token address is not a currency network.
     * @param tokenAddress Address of token.
     * @param from Address of sender of transfer.
     * @param to Address of receiver of transfer.
     * @param value Amount to transfer.
     * @param options See `TLOptions` for more information.
     * @param options.decimals Decimals of token can be provided manually.
     *                         NOTE: If token address is NOT a currency network, then decimals have to be explicit.
     */
    private _getPathObj;
    /**
     * Helper function to retrieve all addresses of a given order and return them as an array:
     * `[ makerAddress, takerAddress, makerTokenAddress, takerTokenAddress, feeRecipientAddress ]`
     * @param order Order object to retrieve addresses from.
     */
    private _getOrderAddresses;
    /**
     * Helper function to retrieve all values of a given order and return them as an array.
     * `[ makerTokenAmount, takerTokenAmount, makeFee, takerFee, expirationUnixTimestampSec, salt ]`
     * @param order Order object to retrieve values from.
     */
    private _getOrderValues;
    /**
     * Calculates partial value given a numerator and denominator.
     * @param numerator Numerator.
     * @param denominator Denominator.
     * @param target Target to calculate partial of.
     */
    private _getPartialAmount;
    /**
     * Returns fees of a given order.
     * @param order Unformatted Order object as returned by relay.
     */
    private _getFees;
    /**
     * Sends a POST request to given `path` with given `payload`.
     * @param path Endpoint to send request to.
     * @param payload Body of POST request.
     */
    private _postRequest;
    /**
     * Return keccak-256 hash of given order.
     * @param order Order object.
     */
    private _getOrderHashHex;
    /**
     * Formats number values of given order to Amount objects and calculates the hash of given order.
     * @param signedOrderRaw Signed order object unformatted.
     * @param makerDecimals Decimals of maker token.
     * @param takerDecimals Decimals of taker token.
     */
    private _formatOrderRaw;
    /**
     * Helper function for filtering all unique addresses from an array of orders.
     * It also maps the unique addresses to whether it is a currency network or a token.
     * @param orders Unformatted orders as returned by the relay.
     */
    private _getUniqueTokenAddresses;
}
