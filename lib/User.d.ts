import { TLProvider } from './providers/TLProvider';
import { TLSigner } from './signers/TLSigner';
import { Transaction } from './Transaction';
import { TLWallet } from './wallets/TLWallet';
import { Amount, RawTxObject, Signature, UserObject } from './typings';
/**
 * The User class contains all user related functions, which also include keystore
 * related methods.
 */
export declare class User {
    private provider;
    private signer;
    private transaction;
    private wallet;
    private defaultPassword;
    constructor(params: {
        provider: TLProvider;
        signer: TLSigner;
        transaction: Transaction;
        wallet: TLWallet;
    });
    /**
     * Checksummed Ethereum address of currently loaded user/keystore.
     */
    readonly address: string;
    /**
     * Public key of currently loaded user/keystore.
     */
    readonly pubKey: string;
    /**
     * Creates a new user and the respective keystore using the configured signer.
     * Loads new user into the state and returns the created user object.
     * @param progressCallback Optional progress callback to call on encryption progress.
     */
    create(progressCallback?: any): Promise<UserObject>;
    /**
     * Loads an existing user and respective keystore.
     * Returns the loaded user object.
     * @param serializedKeystore Serialized [eth-lightwallet](https://github.com/ConsenSys/eth-lightwallet) key store.
     * @param progressCallback Optional progress callback to call on encryption progress.
     */
    load(serializedKeystore: string, progressCallback?: any): Promise<UserObject>;
    /**
     * Digitally signs a message hash with the currently loaded user/keystore.
     * @param msgHash Hash of message that should be signed.
     */
    signMsgHash(msgHash: string): Promise<Signature>;
    /**
     * Returns ETH balance of loaded user.
     */
    getBalance(): Promise<Amount>;
    /**
     * Encrypts a message with the public key of another user.
     * @param msg Plain text message that should get encrypted.
     * @param theirPubKey Public key of receiver of message.
     */
    encrypt(msg: string, theirPubKey: string): Promise<any>;
    /**
     * Decrypts an encrypted message with the private key of loaded user.
     * @param encMsg Encrypted message.
     * @param theirPubKey Public key of sender of message.
     */
    decrypt(encMsg: any, theirPubKey: string): Promise<any>;
    /**
     * Returns the 12 word seed of loaded user.
     */
    showSeed(): Promise<string>;
    /**
     * Returns the private key of loaded user.
     */
    exportPrivateKey(): Promise<string>;
    /**
     * Recovers user / keystore from 12 word seed.
     * @param seed 12 word seed phrase string.
     * @param progressCallback Optional progress callback to call on encryption progress.
     */
    recoverFromSeed(seed: string, progressCallback?: any): Promise<UserObject>;
    /**
     * Returns a shareable link, which can be opened by other users who already have ETH
     * and are willing to send some of it to the new user. The function is called by a
     * new user who wants to get onboarded, respectively has no ETH or trustline.
     * @param username Name of new user who wants to get onboarded.
     * @param serializedKeystore Serialized [eth-lightwallet](https://github.com/ConsenSys/eth-lightwallet)
     *                           keystore of new user who wants to get onboarded.
     * @param progressCallback Optional progress callback to call on encryption progress.
     */
    createOnboardingMsg(username: string, serializedKeystore: string, progressCallback?: any): Promise<string>;
    /**
     * Returns an ethereum transaction object for onboarding a new user. Called by a user who already has ETH
     * and wants to onboard a new user by sending some of it.
     * @param newUserAddress Address of new user who wants to get onboarded.
     * @param initialValue Value of ETH to send, default is 0.1 ETH.
     */
    prepOnboarding(newUserAddress: string, initialValue?: number): Promise<object>;
    /**
     * Signs a raw transaction object as returned by `prepOnboarding`
     * and sends the signed transaction.
     * @param rawTx Raw transaction object.
     */
    confirmOnboarding(rawTx: RawTxObject): Promise<string>;
    /**
     * Returns a shareable link which can be send to other users.
     * Contains username and address.
     * @param username Custom username.
     */
    createLink(username: string): Promise<string>;
    /**
     * @hidden
     * Gives some ETH to requesting address.
     * NOTE: Used only for dev purposes.
     */
    requestEth(): Promise<string>;
    /**
     * @hidden
     * Verifies a signature.
     * @param message Signed message
     * @param signature Digital signature
     */
    verifySignature(message: any, signature: string): boolean;
}
