import { TLProvider } from './providers/TLProvider';
import { Transaction } from './Transaction';
import { User } from './User';
import { Amount, AnyTokenEvent, EventFilterOptions, RawTxObject, TxObject, TxOptions } from './typings';
/**
 * The class EthWrapper contains all methods for depositing, withdrawing and transferring wrapped ETH.
 */
export declare class EthWrapper {
    private provider;
    private transaction;
    private user;
    constructor(params: {
        provider: TLProvider;
        transaction: Transaction;
        user: User;
    });
    /**
     * Returns all known ETH wrapper contract addresses from the relay server.
     */
    getAddresses(): Promise<string[]>;
    /**
     * Returns the amount of already wrapped ETH on the given ETH wrapper contract.
     * @param ethWrapperAddress Address of ETH wrapper contract.
     */
    getBalance(ethWrapperAddress: string): Promise<Amount>;
    /**
     * Prepares an ethereum transaction object for transferring wrapped ETH where the
     * loaded user is the sender.
     * @param ethWrapperAddress Address of ETH wrapper contract.
     * @param receiverAddress Address of receiver of transfer.
     * @param value Amount of wrapped ETH to transfer.
     * @param options Transaction options. See `TxOptions` for more information.
     * @param options.gasPrice Custom gas price.
     * @param options.gasLimit Custom gas limit.
     */
    prepTransfer(ethWrapperAddress: string, receiverAddress: string, value: number | string, options?: TxOptions): Promise<TxObject>;
    /**
     * Prepares an ethereum transaction object for depositing/wrapping ETH.
     * @param ethWrapperAddress Address of ETH wrapper contract.
     * @param value Amount of ETH to deposit/wrap.
     * @param options Transaction options. See `TxOptions` for more information.
     * @param options.gasPrice Custom gas price.
     * @param options.gasLimit Custom gas limit.
     */
    prepDeposit(ethWrapperAddress: string, value: number | string, options?: TxOptions): Promise<TxObject>;
    /**
     * Prepares an ethereum transaction object for withdrawing/unwrapping ETH.
     * @param ethWrapperAddress Address of ETH wrapper contract.
     * @param value Amount of ETH to withdraw/unwrap.
     * @param options Transaction options. See `TxOptions` for more information.
     * @param options.gasPrice Custom gas price.
     * @param options.gasLimit Custom gas limit.
     */
    prepWithdraw(ethWrapperAddress: string, value: number | string, options?: TxOptions): Promise<TxObject>;
    /**
     * Signs a raw transaction object as returned by `prepTransfer`, `prepDeposit` or `prepWithdraw`
     * and sends the signed transaction.
     * @param rawTx Raw transaction object.
     */
    confirm(rawTx: RawTxObject): Promise<string>;
    /**
     * Returns event logs of the ETH wrapper contract for the loaded user.
     * @param ethWrapperAddress Address of the ETH wrapper contract.
     * @param filter Event filter object. See `EventFilterOptions` for more information.
     * @param filter.type Available event types are `Transfer`, `Deposit` and `Withdrawal`.
     * @param filter.fromBlock Start of block range for event logs.
     */
    getLogs(ethWrapperAddress: string, filter?: EventFilterOptions): Promise<AnyTokenEvent[]>;
}
