import { ethers } from 'ethers';
import { TLSigner } from './TLSigner';
import { Amount, RawTxObject, Signature } from '../typings';
/**
 * The Web3Signer class contains functions for signing transactions with a web3 provider.
 */
export declare class Web3Signer implements TLSigner {
    address: string;
    pubKey: string;
    private signer;
    constructor(web3Provider: ethers.providers.Web3Provider);
    /**
     * Returns `Promise` with address of signer.
     */
    getAddress(): Promise<string>;
    /**
     * Returns `Promise` with balance of signer.
     */
    getBalance(): Promise<Amount>;
    /**
     * Signs a transaction and returns `Promise` with transaction hash.
     * @param rawTx Raw transaction object.
     */
    confirm(rawTx: RawTxObject): Promise<string>;
    /**
     * Signs the given message and returns `Promise` with signature.
     * @param message Message to sign.
     */
    signMessage(message: string | ArrayLike<number>): Promise<Signature>;
    /**
     * Signs the given message hash and return `Promise` with signature.
     * @param msgHash Hash of message to sign.
     */
    signMsgHash(msgHash: string): Promise<Signature>;
}
