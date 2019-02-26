"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = require("bignumber.js");
var ethers_1 = require("ethers");
var utils_1 = require("../utils");
/**
 * The EthersWallet class contains wallet related methods.
 */
var EthersWallet = /** @class */ (function () {
    function EthersWallet(provider) {
        this.provider = provider;
    }
    Object.defineProperty(EthersWallet.prototype, "address", {
        ///////////////
        // Accessors //
        ///////////////
        get: function () {
            return this.wallet ? this.wallet.address : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EthersWallet.prototype, "pubKey", {
        get: function () {
            return this.wallet
                ? ethers_1.ethers.utils.computePublicKey(this.wallet.privateKey)
                : undefined;
        },
        enumerable: true,
        configurable: true
    });
    EthersWallet.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.wallet) {
                    throw new Error('No wallet loaded.');
                }
                return [2 /*return*/, this.address];
            });
        });
    };
    ////////////////////////
    // Creating Instances //
    ////////////////////////
    /**
     * Creates a new wallet and encrypts it with the provided password.
     * @param password Password to encrypt keystore.
     * @param progressCallback Callback function for encryption progress.
     */
    EthersWallet.prototype.createAccount = function (password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptedKeystore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.wallet = ethers_1.ethers.Wallet.createRandom();
                        return [4 /*yield*/, this.wallet.encrypt(password, typeof progressCallback === 'function' && progressCallback)];
                    case 1:
                        encryptedKeystore = _a.sent();
                        return [2 /*return*/, {
                                address: this.address,
                                keystore: encryptedKeystore,
                                pubKey: this.pubKey
                            }];
                }
            });
        });
    };
    /**
     * Encrypts given keystore and loads wallet.
     * @param encryptedKeystore Encrypted keystore from `createAccount`.
     * @param password Password to decrypt keystore.
     * @param progressCallback Callback function for decryption progress.
     */
    EthersWallet.prototype.loadAccount = function (encryptedKeystore, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, ethers_1.ethers.Wallet.fromEncryptedJson(encryptedKeystore, password, typeof progressCallback === 'function' && progressCallback)];
                    case 1:
                        _a.wallet = _b.sent();
                        return [2 /*return*/, {
                                address: this.address,
                                keystore: encryptedKeystore,
                                pubKey: this.pubKey
                            }];
                }
            });
        });
    };
    /**
     * Recovers wallet from mnemonic phrase and encrypts keystore with given password.
     * @param seed Mnemonic seed phrase.
     * @param password Password to encrypt recovered keystore.
     * @param progressCallback Callback function for encryption progress.
     */
    EthersWallet.prototype.recoverFromSeed = function (seed, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptedKeystore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.wallet = ethers_1.ethers.Wallet.fromMnemonic(seed);
                        return [4 /*yield*/, this.wallet.encrypt(password, typeof progressCallback === 'function' && progressCallback)];
                    case 1:
                        encryptedKeystore = _a.sent();
                        return [2 /*return*/, {
                                address: this.address,
                                keystore: encryptedKeystore,
                                pubKey: this.pubKey
                            }];
                }
            });
        });
    };
    /**
     * Recovers wallet from private key and encrypts keystore with given password.
     * @param privateKey Private key to recover wallet from.
     * @param password Password to encrypt recovered keystore.
     * @param progressCallback Callback function for encryption progress.
     */
    EthersWallet.prototype.recoverFromPrivateKey = function (privateKey, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptedKeystore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.wallet = new ethers_1.ethers.Wallet(privateKey);
                        return [4 /*yield*/, this.wallet.encrypt(password, typeof progressCallback === 'function' && progressCallback)];
                    case 1:
                        encryptedKeystore = _a.sent();
                        return [2 /*return*/, {
                                address: this.address,
                                keystore: encryptedKeystore,
                                pubKey: this.pubKey
                            }];
                }
            });
        });
    };
    /////////////
    // Signing //
    /////////////
    /**
     * Signs given hex hash of message with loaded wallet.
     * @param msgHash Hash of message to sign.
     */
    EthersWallet.prototype.signMsgHash = function (msgHash) {
        return __awaiter(this, void 0, void 0, function () {
            var msgHashBytes;
            return __generator(this, function (_a) {
                if (!this.wallet) {
                    throw new Error('No wallet loaded.');
                }
                if (!ethers_1.ethers.utils.isHexString(msgHash)) {
                    throw new Error('Message hash is not a valid hex string.');
                }
                msgHashBytes = ethers_1.ethers.utils.arrayify(msgHash);
                return [2 /*return*/, this.signMessage(msgHashBytes)];
            });
        });
    };
    /**
     * Signs given message with loaded wallet.
     * @param message Message to sign.
     */
    EthersWallet.prototype.signMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var flatFormatSignature, _a, r, s, v;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error('No wallet loaded.');
                        }
                        return [4 /*yield*/, this.wallet.signMessage(message)];
                    case 1:
                        flatFormatSignature = _b.sent();
                        _a = ethers_1.ethers.utils.splitSignature(flatFormatSignature), r = _a.r, s = _a.s, v = _a.v;
                        return [2 /*return*/, {
                                concatSig: flatFormatSignature,
                                ecSignature: { r: r, s: s, v: v }
                            }];
                }
            });
        });
    };
    /**
     * Takes a raw transaction object, turns it into a RLP encoded hex string, signs it with
     * the loaded user and relays the transaction.
     * @param rawTx Raw transaction object.
     */
    EthersWallet.prototype.confirm = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            var signedTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error('No wallet loaded.');
                        }
                        return [4 /*yield*/, this.wallet.sign({
                                data: rawTx.data,
                                gasLimit: ethers_1.ethers.utils.bigNumberify(rawTx.gasLimit instanceof bignumber_js_1.BigNumber
                                    ? rawTx.gasLimit.toString()
                                    : rawTx.gasLimit),
                                gasPrice: ethers_1.ethers.utils.bigNumberify(rawTx.gasPrice instanceof bignumber_js_1.BigNumber
                                    ? rawTx.gasPrice.toString()
                                    : rawTx.gasPrice),
                                nonce: rawTx.nonce,
                                to: rawTx.to,
                                value: ethers_1.ethers.utils.bigNumberify(rawTx.value instanceof bignumber_js_1.BigNumber ? rawTx.value.toString() : rawTx.value)
                            })];
                    case 1:
                        signedTransaction = _a.sent();
                        return [2 /*return*/, this.provider.sendSignedTransaction(signedTransaction)];
                }
            });
        });
    };
    /////////////
    // Account //
    /////////////
    /**
     * Returns a `Promise` with the balance of loaded user.
     */
    EthersWallet.prototype.getBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error('No wallet loaded.');
                        }
                        return [4 /*yield*/, this.provider.fetchEndpoint("users/" + this.address + "/balance")];
                    case 1:
                        balance = _a.sent();
                        return [2 /*return*/, utils_1.default.formatToAmount(utils_1.default.calcRaw(balance, 18), 18)];
                }
            });
        });
    };
    /**
     * Returns a `Promise` with the mnemonic seed phrase of loaded user.
     */
    EthersWallet.prototype.showSeed = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.wallet) {
                    throw new Error('No wallet loaded.');
                }
                return [2 /*return*/, this.wallet.mnemonic];
            });
        });
    };
    /**
     * Returns a `Promise` with the private key of loaded user.
     */
    EthersWallet.prototype.exportPrivateKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.wallet) {
                    throw new Error('No wallet loaded.');
                }
                return [2 /*return*/, this.wallet.privateKey];
            });
        });
    };
    /////////////////////////////
    // Encryption / Decryption //
    /////////////////////////////
    EthersWallet.prototype.encrypt = function (msg, theirPubKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    EthersWallet.prototype.decrypt = function (encMsg, theirPubKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    return EthersWallet;
}());
exports.EthersWallet = EthersWallet;
//# sourceMappingURL=EthersWallet.js.map