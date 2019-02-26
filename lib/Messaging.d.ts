import { Observable } from 'rxjs/Observable';
import { CurrencyNetwork } from './CurrencyNetwork';
import { TLProvider } from './providers/TLProvider';
import { User } from './User';
export declare class Messaging {
    private user;
    private currencyNetwork;
    private provider;
    constructor(params: {
        currencyNetwork: CurrencyNetwork;
        provider: TLProvider;
        user: User;
    });
    paymentRequest(network: string, user: string, value: number | string, subject?: string): Promise<{}>;
    messageStream(): Observable<any>;
}
