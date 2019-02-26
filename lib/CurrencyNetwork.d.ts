import { TLProvider } from './providers/TLProvider';
import { DecimalsObject, DecimalsOptions, NetworkDetails, UserOverview } from './typings';
/**
 * The CurrencyNetwork class contains all functions relevant for retrieving
 * currency network related information.
 */
export declare class CurrencyNetwork {
    private provider;
    constructor(provider: TLProvider);
    /**
     * Returns all registered currency networks.
     */
    getAll(): Promise<NetworkDetails[]>;
    /**
     * Returns detailed information of specific currency network.
     * @param networkAddress Address of a currency network.
     * @returns A network object with information about name, decimals, number of users and address.
     */
    getInfo(networkAddress: string): Promise<NetworkDetails>;
    /**
     * Returns all addresses of users in a currency network.
     * @param networkAddress Address of a currency network.
     */
    getUsers(networkAddress: string): Promise<string[]>;
    /**
     * Returns overview of a user in a specific currency network.
     * @param networkAddress Address of a currency network.
     * @param userAddress Address of a user.
     */
    getUserOverview(networkAddress: string, userAddress: string): Promise<UserOverview>;
    /**
     * Returns the network decimals and interest decimals specified in a currency network.
     * @param networkAddress Address of currency network.
     * @param decimals If decimals are known they can be provided manually.
     */
    getDecimals(networkAddress: string, decimalsOptions?: DecimalsOptions): Promise<DecimalsObject>;
    /**
     * Returns true or false whether given address is a registered currency network.
     * @param contractAddress Address which should be checked.
     */
    isNetwork(contractAddress: string): Promise<boolean>;
    /**
     * Checks if given addresses are valid ethereum addresses.
     * @param addresses Array of addresses that should be checked.
     */
    private _checkAddresses;
}
