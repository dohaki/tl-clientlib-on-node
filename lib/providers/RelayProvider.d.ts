import { Observable } from 'rxjs/Observable';
import { TLProvider } from './TLProvider';
import { Amount, TxInfos } from '../typings';
export declare class RelayProvider implements TLProvider {
    relayApiUrl: string;
    relayWsApiUrl: string;
    constructor(relayApiUrl: string, relayWsApiUrl: string);
    /**
     * Returns a JSON response from the REST API of the relay server.
     * @param endpoint Endpoint to fetch.
     * @param options Optional fetch options.
     */
    fetchEndpoint<T>(endpoint: string, options?: object): Promise<T>;
    /**
     * Creates a websocket stream connection to the relay server.
     * @param endpoint Websocket stream endpoint to connect to.
     * @param functionName Function to call on connection.
     * @param args Function arguments.
     */
    createWebsocketStream(endpoint: string, functionName: string, args: object): Observable<any>;
    /**
     * Returns needed information for creating an ethereum transaction.
     * @param address Address of user creating the transaction
     * @returns Information for creating an ethereum transaction for the given user address.
     *          See type `TxInfos` for more details.
     */
    getTxInfos(address: string): Promise<TxInfos>;
    /**
     * Returns balance of given address.
     * @param address Address to determine balance for.
     */
    getBalance(address: string): Promise<Amount>;
    /**
     * Send the given _signedTransaction_ to a relay server to execute it on the
     * blockchain and returns a `Promise` with the transaction hash.
     * @param signedTransaction
     */
    sendSignedTransaction(signedTransaction: string): Promise<string>;
}
