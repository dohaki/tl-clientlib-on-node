import { TLProvider } from './providers/TLProvider';
import { User } from './User';
export declare class Contact {
    private user;
    private provider;
    constructor(params: {
        user: User;
        provider: TLProvider;
    });
    getAll(networkAddress: string): Promise<string[]>;
    createLink(address: string, username: string): Promise<string>;
}
