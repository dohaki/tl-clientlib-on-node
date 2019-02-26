import { BigNumber } from 'bignumber.js';
import { TLProvider } from './providers/TLProvider';
import { TLSigner } from './signers/TLSigner';
import { RawTxObject, TxObjectInternal, TxOptionsInternal } from './typings';
/**
 * The Transaction class contains functions that are needed for Ethereum transactions.
 */
export declare class Transaction {
    private signer;
    private provider;
    constructor(params: {
        signer: TLSigner;
        provider: TLProvider;
    });
    /**
     * Returns transaction fees and the raw transaction object for calling a contract function.
     * @param userAddress address of user that calls the contract function
     * @param contractAddress address of deployed contract
     * @param contractName name of deployed contract
     * @param functionName name of contract function
     * @param parameters arguments of function in same order as in contract
     * @param gasPrice (optional)
     * @param gasLimit (optional)
     * @returns A ethereum transaction object and the estimated transaction fees in ETH.
     */
    prepFuncTx(userAddress: string, contractAddress: string, contractName: string, functionName: string, args: any[], options?: TxOptionsInternal): Promise<TxObjectInternal>;
    /**
     * Returns transaction fees and raw transaction object for transferring ETH.
     * @param senderAddress address of user sending the transfer
     * @param receiverAddress address of user receiving the transfer
     * @param rawValue transfer amount in wei
     * @param gasPrice (optional)
     * @param gasLimit (optional)
     * @returns A ethereum transaction object containing and the estimated transaction fees in ETH.
     */
    prepValueTx(senderAddress: string, receiverAddress: string, rawValue: BigNumber, options?: TxOptionsInternal): Promise<TxObjectInternal>;
    /**
     * Signs and sends the given transaction object.
     * @param rawTx Raw transaction object.
     */
    confirm(rawTx: RawTxObject): Promise<string>;
}
