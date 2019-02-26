import { ethers } from 'ethers';
import { TLProvider } from '../providers/TLProvider';
import { TLSigner } from '../signers/TLSigner';
import { TLWallet } from './TLWallet';
import { Amount, RawTxObject, Signature, UserObject } from '../typings';
/**
 * The EthersWallet class contains wallet related methods.
 */
export declare class EthersWallet implements TLWallet, TLSigner {
    provider: TLProvider;
    private wallet;
    constructor(provider: TLProvider);
    readonly address: string;
    readonly pubKey: string;
    getAddress(): Promise<string>;
    /**
     * Creates a new wallet and encrypts it with the provided password.
     * @param password Password to encrypt keystore.
     * @param progressCallback Callback function for encryption progress.
     */
    createAccount(password: string, progressCallback?: any): Promise<UserObject>;
    /**
     * Encrypts given keystore and loads wallet.
     * @param encryptedKeystore Encrypted keystore from `createAccount`.
     * @param password Password to decrypt keystore.
     * @param progressCallback Callback function for decryption progress.
     */
    loadAccount(encryptedKeystore: string, password: string, progressCallback?: any): Promise<UserObject>;
    /**
     * Recovers wallet from mnemonic phrase and encrypts keystore with given password.
     * @param seed Mnemonic seed phrase.
     * @param password Password to encrypt recovered keystore.
     * @param progressCallback Callback function for encryption progress.
     */
    recoverFromSeed(seed: string, password: string, progressCallback?: any): Promise<UserObject>;
    /**
     * Recovers wallet from private key and encrypts keystore with given password.
     * @param privateKey Private key to recover wallet from.
     * @param password Password to encrypt recovered keystore.
     * @param progressCallback Callback function for encryption progress.
     */
    recoverFromPrivateKey(privateKey: string, password: string, progressCallback?: any): Promise<UserObject>;
    /**
     * Signs given hex hash of message with loaded wallet.
     * @param msgHash Hash of message to sign.
     */
    signMsgHash(msgHash: string): Promise<Signature>;
    /**
     * Signs given message with loaded wallet.
     * @param message Message to sign.
     */
    signMessage(message: ethers.utils.Arrayish): Promise<Signature>;
    /**
     * Takes a raw transaction object, turns it into a RLP encoded hex string, signs it with
     * the loaded user and relays the transaction.
     * @param rawTx Raw transaction object.
     */
    confirm(rawTx: RawTxObject): Promise<string>;
    /**
     * Returns a `Promise` with the balance of loaded user.
     */
    getBalance(): Promise<Amount>;
    /**
     * Returns a `Promise` with the mnemonic seed phrase of loaded user.
     */
    showSeed(): Promise<string>;
    /**
     * Returns a `Promise` with the private key of loaded user.
     */
    exportPrivateKey(): Promise<string>;
    encrypt(msg: string, theirPubKey: string): Promise<any>;
    decrypt(encMsg: any, theirPubKey: string): Promise<any>;
}
