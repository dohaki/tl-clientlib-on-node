import { Contact } from './Contact';
import { CurrencyNetwork } from './CurrencyNetwork';
import { EthWrapper } from './EthWrapper';
import { Event } from './Event';
import { Exchange } from './Exchange';
import { Messaging } from './Messaging';
import { Payment } from './Payment';
import { Transaction } from './Transaction';
import { Trustline } from './Trustline';
import { User } from './User';
import { TLProvider } from './providers/TLProvider';
import { TLSigner } from './signers/TLSigner';
import { TLWallet } from './wallets/TLWallet';
import { TLNetworkConfig } from './typings';
/**
 * The TLNetwork class is the single entry-point into the trustline-network.js library.
 * It contains all of the library's functionality and all calls to the library should be made through a TLNetwork instance.
 */
export declare class TLNetwork {
    /**
     * User instance containing all user/keystore related methods.
     */
    user: User;
    /**
     * @hidden
     * Transaction instance containing all transaction related methods.
     */
    transaction: Transaction;
    /**
     * Payment instance containing all methods for creating trustline transfers
     * and ETH transfers.
     */
    payment: Payment;
    /**
     * Trustline instance containing all methods for managing trustlines.
     */
    trustline: Trustline;
    /**
     * CurrencyNetwork instance containing all methods for retrieving currency network
     * related information.
     */
    currencyNetwork: CurrencyNetwork;
    /**
     * @hidden
     */
    contact: Contact;
    /**
     * Event instance for retrieving and formatting event logs.
     */
    event: Event;
    /**
     * Exchange instance containing all methods for making and taking orders.
     */
    exchange: Exchange;
    /**
     * @hidden
     */
    messaging: Messaging;
    /**
     * EthWrapper instance for wrapping and unwrapping ETH.
     */
    ethWrapper: EthWrapper;
    /**
     * @hidden
     */
    web3: any;
    /**
     * @hidden
     */
    signer: TLSigner;
    /**
     * @hidden
     */
    wallet: TLWallet;
    /**
     * @hidden
     */
    provider: TLProvider;
    /**
     * Initiates a new TLNetwork instance that provides the public interface to trustlines-network library.
     * @param config Configuration object. See type `TLNetworkConfig` for more information.
     */
    constructor(config?: TLNetworkConfig);
    setProvider(provider: TLProvider): void;
    setSigner(signer: TLSigner): void;
    setWallet(wallet: TLWallet): void;
}
