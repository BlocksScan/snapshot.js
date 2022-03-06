'use strict';

var fetch = require('cross-fetch');
var bytes = require('@ethersproject/bytes');
var abi = require('@ethersproject/abi');
var contracts = require('@ethersproject/contracts');
var ethEnsNamehash = require('@ensdomains/eth-ens-namehash');
var jsonToGraphqlQuery = require('json-to-graphql-query');
var Ajv = require('ajv');
var addFormats = require('ajv-formats');
var set = require('lodash.set');
var providers$1 = require('@ethersproject/providers');
var wallet = require('@ethersproject/wallet');
var hash = require('@ethersproject/hash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var Ajv__default = /*#__PURE__*/_interopDefaultLegacy(Ajv);
var addFormats__default = /*#__PURE__*/_interopDefaultLegacy(addFormats);
var set__default = /*#__PURE__*/_interopDefaultLegacy(set);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var spaceTypes = {
    Space: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'settings', type: 'string' }
    ]
};
var proposalTypes = {
    Proposal: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'type', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'body', type: 'string' },
        { name: 'choices', type: 'string[]' },
        { name: 'start', type: 'uint64' },
        { name: 'end', type: 'uint64' },
        { name: 'snapshot', type: 'uint64' },
        { name: 'network', type: 'string' },
        { name: 'strategies', type: 'string' },
        { name: 'plugins', type: 'string' },
        { name: 'metadata', type: 'string' }
    ]
};
var cancelProposalTypes = {
    CancelProposal: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'string' }
    ]
};
var cancelProposal2Types = {
    CancelProposal: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'bytes32' }
    ]
};
var voteTypes = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'string' },
        { name: 'choice', type: 'uint32' },
        { name: 'metadata', type: 'string' }
    ]
};
var voteArrayTypes = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'string' },
        { name: 'choice', type: 'uint32[]' },
        { name: 'metadata', type: 'string' }
    ]
};
var voteStringTypes = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'string' },
        { name: 'choice', type: 'string' },
        { name: 'metadata', type: 'string' }
    ]
};
var vote2Types = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'bytes32' },
        { name: 'choice', type: 'uint32' },
        { name: 'metadata', type: 'string' }
    ]
};
var voteArray2Types = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'bytes32' },
        { name: 'choice', type: 'uint32[]' },
        { name: 'metadata', type: 'string' }
    ]
};
var voteString2Types = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'bytes32' },
        { name: 'choice', type: 'string' },
        { name: 'metadata', type: 'string' }
    ]
};
var followTypes = {
    Follow: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' }
    ]
};
var unfollowTypes = {
    Unfollow: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' }
    ]
};
var subscribeTypes = {
    Subscribe: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' }
    ]
};
var unsubscribeTypes = {
    Unsubscribe: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' }
    ]
};
var aliasTypes = {
    Alias: [
        { name: 'from', type: 'address' },
        { name: 'alias', type: 'address' }
    ]
};

var hubs = [
	"https://hub.snapshot.org",
	"https://testnet.snapshot.org"
];

var NAME = 'snapshot';
var VERSION = '0.1.4';
var domain = {
    name: NAME,
    version: VERSION
    // chainId: 1
};
var Client$1 = /** @class */ (function () {
    function Client(address) {
        if (address === void 0) { address = hubs[0]; }
        this.address = address;
    }
    Client.prototype.sign = function (web3, address, message, types) {
        return __awaiter(this, void 0, void 0, function () {
            var signer, data, sig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        signer = (web3 === null || web3 === void 0 ? void 0 : web3.getSigner) ? web3.getSigner() : web3;
                        if (!message.from)
                            message.from = address;
                        if (!message.timestamp)
                            message.timestamp = parseInt((Date.now() / 1e3).toFixed());
                        data = { domain: domain, types: types, message: message };
                        return [4 /*yield*/, signer._signTypedData(domain, data.types, message)];
                    case 1:
                        sig = _a.sent();
                        console.log('Sign', { address: address, sig: sig, data: data });
                        return [4 /*yield*/, this.send({ address: address, sig: sig, data: data })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.send = function (envelop) {
        return __awaiter(this, void 0, void 0, function () {
            var url, init;
            return __generator(this, function (_a) {
                url = this.address + "/api/msg";
                init = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(envelop)
                };
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        fetch__default["default"](url, init)
                            .then(function (res) {
                            if (res.ok)
                                return resolve(res.json());
                            throw res;
                        })
                            .catch(function (e) { return e.json().then(function (json) { return reject(json); }); });
                    })];
            });
        });
    };
    Client.prototype.space = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, spaceTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.proposal = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, proposalTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.cancelProposal = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            var type2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type2 = message.proposal.startsWith('0x');
                        return [4 /*yield*/, this.sign(web3, address, message, type2 ? cancelProposal2Types : cancelProposalTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.vote = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            var type2, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type2 = message.proposal.startsWith('0x');
                        type = type2 ? vote2Types : voteTypes;
                        if (['approval', 'ranked-choice'].includes(message.type))
                            type = type2 ? voteArray2Types : voteArrayTypes;
                        if (['quadratic', 'weighted'].includes(message.type)) {
                            type = type2 ? voteString2Types : voteStringTypes;
                            message.choice = JSON.stringify(message.choice);
                        }
                        // @ts-ignore
                        delete message.type;
                        return [4 /*yield*/, this.sign(web3, address, message, type)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.follow = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, followTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.unfollow = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, unfollowTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.subscribe = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, subscribeTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.unsubscribe = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, unsubscribeTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.alias = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, aliasTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Client;
}());

function signMessage(web3, msg, address) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    msg = bytes.hexlify(new Buffer(msg, 'utf8'));
                    return [4 /*yield*/, web3.send('personal_sign', [msg, address])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getBlockNumber(provider) {
    return __awaiter(this, void 0, void 0, function () {
        var blockNumber;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, provider.getBlockNumber()];
                case 1:
                    blockNumber = _a.sent();
                    return [2 /*return*/, parseInt(blockNumber)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}

var version = "0.1.3";

var Client = /** @class */ (function () {
    function Client(address) {
        if (address === void 0) { address = hubs[0]; }
        this.address = address;
    }
    Client.prototype.request = function (command, body) {
        var url = this.address + "/api/" + command;
        var init;
        if (body) {
            init = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };
        }
        return new Promise(function (resolve, reject) {
            fetch__default["default"](url, init)
                .then(function (res) {
                if (res.ok)
                    return resolve(res.json());
                throw res;
            })
                .catch(function (e) { return e.json().then(function (json) { return reject(json); }); });
        });
    };
    Client.prototype.send = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('message', msg)];
            });
        });
    };
    Client.prototype.getSpaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('spaces')];
            });
        });
    };
    Client.prototype.broadcast = function (web3, account, space, type, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        msg = {
                            address: account,
                            msg: JSON.stringify({
                                version: version,
                                timestamp: (Date.now() / 1e3).toFixed(),
                                space: space,
                                type: type,
                                payload: payload
                            })
                        };
                        _a = msg;
                        return [4 /*yield*/, signMessage(web3, msg.msg, account)];
                    case 1:
                        _a.sig = _b.sent();
                        return [4 /*yield*/, this.send(msg)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Client.prototype.sign = function (web3, account, space, type, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            address: account,
                            msg: JSON.stringify({
                                version: version,
                                timestamp: (Date.now() / 1e3).toFixed(),
                                space: space,
                                type: type,
                                payload: payload
                            })
                        };
                        return [4 /*yield*/, signMessage(web3, msg.msg, account)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.vote = function (web3, address, space, _a) {
        var proposal = _a.proposal, choice = _a.choice, _b = _a.metadata, metadata = _b === void 0 ? {} : _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.broadcast(web3, address, space, 'vote', {
                        proposal: proposal,
                        choice: choice,
                        metadata: metadata
                    })];
            });
        });
    };
    Client.prototype.proposal = function (web3, address, space, _a) {
        var name = _a.name, body = _a.body, choices = _a.choices, start = _a.start, end = _a.end, snapshot = _a.snapshot, _b = _a.type, type = _b === void 0 ? 'single-choice' : _b, _c = _a.metadata, metadata = _c === void 0 ? {} : _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                return [2 /*return*/, this.broadcast(web3, address, space, 'proposal', {
                        name: name,
                        body: body,
                        choices: choices,
                        start: start,
                        end: end,
                        snapshot: snapshot,
                        type: type,
                        metadata: metadata
                    })];
            });
        });
    };
    Client.prototype.deleteProposal = function (web3, address, space, _a) {
        var proposal = _a.proposal;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.broadcast(web3, address, space, 'delete-proposal', {
                        proposal: proposal
                    })];
            });
        });
    };
    Client.prototype.settings = function (web3, address, space, settings) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.broadcast(web3, address, space, 'settings', settings)];
            });
        });
    };
    return Client;
}());

var $schema$2 = "http://json-schema.org/draft-07/schema#";
var $ref$2 = "#/definitions/Space";
var definitions$2 = {
	Space: {
		title: "Space",
		type: "object",
		properties: {
			name: {
				type: "string",
				title: "name",
				minLength: 1,
				maxLength: 32
			},
			"private": {
				type: "boolean"
			},
			about: {
				type: "string",
				title: "about",
				maxLength: 160
			},
			guidelines: {
				type: "string",
				title: "guidelines",
				maxLength: 1024
			},
			terms: {
				type: "string",
				title: "terms",
				format: "uri",
				maxLength: 128
			},
			avatar: {
				type: "string",
				title: "avatar",
				format: "uri",
				maxLength: 256
			},
			location: {
				type: "string",
				title: "location",
				maxLength: 24
			},
			website: {
				type: "string",
				title: "website",
				format: "uri",
				maxLength: 128
			},
			twitter: {
				type: "string",
				title: "twitter",
				pattern: "^[A-Za-z0-9_]*$",
				maxLength: 15
			},
			github: {
				type: "string",
				title: "github",
				pattern: "^[A-Za-z0-9_-]*$",
				maxLength: 39
			},
			email: {
				type: "string",
				title: "email",
				maxLength: 32
			},
			network: {
				type: "string",
				title: "network",
				minLength: 1,
				maxLength: 32
			},
			symbol: {
				type: "string",
				title: "symbol",
				minLength: 1,
				maxLength: 16
			},
			skin: {
				type: "string",
				title: "skin",
				maxLength: 32
			},
			domain: {
				type: "string",
				title: "domain",
				maxLength: 64
			},
			strategies: {
				type: "array",
				minItems: 1,
				maxItems: 8,
				items: {
					type: "object",
					properties: {
						name: {
							type: "string",
							maxLength: 64,
							title: "name"
						},
						network: {
							type: "string",
							maxLength: 12,
							title: "network"
						},
						params: {
							type: "object",
							title: "params"
						}
					},
					required: [
						"name"
					],
					additionalProperties: false
				},
				title: "strategies"
			},
			members: {
				type: "array",
				items: {
					type: "string",
					pattern: "^0x[a-fA-F0-9]{40}$",
					minLength: 42,
					maxLength: 42
				},
				title: "members"
			},
			admins: {
				type: "array",
				items: {
					type: "string",
					pattern: "^0x[a-fA-F0-9]{40}$",
					minLength: 42,
					maxLength: 42
				},
				title: "admins"
			},
			filters: {
				type: "object",
				properties: {
					defaultTab: {
						type: "string"
					},
					minScore: {
						type: "number",
						minimum: 0
					},
					onlyMembers: {
						type: "boolean"
					},
					invalids: {
						type: "array",
						items: {
							type: "string",
							maxLength: 64
						},
						title: "invalids"
					}
				},
				additionalProperties: false
			},
			validation: {
				type: "object",
				properties: {
					name: {
						type: "string",
						maxLength: 64,
						title: "name"
					},
					params: {
						type: "object",
						title: "params"
					}
				},
				required: [
					"name"
				],
				additionalProperties: false
			},
			plugins: {
				type: "object"
			},
			voting: {
				type: "object",
				properties: {
					delay: {
						type: "number",
						minimum: 0
					},
					period: {
						type: "number",
						minimum: 0
					},
					type: {
						type: "string",
						title: "type"
					},
					quorum: {
						type: "number",
						minimum: 0
					},
					blind: {
						type: "boolean"
					},
					hideAbstain: {
						type: "boolean"
					}
				},
				additionalProperties: false
			},
			categories: {
				type: "array",
				maxItems: 2,
				items: {
					type: "string",
					"enum": [
						"protocol",
						"social",
						"investment",
						"grant",
						"service",
						"media",
						"creator",
						"collector"
					]
				}
			}
		},
		required: [
			"name",
			"network",
			"symbol",
			"strategies"
		],
		additionalProperties: false
	}
};
var space = {
	$schema: $schema$2,
	$ref: $ref$2,
	definitions: definitions$2
};

var $schema$1 = "http://json-schema.org/draft-07/schema#";
var $ref$1 = "#/definitions/Proposal";
var definitions$1 = {
	Proposal: {
		title: "Proposal",
		type: "object",
		properties: {
			name: {
				type: "string",
				title: "name",
				minLength: 1,
				maxLength: 256
			},
			body: {
				type: "string",
				title: "body",
				minLength: 0,
				maxLength: 14400
			},
			choices: {
				type: "array",
				title: "choices",
				minItems: 1,
				maxItems: 120
			},
			type: {
				type: "string",
				"enum": [
					"single-choice",
					"approval",
					"ranked-choice",
					"quadratic",
					"weighted",
					"custom",
					"basic"
				]
			},
			snapshot: {
				type: "number",
				title: "snapshot"
			},
			start: {
				type: "number",
				title: "start",
				minimum: 1000000000,
				maximum: 2000000000
			},
			end: {
				type: "number",
				title: "end",
				minimum: 1000000000,
				maximum: 2000000000,
				exclusiveMinimum: {
					$data: "1/start"
				}
			},
			metadata: {
				type: "object",
				title: "metadata"
			}
		},
		required: [
			"name",
			"body",
			"choices",
			"snapshot",
			"start",
			"end"
		],
		additionalProperties: false
	}
};
var proposal = {
	$schema: $schema$1,
	$ref: $ref$1,
	definitions: definitions$1
};

var $schema = "http://json-schema.org/draft-07/schema#";
var $ref = "#/definitions/Vote";
var definitions = {
	Vote: {
		title: "Vote",
		type: "object",
		properties: {
			proposal: {
				type: "string",
				title: "proposal"
			},
			choice: {
				type: [
					"number",
					"array",
					"object",
					"boolean"
				],
				title: "choice"
			},
			metadata: {
				type: "object",
				title: "metadata"
			}
		},
		required: [
			"proposal",
			"choice"
		],
		additionalProperties: false
	}
};
var vote = {
	$schema: $schema,
	$ref: $ref,
	definitions: definitions
};

var schemas = {
    space: space.definitions.Space,
    proposal: proposal.definitions.Proposal,
    vote: vote.definitions.Vote
};

var Multicaller = /** @class */ (function () {
    function Multicaller(network, provider, abi, options) {
        this.options = {};
        this.calls = [];
        this.paths = [];
        this.network = network;
        this.provider = provider;
        this.abi = abi;
        this.options = options || {};
    }
    Multicaller.prototype.call = function (path, address, fn, params) {
        this.calls.push([address, fn, params]);
        this.paths.push(path);
        return this;
    };
    Multicaller.prototype.execute = function (from) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = from || {};
                        return [4 /*yield*/, multicall(this.network, this.provider, this.abi, this.calls, this.options)];
                    case 1:
                        result = _a.sent();
                        result.forEach(function (r, i) { return set__default["default"](obj, _this.paths[i], r.length > 1 ? r : r[0]); });
                        this.calls = [];
                        this.paths = [];
                        return [2 /*return*/, obj];
                }
            });
        });
    };
    return Multicaller;
}());

var networks = {
	"1": {
	key: "1",
	name: "Ethereum Mainnet",
	chainId: 1,
	network: "homestead",
	multicall: "0xeefba1e63905ef1d7acba5a8513c70307c1ce441",
	ensResolver: "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
	rpc: [
		{
			url: "https://api-geth-archive.ankr.com",
			user: "balancer_user",
			password: "balancerAnkr20201015"
		},
		"https://rpc.ankr.com/eth",
		"https://speedy-nodes-nyc.moralis.io/b9aed21e7bb7bdeb35972c9a/eth/mainnet/archive",
		"https://apis.ankr.com/e62bc219f9c9462b8749defe472d2dc5/6106d4a3ec1d1bcc87ec72158f8fd089/eth/archive/main",
		"https://eth-archival.gateway.pokt.network/v1/5f76124fb90218002e9ce985",
		"https://eth-mainnet.alchemyapi.io/v2/4bdDVB5QAaorY2UE-GBUbM2yQB3QJqzv",
		"https://cloudflare-eth.com"
	],
	ws: [
		"wss://eth-mainnet.ws.alchemyapi.io/v2/4bdDVB5QAaorY2UE-GBUbM2yQB3QJqzv"
	],
	explorer: "https://etherscan.io",
	start: 7929876,
	imageIPFS: "QmR2UYZczmYa4s8mr9HZHci5AQwyAnwUW7tSUZz7KWF3sA"
},
	"3": {
	key: "3",
	name: "Ethereum Testnet Ropsten",
	shortName: "Ropsten",
	chainId: 3,
	network: "ropsten",
	testnet: true,
	multicall: "0x53c43764255c17bd724f74c4ef150724ac50a3ed",
	rpc: [
		"https://eth-ropsten.alchemyapi.io/v2/QzGz6gdkpTyDzebi3PjxIaKO7bDTGnSy"
	],
	explorer: "https://ropsten.etherscan.io",
	start: 7980811,
	imageIPFS: "QmR2UYZczmYa4s8mr9HZHci5AQwyAnwUW7tSUZz7KWF3sA"
},
	"4": {
	key: "4",
	name: "Ethereum Testnet Rinkeby",
	shortName: "Rinkeby",
	chainId: 4,
	network: "rinkeby",
	testnet: true,
	multicall: "0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821",
	ensResolver: "0xf6305c19e814d2a75429fd637d01f7ee0e77d615",
	rpc: [
		"https://eth-rinkeby.alchemyapi.io/v2/ugiPEBqMebLQbjro42kalZ1h4StpW_fR",
		"https://eth-rinkeby.gateway.pokt.network/v1/5f76124fb90218002e9ce985"
	],
	ws: [
		"wss://eth-rinkeby.ws.alchemyapi.io/v2/twReQE9Px03E-E_N_Fbb3OVF7YgHxoGq"
	],
	explorer: "https://rinkeby.etherscan.io",
	start: 4534725,
	imageIPFS: "QmR2UYZczmYa4s8mr9HZHci5AQwyAnwUW7tSUZz7KWF3sA"
},
	"5": {
	key: "5",
	name: "Ethereum Testnet Görli",
	shortName: "Görli",
	chainId: 5,
	network: "goerli",
	testnet: true,
	multicall: "0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e",
	rpc: [
		"https://eth-goerli.alchemyapi.io/v2/v4nqH_J-J3STit45Mm07TxuYexMHQsYZ"
	],
	explorer: "https://goerli.etherscan.io",
	start: 743550,
	imageIPFS: "QmR2UYZczmYa4s8mr9HZHci5AQwyAnwUW7tSUZz7KWF3sA"
},
	"7": {
	key: "7",
	name: "ThaiChain",
	chainId: 7,
	network: "mainnet",
	multicall: "0xB9cb900E526e7Ad32A2f26f1fF6Dee63350fcDc5",
	rpc: [
		"https://rpc.dome.cloud"
	],
	ws: [
		"wss://ws.dome.cloud"
	],
	explorer: "https://exp.tch.in.th",
	imageIPFS: "QmUcNN6ZMFEPLUw5WCknisSgs7nhWC5p992jSSsJVq34Eo"
},
	"8": {
	key: "8",
	name: "Ubiq Mainnet",
	chainId: 8,
	network: "Ubiq mainnet",
	multicall: "0x6668750957e4083725926B71C41bDF1434C73262",
	rpc: [
		"https://rpc.octano.dev"
	],
	ws: [
		"wss://ws.octano.dev"
	],
	explorer: "https://ubiqscan.io",
	imageIPFS: "Qmec3HLoN4QhwZAhw4XTi2aN8Wwmcko5hHN22sHARzb9tw"
},
	"10": {
	key: "10",
	name: "Optimism Mainnet",
	chainId: 10,
	network: "Optimism mainnet",
	multicall: "0x35A6Cdb2C9AD4a45112df4a04147EB07dFA01aB7",
	rpc: [
		"https://opt-mainnet.g.alchemy.com/v2/JzmIL4Q3jBj7it2duxLFeuCa9Wobmm7D"
	],
	explorer: "https://optimistic.etherscan.io",
	start: 657806,
	imageIPFS: "QmfF4kwhGL8QosUXvgq2KWCmavhKBvwD6kbhs7L4p5ZAWb"
},
	"20": {
	key: "20",
	name: "Elastos Smart Chain",
	shortName: "ESC",
	chainId: 20,
	network: "mainnet",
	multicall: "0x20205D3b6008bea1411bd4CaEA2D923FE231B6E5",
	rpc: [
		"https://rpc.glidefinance.io",
		"https://escrpc.elaphant.app"
	],
	explorer: "https://esc.elastos.io",
	start: 7826070,
	imageIPFS: "Qmd2muU2UHo5WsTxE9EpZZJeatimTT9GD4sEnHQe6i9wiA"
},
	"25": {
	key: "25",
	name: "Cronos Mainnet",
	shortName: "Cronos",
	chainId: 25,
	network: "mainnet",
	multicall: "0x6F522a3982e8F9A50A2EDc9E46ed1A3aE2B3FD3a",
	rpc: [
		"https://evm-cronos.crypto.org"
	],
	explorer: "https://cronos.crypto.org/explorer",
	start: 4067,
	imageIPFS: "QmfSJbtirJoa3Pt7o5Fdm85wbyw9V1hpzqLr5PQbdnfsAj"
},
	"30": {
	key: "30",
	name: "RSK Mainnet",
	chainId: 30,
	network: "rsk mainnet",
	multicall: "0x4eeebb5580769ba6d26bfd07be636300076d1831",
	rpc: [
		"https://public-node.rsk.co"
	],
	explorer: "https://explorer.rsk.co",
	start: 2516442,
	imageIPFS: "QmXTwpE1SqoNZmyY4c3fYWy6qUgQELsyWKbgJo2Pg6K6V9"
},
	"31": {
	key: "31",
	name: "RSK Testnet",
	chainId: 31,
	network: "rsk testnet",
	testnet: true,
	multicall: "0x4eeebb5580769ba6d26bfd07be636300076d1831",
	rpc: [
		"https://public-node.testnet.rsk.co"
	],
	explorer: "https://explorer.testnet.rsk.co",
	start: 1002369,
	imageIPFS: "QmbpnJowePd9sDy8hrJv7LsTBkxksuJauw56Y7BqdMdzec"
},
	"42": {
	key: "42",
	name: "Ethereum Testnet Kovan",
	shortName: "Kovan",
	chainId: 42,
	network: "kovan",
	testnet: true,
	multicall: "0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a",
	rpc: [
		"https://eth-kovan.alchemyapi.io/v2/sR9qngOH3w78GAaTtlTe8GwEnij0SnEa",
		"https://speedy-nodes-nyc.moralis.io/b9aed21e7bb7bdeb35972c9a/eth/kovan/archive",
		"https://eth-kovan.alchemyapi.io/v2/s96TIUFYg0LuddgpmafA040ZyUaZbrpM",
		"https://poa-kovan.gateway.pokt.network/v1/5f76124fb90218002e9ce985"
	],
	ws: [
		"wss://eth-kovan.ws.alchemyapi.io/v2/QCsM2iU0bQ49eGDmZ7-Y--Wpu0lVWXSO"
	],
	explorer: "https://kovan.etherscan.io",
	start: 11482433,
	imageIPFS: "QmR2UYZczmYa4s8mr9HZHci5AQwyAnwUW7tSUZz7KWF3sA"
},
	"44": {
	key: "44",
	name: "Crab Network",
	shortName: "Crab",
	chainId: 44,
	network: "mainnet",
	multicall: "0x4617D470F847Ce166019d19a7944049ebB017400",
	rpc: [
		"https://crab-rpc.darwinia.network"
	],
	explorer: "https://crab.subscan.io",
	imageIPFS: "QmTpySsG7rjLwuZX1Ep4ewGyVAyGrvCRC1oqEvU6oP1huf"
},
	"50": {
	key: "50",
	name: "XDC.Network",
	shortName: "XDC",
	chainId: 50,
	network: "mainnet",
	multicall: "0xc8160deb19559d93eadb82798ededce696ebcaf5",
	rpc: [
		"https://snapshotrpc.blocksscan.io/"
	],
	ws: [
		"wss://ws.blocksscan.io"
	],
	explorer: "http://xdc.blocksscan.io",
	imageIPFS: "QmaX3pqjWGg97bR6jjxvTopRkJVxrvwp6VB4jf1Lknq111"
},
	"51": {
	key: "51",
	name: "XDC Apothem.network",
	shortName: "XDC",
	chainId: 51,
	network: "testnet",
	multicall: "0x3b353b02a8b42ee4222ea4be0836629b1f40c8db",
	rpc: [
		"https://apothemrpc.blocksscan.io"
	],
	ws: [
		"wss://apothemws.blocksscan.io"
	],
	explorer: "http://apothem.blocksscan.io",
	imageIPFS: "QmaX3pqjWGg97bR6jjxvTopRkJVxrvwp6VB4jf1Lknq111"
},
	"56": {
	key: "56",
	name: "Binance Smart Chain Mainnet",
	shortName: "BSC",
	chainId: 56,
	network: "mainnet",
	multicall: "0x1ee38d535d541c55c9dae27b12edf090c608e6fb",
	rpc: [
		"https://apis.ankr.com/c0d871dd3c6d4529b01c9362a9b79e89/6106d4a3ec1d1bcc87ec72158f8fd089/binance/archive/main",
		"https://speedy-nodes-nyc.moralis.io/b9aed21e7bb7bdeb35972c9a/bsc/mainnet/archive",
		"https://bsc.getblock.io/mainnet/?api_key=91f8195f-bf46-488f-846a-73d6853790e7",
		"https://bsc-private-dataseed1.nariox.org",
		"https://bsc-private-dataseed2.nariox.org",
		"https://bsc-dataseed1.ninicoin.io",
		"https://bsc-dataseed1.binance.org",
		"https://bsc-dataseed2.binance.org",
		"https://bsc-dataseed3.binance.org"
	],
	explorer: "https://bscscan.com",
	start: 461230,
	imageIPFS: "QmWQaQ4Tv28DwA4DRKjSDJFWY9mZboGvuu77J8nh7kucxv"
},
	"61": {
	key: "61",
	name: "Ethereum Classic Mainnet",
	shortName: "Ethereum Classic",
	chainId: 61,
	network: "mainnet",
	multicall: "",
	rpc: [
		"https://ethereumclassic.network"
	],
	explorer: "https://blockscout.com/etc/mainnet",
	imageIPFS: "QmVegc28DvA7LjKUFysab81c9BSuN4wQVDQkRXyAtuEBis"
},
	"65": {
	key: "65",
	name: "OKExChain Testnet",
	shortName: "OEC Testnet",
	chainId: 65,
	network: "oec testnet",
	testnet: true,
	multicall: "0x04c68A7fB750ca0Ba232105B3b094926a0f77645",
	rpc: [
		"https://exchaintestrpc.okex.org"
	],
	ws: [
		"wss://exchaintestws.okex.org:8443"
	],
	explorer: "https://www.oklink.com/okexchain-test",
	start: 5320359,
	imageIPFS: "Qmd7dKnNwHRZ4HRCbCXUbkNV7gP28fGqPdjbHtjRtT9sQF"
},
	"66": {
	key: "66",
	name: "OKExChain Mainnet",
	shortName: "OEC Mainnet",
	chainId: 66,
	network: "oec mainnet",
	multicall: "0x6EB187d8197Ac265c945b69f3c3064A6f3831866",
	rpc: [
		"https://exchainrpc.okex.org"
	],
	ws: [
		"wss://exchainws.okex.org:8443"
	],
	explorer: "https://www.oklink.com/okexchain",
	start: 5076543,
	imageIPFS: "Qmd7dKnNwHRZ4HRCbCXUbkNV7gP28fGqPdjbHtjRtT9sQF"
},
	"69": {
	key: "69",
	name: "Optimism Kovan",
	chainId: 69,
	network: "Optimism testnet",
	testnet: true,
	multicall: "0x28e9a2329aa6b675ca251a2ccaa7fb029c1e9bfb",
	rpc: [
		"https://opt-kovan.g.alchemy.com/v2/JzmIL4Q3jBj7it2duxLFeuCa9Wobmm7D"
	],
	explorer: "https://kovan-optimistic.etherscan.io",
	start: 882942,
	imageIPFS: "QmfF4kwhGL8QosUXvgq2KWCmavhKBvwD6kbhs7L4p5ZAWb"
},
	"70": {
	key: "70",
	name: "Hoo Smart Chain Mainnet",
	shortName: "hsc",
	chainId: 70,
	network: "Mainnet",
	multicall: "0xd4b794b89baccb70ef851830099bee4d69f19ebc",
	rpc: [
		"https://http-mainnet2.hoosmartchain.com"
	],
	ws: [
		"wss://ws-mainnet2.hoosmartchain.com"
	],
	explorer: "https://hooscan.com",
	start: 404118,
	imageIPFS: "QmNhFCVw5GDsu86sGchoRNvQjcr5GL79UJQ3xCHzdFbZYk"
},
	"74": {
	key: "74",
	name: "IDChain",
	shortName: "IDChain",
	chainId: 74,
	network: "mainnet",
	multicall: "0x41d289c966D51342A515A19dE9c27d16079c94E0",
	rpc: [
		"https://idchain.one/archive/rpc/",
		"https://idchain.songadao.org/rpc"
	],
	explorer: "https://explorer.idchain.one",
	start: 10780012,
	imageIPFS: "QmXAKaNsyv6ctuRenYRJuZ1V4kn1eFwkUtjrjzX6jiKTqe"
},
	"80": {
	key: "80",
	name: "GeneChain",
	chainId: 80,
	network: "Mainnet",
	multicall: "0x9e6ed491171A0D9089892aA5F14800f9f32038eb",
	rpc: [
		"https://rpc.genechain.io"
	],
	explorer: "https://scan.genechain.io",
	imageIPFS: "QmSV3LTGzE4159zLK4xJVDH5t8iKhY4peh7VAkjefawr2q"
},
	"81": {
	key: "81",
	name: "Shibuya Network",
	shortName: "Shibuya",
	chainId: 81,
	network: "testnet",
	testnet: true,
	multicall: "0x3E90A35839ff0Aa32992d33d861f24dC95BBf74d",
	rpc: [
		"https://rpc.shibuya.astar.network:8545"
	],
	explorer: "https://blockscout.com/shibuya",
	start: 856303,
	imageIPFS: "QmZLQVsUqHBDXutu6ywTvcYXDZG2xBstMfHkfJSzUNpZsc"
},
	"82": {
	key: "82",
	name: "Meter Mainnet",
	shortName: "Meter",
	chainId: 82,
	network: "mainnet",
	multicall: "0x579De77CAEd0614e3b158cb738fcD5131B9719Ae",
	rpc: [
		"https://rpc.meter.io"
	],
	explorer: "https://scan.meter.io",
	start: 4992871,
	imageIPFS: "QmSZvT9w9eUDvV1YVaq3BKKEbubtNVqu1Rin44FuN4wz11"
},
	"97": {
	key: "97",
	name: "Binance Smart Chain Testnet",
	shortName: "BSC Testnet",
	chainId: 97,
	network: "testnet",
	testnet: true,
	multicall: "0x8b54247c6BAe96A6ccAFa468ebae96c4D7445e46",
	rpc: [
		"https://speedy-nodes-nyc.moralis.io/f2963e29bec0de5787da3164/bsc/testnet/archive",
		"https://data-seed-prebsc-1-s1.binance.org:8545"
	],
	explorer: "https://testnet.bscscan.com",
	start: 3599656,
	imageIPFS: "QmWQaQ4Tv28DwA4DRKjSDJFWY9mZboGvuu77J8nh7kucxv"
},
	"99": {
	key: "99",
	name: "POA Core",
	shortName: "POA",
	chainId: 99,
	network: "mainnet",
	multicall: "0x2754BB10580dFc6d8Ce6d6CA2939021A06923394",
	rpc: [
		"https://core.poa.network"
	],
	explorer: "https://blockscout.com/poa/core",
	start: 22543252,
	imageIPFS: "QmZNFCQGA7qT4XJnPSH5NNYrqK6aFsfzZ1NzJwp5D4Tdjr"
},
	"100": {
	key: "100",
	name: "Gnosis Chain",
	shortName: "xDAI",
	chainId: 100,
	network: "mainnet",
	multicall: "0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a",
	rpc: [
		"https://xdai-archive.blockscout.com",
		"https://poa-xdai.gateway.pokt.network/v1/5f76124fb90218002e9ce985",
		"https://rpc.gnosischain.com"
	],
	ws: [
		"wss://rpc.xdaichain.com/wss"
	],
	explorer: "https://blockscout.com/poa/xdai",
	start: 4108192,
	imageIPFS: "QmZeiy8Ax4133wzxUQM9ky8z5XFVf6YLFjJMmTWbWVniZR"
},
	"106": {
	key: "106",
	name: "Velas EVM Mainnet",
	shortName: "Velas",
	chainId: 106,
	network: "mainnet",
	multicall: "0x597Cc7c49a8e0041d3A43ec8D7dc651b47879108",
	rpc: [
		"https://evmexplorer.velas.com/rpc",
		"https://explorer.velas.com/rpc"
	],
	ws: [
		"wss://api.velas.com"
	],
	explorer: "https://evmexplorer.velas.com",
	start: 141800,
	imageIPFS: "QmNXiCXJxEeBd7ZYGYjPSMTSdbDd2nfodLC677gUfk9ku5"
},
	"108": {
	key: "108",
	name: "Thundercore Mainnet",
	chainId: 108,
	network: "mainnet",
	multicall: "",
	rpc: [
		"https://mainnet-rpc.thundercore.com"
	],
	explorer: "https://scan.thundercore.com",
	imageIPFS: "QmbEsmMPZALcfvNnGDg8F2ABCJM3T2UFBiVBaRsMdkjefG"
},
	"111": {
	key: "111",
	name: "Velas EVM Testnet",
	shortName: "Velas Testnet",
	chainId: 111,
	network: "testnet",
	testnet: true,
	multicall: "0x55a827538FbF41b7334Dd49001220597898Ad954",
	rpc: [
		"https://evmexplorer.testnet.velas.com/rpc",
		"https://explorer.testnet.velas.com/rpc"
	],
	ws: [
		"wss://api.testnet.velas.com"
	],
	explorer: "https://evmexplorer.testnet.velas.com",
	start: 1195129,
	imageIPFS: "QmQFWn7JJLigUPvvp6uKg6EWikx7QeNxQ2vaCngU3Uthho"
},
	"122": {
	key: "122",
	name: "Fuse Mainnet",
	shortName: "Fuse",
	chainId: 122,
	network: "mainnet",
	multicall: "0x7a59441fb06666F6d2D766393d876945D06a169c",
	rpc: [
		"https://oefusefull1.liquify.info/"
	],
	explorer: "https://explorer.fuse.io",
	start: 11923459,
	imageIPFS: "QmXjWb64nako7voaVEifgdjAbDbswpTY8bghsiHpv8yWtb"
},
	"128": {
	key: "128",
	name: "Huobi Eco Chain Mainnet",
	shortName: "heco",
	chainId: 128,
	network: "Mainnet",
	multicall: "0x37ab26db3df780e7026f3e767f65efb739f48d8e",
	rpc: [
		"https://pub001.hg.network/rpc"
	],
	ws: [
		"wss://pub001.hg.network/ws"
	],
	explorer: "https://hecoinfo.com",
	start: 403225,
	imageIPFS: "QmSJEdToMvmjqoPvVq7awwdMeYKhXUYZMBiax9yHtFGMSq"
},
	"137": {
	key: "137",
	name: "Polygon Mainnet",
	shortName: "Polygon",
	chainId: 137,
	network: "mainnet",
	multicall: "0xCBca837161be50EfA5925bB9Cc77406468e76751",
	rpc: [
		"https://speedy-nodes-nyc.moralis.io/f2963e29bec0de5787da3164/polygon/mainnet/archive",
		"https://rpc-mainnet.maticvigil.com/v1/1cfd7598e5ba6dcf0b4db58e8be484badc6ea08e",
		"https://speedy-nodes-nyc.moralis.io/b9aed21e7bb7bdeb35972c9a/polygon/mainnet/archive"
	],
	ws: [
		"wss://ws-mainnet.matic.network"
	],
	explorer: "https://polygonscan.com",
	start: 9834491,
	imageIPFS: "QmaGokGqgjknfa4xnXKnnwC5ZyXzUjQ7p6KEe4D8G5uFFE"
},
	"246": {
	key: "246",
	name: "Energy Web Chain",
	shortName: "EWC",
	chainId: 246,
	network: "mainnet",
	multicall: "0x0767F26d0D568aB61A98b279C0b28a4164A6f05e",
	rpc: [
		"https://voting-rpc.carbonswap.exchange"
	],
	explorer: "https://explorer.energyweb.org",
	start: 12086501,
	imageIPFS: "Qmai7AGHgs8NpeGeXgbMZz7pS2i4kw44qubCJYGrZW2f3a"
},
	"250": {
	key: "250",
	name: "Fantom Opera",
	shortName: "fantom",
	chainId: 250,
	network: "Mainnet",
	multicall: "0x7f6A10218264a22B4309F3896745687E712962a0",
	rpc: [
		"https://rpc.ftm.tools",
		"https://rpcapi.fantom.network"
	],
	explorer: "https://ftmscan.com",
	start: 2497732,
	imageIPFS: "QmVEgNeQDKnXygeGxfY9FywZpNGQu98ktZtRJ9bToYF6g7"
},
	"256": {
	key: "256",
	name: "Huobi Eco Chain Testnet",
	shortName: "heco",
	chainId: 256,
	network: "testnet",
	testnet: true,
	multicall: "0xC33994Eb943c61a8a59a918E2de65e03e4e385E0",
	rpc: [
		"https://http-testnet.hecochain.com"
	],
	ws: [
		"wss://ws-testnet.hecochain.com"
	],
	explorer: "https://testnet.hecoinfo.com",
	start: 379560,
	imageIPFS: "QmSJEdToMvmjqoPvVq7awwdMeYKhXUYZMBiax9yHtFGMSq"
},
	"269": {
	key: "269",
	name: "High Performance Blockchain Mainnet",
	shortName: "HPB",
	chainId: 269,
	network: "mainnet",
	testnet: false,
	multicall: "0x67D0f263aef2F6167FA77353695D75b582Ff4Bca",
	rpc: [
		"https://hpbnode.com"
	],
	ws: [
		"wss://ws.hpbnode.com"
	],
	explorer: "https://hscan.org",
	start: 13960096,
	imageIPFS: "QmU7f1MyRz8rLELFfypnWZQjGbDGYgZtC9rjw47jYMYrnu"
},
	"288": {
	key: "288",
	name: "Boba Mainnet",
	shortName: "Boba",
	chainId: 288,
	network: "mainnet",
	multicall: "0xfb91c019D9F12A0f9c23B4762fa64A34F8daDb4A",
	rpc: [
		"https://mainnet.boba.network/"
	],
	explorer: "https://blockexplorer.boba.network",
	start: 74,
	imageIPFS: "QmNc7QZFpPDue3Ef4SsuX55RHkqXxUxSyTCpoASeg2hW6d"
},
	"321": {
	key: "321",
	name: "KCC Mainnet",
	shortName: "KCC",
	chainId: 321,
	network: "mainnet",
	multicall: "0xa64D6AFb48225BDA3259246cfb418c0b91de6D7a",
	rpc: [
		"https://rpc-mainnet.kcc.network"
	],
	ws: [
		"wss://rpc-ws-mainnet.kcc.network"
	],
	explorer: "https://explorer.kcc.io",
	start: 1487453,
	imageIPFS: "QmRdzYGhFRG8QLzMJahHrw3vETE2YZ9sywQbEkenSjKEvb"
},
	"336": {
	key: "336",
	name: "Shiden Network",
	shortName: "Shiden",
	chainId: 336,
	network: "mainnet",
	multicall: "0x3E90A35839ff0Aa32992d33d861f24dC95BBf74d",
	rpc: [
		"https://rpc.shiden.astar.network:8545",
		"https://shiden.api.onfinality.io/public"
	],
	explorer: "https://blockscout.com/shiden",
	start: 1170016,
	imageIPFS: "QmcqGQE4Sk73zXc3e91TUFFefKBVeaNgbxV141XkSNE4xj"
},
	"361": {
	key: "361",
	name: "Theta Mainnet",
	shortName: "Theta",
	chainId: 361,
	network: "mainnet",
	multicall: "0xB48BbAD564Ceb6fB30cCea2Af248ccF6398aEab5",
	rpc: [
		"https://eth-rpc-api.thetatoken.org/rpc"
	],
	explorer: "https://explorer.thetatoken.org",
	start: 12559216,
	imageIPFS: "QmcMP9s9mUqfT2SCiP75sZgAVVev7H7RQAKiSx9xWEDKwe"
},
	"499": {
	key: "499",
	name: "Rupaya",
	shortName: "RUPX",
	chainId: 499,
	network: "mainnet",
	multicall: "0x7955FF653FfDBf13056FeAe227f655CfF5C194D5",
	rpc: [
		"https://rpc.rupx.io"
	],
	ws: [
		"wss://ws.rupx.io"
	],
	explorer: "http://scan.rupx.io",
	start: 2762929,
	imageIPFS: "QmXLZyAr6UNFQ4tkNwSyeNByFvzwYpwiNgV5vHuoxn74Rg"
},
	"592": {
	key: "592",
	name: "Astar Network",
	shortName: "Astar",
	chainId: 592,
	network: "mainnet",
	multicall: "0x3E90A35839ff0Aa32992d33d861f24dC95BBf74d",
	rpc: [
		"https://rpc.astar.network:8545",
		"https://astar.api.onfinality.io/public"
	],
	explorer: "https://blockscout.com/astar",
	start: 366482,
	imageIPFS: "QmZLQVsUqHBDXutu6ywTvcYXDZG2xBstMfHkfJSzUNpZsc"
},
	"888": {
	key: "888",
	name: "Wanchain",
	chainId: 888,
	network: "mainnet",
	multicall: "0xba5934ab3056fca1fa458d30fbb3810c3eb5145f",
	rpc: [
		"https://gwan-ssl.wandevs.org:56891"
	],
	ws: [
		"wss://api.wanchain.org:8443/ws/v3/ddd16770c68f30350a21114802d5418eafe039b722de52b488e7eee1ee2cd73f"
	],
	explorer: "https://www.wanscan.org",
	start: 11302663,
	imageIPFS: "QmewFFN44rkxESFsHG8edaLt1znr62hjvZhGynfXqruzX3"
},
	"940": {
	key: "940",
	name: "PulseChain Testnet",
	shortName: "pulsechain",
	chainId: 940,
	network: "Testnet",
	multicall: "0x5e67901C2Dd1915E9Ef49aF39B62C28DF8C2c529",
	rpc: [
		"https://rpc.testnet.pulsedisco.net"
	],
	ws: [
		"wss://ws.rpc.testnet.pulsedisco.net"
	],
	explorer: "https://scan.v2.testnet.pulsechain.com",
	start: 15123138,
	imageIPFS: "QmYqkn8pJUaV9KcEPYEvRPwgbfeozLEvcQ9aEwKNRUL3cR"
},
	"1088": {
	key: "1088",
	name: "Metis",
	shortName: "metis",
	chainId: 1088,
	network: "mainnet",
	multicall: "0xc39aBB6c4451089dE48Cffb013c39d3110530e5C",
	rpc: [
		"https://andromeda.metis.io/?owner=1088"
	],
	explorer: "https://andromeda-explorer.metis.io",
	start: 451,
	imageIPFS: "QmYeskHqrEvWHqeAuqett64LxfH52HUXZi2T9BAMmgKvBF"
},
	"1284": {
	key: "1284",
	name: "Moonbeam",
	shortName: "GLMR",
	chainId: 1284,
	network: "mainnet",
	multicall: "0x83e3b61886770de2F64AAcaD2724ED4f08F7f36B",
	rpc: [
		"https://rpc.api.moonbeam.network"
	],
	explorer: "https://blockscout.moonbeam.network",
	start: 171135,
	imageIPFS: "QmWKTEK2pj5sBBbHnMHQbWgw6euVdBrk2Ligpi2chrWASk"
},
	"1285": {
	key: "1285",
	name: "Moonriver (Kusama)",
	shortName: "Moonriver",
	chainId: 1285,
	network: "mainnet",
	multicall: "0x537004440ffFE1D4AE9F009031Fc2b0385FCA9F1",
	rpc: [
		"https://rpc.api.moonriver.moonbeam.network"
	],
	explorer: "https://blockscout.moonriver.moonbeam.network",
	start: 413539,
	imageIPFS: "QmXtgPesL87Ejhq2Y7yxsaPYpf4RcnoTYPJWPcv6iiYhoi"
},
	"1287": {
	key: "1287",
	name: "Moonbase Alpha TestNet",
	shortName: "Moonbase",
	chainId: 1287,
	network: "testnet",
	testnet: true,
	multicall: "0xf09FD6B6FF3f41614b9d6be2166A0D07045A3A97",
	rpc: [
		"https://rpc.testnet.moonbeam.network"
	],
	explorer: "https://moonbase-blockscout.testnet.moonbeam.network",
	start: 859041,
	imageIPFS: "QmeGbNTU2Jqwg8qLTMGW8n8HSi2VdgCncAaeGzLx6gYnD7"
},
	"4689": {
	key: "4689",
	name: "IoTeX Mainnet",
	shortName: "IoTeX",
	chainId: 4689,
	network: "mainnet",
	multicall: "0x9c8B105c94282CDB0F3ecF27e3cfA96A35c07be6",
	rpc: [
		"https://babel-api.mainnet.iotex.io"
	],
	explorer: "https://iotexscan.io",
	start: 11533283,
	imageIPFS: "QmNkr1UPcBYbvLp7d7Pk4eF3YCsHpaNkfusKZNtykL2EQC"
},
	"4690": {
	key: "4690",
	name: "IoTeX Testnet",
	shortName: "IoTeX",
	chainId: 4690,
	network: "testnet",
	testnet: true,
	multicall: "0x30aE8783d26aBE7Fbb9d83549CCb7430AE4A301F",
	rpc: [
		"https://babel-api.testnet.iotex.io"
	],
	explorer: "https://testnet.iotexscan.io",
	start: 8821493,
	imageIPFS: "QmNkr1UPcBYbvLp7d7Pk4eF3YCsHpaNkfusKZNtykL2EQC"
},
	"5551": {
	key: "5551",
	name: "Nahmii Mainnet",
	shortName: "Nahmii",
	chainId: 5551,
	network: "mainnet",
	multicall: "0x05911151467b9F42eD14f10ddE0c057347Fff714",
	rpc: [
		"https://l2.nahmii.io"
	],
	explorer: "https://explorer.nahmii.io",
	start: 4364,
	imageIPFS: "QmPXPCBho3kGLt5rhG9JGkKmzdtLvqZmJqGzzijVCuggWY"
},
	"5553": {
	key: "5553",
	name: "Nahmii Testnet",
	shortName: "Nahmii",
	chainId: 5553,
	network: "testnet",
	testnet: true,
	multicall: "0x0e157d2E45af27564edFAaCcD68f2f0458F3D96c",
	rpc: [
		"https://l2.testnet.nahmii.io"
	],
	explorer: "https://explorer.testnet.nahmii.io",
	start: 53370,
	imageIPFS: "QmPXPCBho3kGLt5rhG9JGkKmzdtLvqZmJqGzzijVCuggWY"
},
	"7341": {
	key: "7341",
	name: "Shyft",
	shortName: "Shyft",
	chainId: 7341,
	network: "mainnet",
	testnet: false,
	multicall: "0xceb10e9133D771cA93c8002Be527A465E85381a2",
	rpc: [
		"https://rpc.shyft.network"
	],
	explorer: "https://bx.shyft.network",
	start: 3673983,
	imageIPFS: "QmUkFZC2ZmoYPTKf7AHdjwRPZoV2h1MCuHaGM4iu8SNFpi"
},
	"10000": {
	key: "10000",
	name: "smartBCH",
	shortName: "BCH",
	chainId: 10000,
	network: "mainnet",
	multicall: "0x1b38EBAd553f218e2962Cb1C0539Abb5d6A37774",
	rpc: [
		"https://smartbch.greyh.at/"
	],
	explorer: "https://www.smartscan.cash",
	imageIPFS: "QmWG1p7om4hZ4Yi4uQvDpxg4si7qVYhtppGbcDGrhVFvMd"
},
	"11437": {
	key: "11437",
	name: "Shyft Testnet",
	shortName: "Shyft_",
	chainId: 11437,
	network: "testnet",
	testnet: true,
	multicall: "0x407159bAA564dA0c3b14D1215d8E2654cEEE73F4",
	rpc: [
		"https://rpc.testnet.shyft.network"
	],
	explorer: "https://bx.testnet.shyft.network",
	start: 2446296,
	imageIPFS: "QmUkFZC2ZmoYPTKf7AHdjwRPZoV2h1MCuHaGM4iu8SNFpi"
},
	"32659": {
	key: "32659",
	name: "Fusion Mainnet",
	chainId: 32659,
	network: "mainnet",
	multicall: "",
	rpc: [
		"https://vote.anyswap.exchange/mainnet"
	],
	ws: [
		"wss://mainnetpublicgateway1.fusionnetwork.io:10001"
	],
	explorer: "https://fsnex.com",
	imageIPFS: "QmRb6YCGdpQTQcdNTnBb5DUixGpjDp1wz6zoADJwQ7hyFq"
},
	"42161": {
	key: "42161",
	name: "Arbitrum One",
	chainId: 42161,
	network: "Arbitrum mainnet",
	multicall: "0x7A7443F8c577d537f1d8cD4a629d40a3148Dd7ee",
	rpc: [
		"https://arb-mainnet.g.alchemy.com/v2/JDvtNGwnHhTltIwfnxQocKwKkCTKA1DL"
	],
	explorer: "https://arbiscan.io",
	start: 256508,
	imageIPFS: "QmWZ5SMRfvcK8tycsDqojQaSiKedgtVkS7CkZdxPgeCVsZ"
},
	"42220": {
	key: "42220",
	name: "Celo Mainnet",
	shortName: "Celo",
	chainId: 42220,
	network: "mainnet",
	multicall: "0xb8d0d2C1391eeB350d2Cd39EfABBaaEC297368D9",
	rpc: [
		"https://celo.snapshot.org",
		"https://forno.celo.org",
		"https://celo-mainnet--rpc.datahub.figment.io/apikey/e892a66dc36e4d2d98a5d6406d609796/"
	],
	explorer: "https://explorer.celo.org",
	start: 6599803,
	imageIPFS: "QmS2tVJ7rdJRe1NHXAi2L86yCbUwVVrmB2mHQeNdJxvQti"
},
	"42262": {
	key: "42262",
	name: "Emerald",
	shortName: "Emerald",
	chainId: 42262,
	network: "mainnet",
	multicall: "0xBD46A7DCD1fefA63A7746a5762A71635Ee0843A1",
	rpc: [
		"https://emerald.oasis.dev"
	],
	explorer: "https://explorer.emerald.oasis.dev",
	start: 176517,
	imageIPFS: "QmQrZjZZyAcQmPXJM2cUh1KaaDeM8Sfcg3HnvZpBj8wTnG"
},
	"43114": {
	key: "43114",
	name: "Avalanche",
	chainId: 43114,
	network: "mainnet",
	multicall: "0x7E9985aE4C8248fdB07607648406a48C76e9e7eD",
	rpc: [
		"https://nd-784-543-849.p2pify.com/aa7b29fc5fed65b34f0ee6b8de33f8c0/ext/bc/C/rpc",
		"https://rpc.ankr.com/avalanche",
		"https://api.avax.network/ext/bc/C/rpc"
	],
	explorer: "https://snowtrace.io",
	start: 536483,
	imageIPFS: "QmeS75uS7XLR8o8uUzhLRVYPX9vMFf4DXgKxQeCzyy7vM2"
},
	"80001": {
	key: "80001",
	name: "Matic Mumbai",
	chainId: 80001,
	network: "testnet",
	testnet: true,
	multicall: "0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc",
	rpc: [
		"https://speedy-nodes-nyc.moralis.io/f2963e29bec0de5787da3164/polygon/mumbai/archive",
		"https://rpc-mumbai.matic.today"
	],
	ws: [
		"wss://ws-mumbai.matic.today"
	],
	explorer: "https://mumbai.polygonscan.com",
	start: 12011090,
	imageIPFS: "QmaGokGqgjknfa4xnXKnnwC5ZyXzUjQ7p6KEe4D8G5uFFE"
},
	"333888": {
	key: "333888",
	name: "Polis Sparta",
	shortName: "Sparta",
	chainId: 333888,
	network: "testnet",
	testnet: true,
	multicall: "0xA4c03972023d5f684d35eF1C541752490975383e",
	rpc: [
		"https://sparta-rpc.polis.tech"
	],
	explorer: "https://sparta-explorer.polis.tech",
	imageIPFS: "QmSiCni2Jn58WN74SyGNY1Aw5mSh9ypEfFULhjKxA7Tbpg"
},
	"333999": {
	key: "333999",
	name: "Polis Olympus",
	shortName: "Olympus",
	chainId: 333999,
	network: "mainnet",
	multicall: "0x34b99C2a4a4620F10ac779c36b8c61F90FD61732",
	rpc: [
		"https://rpc.polis.tech"
	],
	explorer: "https://explorer.polis.tech",
	start: 1971,
	imageIPFS: "QmSiCni2Jn58WN74SyGNY1Aw5mSh9ypEfFULhjKxA7Tbpg"
},
	"1313161554": {
	key: "1313161554",
	name: "Aurora Mainnet",
	shortName: "Aurora",
	chainId: 1313161554,
	network: "mainnet",
	multicall: "0x32b50c286DEFd2932a0247b8bb940b78c063F16c",
	rpc: [
		"https://mainnet.aurora.dev"
	],
	explorer: "https://explorer.mainnet.aurora.dev",
	start: 57190533,
	imageIPFS: "QmeRhsR1UPRTQCizdhmgr2XxphXebVKU5di97uCV2UMFpa"
},
	"1666600000": {
	key: "1666600000",
	name: "Harmony Mainnet",
	shortName: "HarmonyMainnet",
	chainId: 1666600000,
	network: "mainnet",
	multicall: "0x9c31392D2e0229dC4Aa250F043d46B9E82074BF8",
	rpc: [
		"https://a.api.s0.t.hmny.io"
	],
	ws: [
		"wss://ws.s0.t.hmny.io"
	],
	explorer: "https://explorer.harmony.one",
	start: 10911984,
	imageIPFS: "QmNnGPr1CNvj12SSGzKARtUHv9FyEfE5nES73U4vBWQSJL"
},
	"1666700000": {
	key: "1666700000",
	name: "Harmony Testnet",
	shortName: "HarmonyTestnet",
	chainId: 1666700000,
	network: "testnet",
	testnet: true,
	multicall: "0x9923589503Fd205feE3d367DDFF2378f0F7dD2d4",
	rpc: [
		"https://api.s0.b.hmny.io"
	],
	ws: [
		"wss://ws.s0.b.hmny.io"
	],
	explorer: "https://explorer.pops.one",
	start: 7521509,
	imageIPFS: "QmNnGPr1CNvj12SSGzKARtUHv9FyEfE5nES73U4vBWQSJL"
},
	"11297108109": {
	key: "11297108109",
	name: "Palm Mainnet",
	shortName: "Palm",
	chainId: 11297108109,
	network: "mainnet",
	multicall: "0xfFE2FF36c5b8D948f788a34f867784828aa7415D",
	rpc: [
		"https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b"
	],
	explorer: "https://explorer.palm.io",
	start: 1172267,
	imageIPFS: "QmaYQfjLfQpyRWZZZU1BE8X352rXEjNaNeahjvf1aHZrKY"
}
};

var providers = {};
function getProvider(network) {
    var url = networks[network].rpc[0];
    var connectionInfo = typeof url === 'object' ? __assign(__assign({}, url), { timeout: 25000 }) : { url: url, timeout: 25000 };
    if (!providers[network])
        providers[network] = new providers$1.StaticJsonRpcProvider(connectionInfo);
    return providers[network];
}

function validate$2(author, space, proposal, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var strategies, onlyMembers, minScore, members, scores, totalScore;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    strategies = options.strategies || space.strategies;
                    onlyMembers = options.onlyMembers || ((_a = space.filters) === null || _a === void 0 ? void 0 : _a.onlyMembers);
                    minScore = options.minScore || ((_b = space.filters) === null || _b === void 0 ? void 0 : _b.minScore);
                    members = (space.members || []).map(function (address) { return address.toLowerCase(); });
                    if (members.includes(author.toLowerCase()))
                        return [2 /*return*/, true];
                    if (onlyMembers)
                        return [2 /*return*/, false];
                    if (!minScore) return [3 /*break*/, 2];
                    return [4 /*yield*/, getScores(space.id || space.key, strategies, space.network, [author])];
                case 1:
                    scores = _c.sent();
                    totalScore = scores
                        .map(function (score) { return Object.values(score).reduce(function (a, b) { return a + b; }, 0); })
                        .reduce(function (a, b) { return a + b; }, 0);
                    if (totalScore < minScore)
                        return [2 /*return*/, false];
                    _c.label = 2;
                case 2: return [2 /*return*/, true];
            }
        });
    });
}

/**
 * Aave Space Validation proposal validation uses:
 *  - Proposition power of GovernanceStrategy contract
 *  - Other active Aave Snapshot voting strategies
 *
 * The current validation implementation mutates the "strategies" field of the space
 * to be able to use proposition power instead of voting power for "aave-governance-power".
 *
 */
function validate$1(author, space, proposal, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var onlyMembers, minScore, members, strategies, aaveGovernanceStrategyIndex, scores, totalScore;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    onlyMembers = options.onlyMembers || ((_a = space.filters) === null || _a === void 0 ? void 0 : _a.onlyMembers);
                    minScore = options.minScore || ((_b = space.filters) === null || _b === void 0 ? void 0 : _b.minScore);
                    members = (space.members || []).map(function (address) { return address.toLowerCase(); });
                    strategies = __spread(space.strategies);
                    aaveGovernanceStrategyIndex = strategies.findIndex(function (_a) {
                        var name = _a.name;
                        return name === 'aave-governance-power';
                    });
                    // Use the proposition power instead of voting power
                    if (aaveGovernanceStrategyIndex >= 0) {
                        strategies[aaveGovernanceStrategyIndex].params.powerType = 'proposition';
                    }
                    if (members.includes(author.toLowerCase()))
                        return [2 /*return*/, true];
                    if (onlyMembers)
                        return [2 /*return*/, false];
                    if (!minScore) return [3 /*break*/, 2];
                    return [4 /*yield*/, getScores(space.id || space.key, strategies, space.network, [author])];
                case 1:
                    scores = _c.sent();
                    totalScore = scores
                        .map(function (score) { return Object.values(score).reduce(function (a, b) { return a + b; }, 0); })
                        .reduce(function (a, b) { return a + b; }, 0);
                    if (totalScore < minScore)
                        return [2 /*return*/, false];
                    _c.label = 2;
                case 2: return [2 /*return*/, true];
            }
        });
    });
}

/**
 * Nouns Space Validation proposal validation uses:
 *
 * The current validation implementation mutates the "strategies" field of the space
 * to be able to use proposition power instead of voting power for "nouns-rfp-power".
 *
 */
function validate(author, space, proposal, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var onlyMembers, minScore, members, strategies, nounsRFPStrategyIndex, scores, totalScore;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    onlyMembers = options.onlyMembers || ((_a = space.filters) === null || _a === void 0 ? void 0 : _a.onlyMembers);
                    minScore = options.minScore || ((_b = space.filters) === null || _b === void 0 ? void 0 : _b.minScore);
                    members = (space.members || []).map(function (address) { return address.toLowerCase(); });
                    strategies = __spread(space.strategies);
                    nounsRFPStrategyIndex = strategies.findIndex(function (_a) {
                        var name = _a.name;
                        return name === 'nouns-rfp-power';
                    });
                    // Use the proposition power instead of the voting power
                    if (nounsRFPStrategyIndex >= 0) {
                        strategies[nounsRFPStrategyIndex].params.powerType = 'proposition';
                    }
                    if (members.includes(author.toLowerCase()))
                        return [2 /*return*/, true];
                    if (onlyMembers)
                        return [2 /*return*/, false];
                    if (!minScore) return [3 /*break*/, 2];
                    return [4 /*yield*/, getScores(space.id || space.key, strategies, space.network, [author])];
                case 1:
                    scores = _c.sent();
                    totalScore = scores
                        .map(function (score) { return Object.values(score).reduce(function (a, b) { return a + b; }, 0); })
                        .reduce(function (a, b) { return a + b; }, 0);
                    if (totalScore < minScore)
                        return [2 /*return*/, false];
                    _c.label = 2;
                case 2: return [2 /*return*/, true];
            }
        });
    });
}

var validations = {
    basic: validate$2,
    aave: validate$1,
    nouns: validate
};

function verifyDefault(address, sig, hash, provider) {
    return __awaiter(this, void 0, void 0, function () {
        var returnValue, magicValue, abi, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    magicValue = '0x1626ba7e';
                    abi = 'function isValidSignature(bytes32 _hash, bytes memory _signature) public view returns (bytes4 magicValue)';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, call(provider, [abi], [address, 'isValidSignature', [bytes.arrayify(hash), sig]])];
                case 2:
                    returnValue = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/, returnValue.toLowerCase() === magicValue.toLowerCase()];
            }
        });
    });
}
function verifyOldVersion(address, sig, hash, provider) {
    return __awaiter(this, void 0, void 0, function () {
        var returnValue, magicValue, abi, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    magicValue = '0x20c13b0b';
                    abi = 'function isValidSignature(bytes _hash, bytes memory _signature) public view returns (bytes4 magicValue)';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, call(provider, [abi], [address, 'isValidSignature', [bytes.arrayify(hash), sig]])];
                case 2:
                    returnValue = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/, returnValue.toLowerCase() === magicValue.toLowerCase()];
            }
        });
    });
}
function verify$1(address, sig, hash, network) {
    if (network === void 0) { network = '1'; }
    return __awaiter(this, void 0, void 0, function () {
        var provider;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = getProvider(network);
                    return [4 /*yield*/, verifyDefault(address, sig, hash, provider)];
                case 1:
                    if (_a.sent())
                        return [2 /*return*/, true];
                    return [4 /*yield*/, verifyOldVersion(address, sig, hash, provider)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

function getHash(data) {
    var domain = data.domain, types = data.types, message = data.message;
    return hash._TypedDataEncoder.hash(domain, types, message);
}
function verify(address, sig, data) {
    return __awaiter(this, void 0, void 0, function () {
        var domain, types, message, recoverAddress, hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    domain = data.domain, types = data.types, message = data.message;
                    recoverAddress = wallet.verifyTypedData(domain, types, message, sig);
                    hash = getHash(data);
                    console.log('Hash', hash);
                    console.log('Address', address);
                    console.log('Recover address', recoverAddress);
                    if (address === recoverAddress)
                        return [2 /*return*/, true];
                    console.log('Check EIP1271 signature');
                    return [4 /*yield*/, verify$1(address, sig, hash)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

var gateways = [
	"cloudflare-ipfs.com",
	"cf-ipfs.com",
	"ipfs.io",
	"ipfs.fleek.co",
	"gateway.pinata.cloud",
	"dweb.link",
	"ipfs.infura.io"
];

var SingleChoiceVoting = /** @class */ (function () {
    function SingleChoiceVoting(proposal, votes, strategies, selected) {
        this.proposal = proposal;
        this.votes = votes;
        this.strategies = strategies;
        this.selected = selected;
    }
    //  Returns an array with the results for each choice
    SingleChoiceVoting.prototype.resultsByVoteBalance = function () {
        var _this = this;
        return this.proposal.choices.map(function (choice, i) {
            return _this.votes
                .filter(function (vote) { return vote.choice === i + 1; })
                .reduce(function (a, b) { return a + b.balance; }, 0);
        });
    };
    //  Returns an array with the results for each choice
    //  and for each strategy
    SingleChoiceVoting.prototype.resultsByStrategyScore = function () {
        var _this = this;
        return this.proposal.choices.map(function (choice, i) {
            return _this.strategies.map(function (strategy, sI) {
                return _this.votes
                    .filter(function (vote) { return vote.choice === i + 1; })
                    .reduce(function (a, b) { return a + b.scores[sI]; }, 0);
            });
        });
    };
    // Returns the total amount of the results
    SingleChoiceVoting.prototype.sumOfResultsBalance = function () {
        return this.votes.reduce(function (a, b) { return a + b.balance; }, 0);
    };
    //  Returns a string of all choices
    SingleChoiceVoting.prototype.getChoiceString = function () {
        return this.proposal.choices[this.selected - 1];
    };
    return SingleChoiceVoting;
}());

var ApprovalVoting$2 = /** @class */ (function () {
    function ApprovalVoting(proposal, votes, strategies, selected) {
        this.proposal = proposal;
        this.votes = votes;
        this.strategies = strategies;
        this.selected = selected;
    }
    ApprovalVoting.prototype.resultsByVoteBalance = function () {
        var _this = this;
        return this.proposal.choices.map(function (choice, i) {
            return _this.votes
                .filter(function (vote) { return vote.choice.includes(i + 1); })
                .reduce(function (a, b) { return a + b.balance; }, 0);
        });
    };
    ApprovalVoting.prototype.resultsByStrategyScore = function () {
        var _this = this;
        return this.proposal.choices.map(function (choice, i) {
            return _this.strategies.map(function (strategy, sI) {
                return _this.votes
                    .filter(function (vote) { return vote.choice.includes(i + 1); })
                    .reduce(function (a, b) { return a + b.scores[sI]; }, 0);
            });
        });
    };
    ApprovalVoting.prototype.sumOfResultsBalance = function () {
        return this.votes.reduce(function (a, b) { return a + b.balance; }, 0);
    };
    ApprovalVoting.prototype.getChoiceString = function () {
        var _this = this;
        if (!this.selected)
            return '';
        return this.proposal.choices
            .filter(function (choice, i) { return _this.selected.includes(i + 1); })
            .join(', ');
    };
    return ApprovalVoting;
}());

function percentageOfTotal$1(i, values, total) {
    var reducedTotal = total.reduce(function (a, b) { return a + b; }, 0);
    var percent = (values[i] / reducedTotal) * 100;
    return isNaN(percent) ? 0 : percent;
}
function quadraticMath(i, choice, balance) {
    return Math.sqrt((percentageOfTotal$1(i + 1, choice, Object.values(choice)) / 100) * balance);
}
var ApprovalVoting$1 = /** @class */ (function () {
    function ApprovalVoting(proposal, votes, strategies, selected) {
        this.proposal = proposal;
        this.votes = votes;
        this.strategies = strategies;
        this.selected = selected;
    }
    ApprovalVoting.prototype.resultsByVoteBalance = function () {
        var _this = this;
        var results = this.proposal.choices
            .map(function (choice, i) {
            return _this.votes
                .map(function (vote) { return quadraticMath(i, vote.choice, vote.balance); })
                .reduce(function (a, b) { return a + b; }, 0);
        })
            .map(function (sqrt) { return sqrt * sqrt; });
        return results
            .map(function (res, i) { return percentageOfTotal$1(i, results, results); })
            .map(function (p) { return (_this.sumOfResultsBalance() / 100) * p; });
    };
    ApprovalVoting.prototype.resultsByStrategyScore = function () {
        var _this = this;
        var results = this.proposal.choices
            .map(function (choice, i) {
            return _this.strategies.map(function (strategy, sI) {
                return _this.votes
                    .map(function (vote) { return quadraticMath(i, vote.choice, vote.scores[sI]); })
                    .reduce(function (a, b) { return a + b; }, 0);
            });
        })
            .map(function (arr) { return arr.map(function (sqrt) { return [sqrt * sqrt]; }); });
        return results.map(function (res, i) {
            return _this.strategies
                .map(function (strategy, sI) { return [
                percentageOfTotal$1(0, results[i][sI], results.flat(2))
            ]; })
                .map(function (p) { return [(_this.sumOfResultsBalance() / 100) * p]; });
        });
    };
    ApprovalVoting.prototype.sumOfResultsBalance = function () {
        return this.votes.reduce(function (a, b) { return a + b.balance; }, 0);
    };
    ApprovalVoting.prototype.getChoiceString = function () {
        var _this = this;
        return this.proposal.choices
            .map(function (choice, i) {
            if (_this.selected[i + 1]) {
                return Math.round(percentageOfTotal$1(i + 1, _this.selected, Object.values(_this.selected)) * 10) / 10 + "% for " + choice;
            }
        })
            .filter(function (el) { return el != null; })
            .join(', ');
    };
    return ApprovalVoting;
}());

function irv(ballots, rounds) {
    var candidates = __spread(new Set(ballots.map(function (vote) { return vote[0]; }).flat()));
    var votes = Object.entries(ballots.reduce(function (votes, _a, i, src) {
        var _b = __read(_a, 1), v = _b[0];
        votes[v[0]][0] += src[i][1];
        if (votes[v[0]][1].length > 1)
            votes[v[0]][1] = votes[v[0]][1].map(function (score, sI) { return score + src[i][2][sI]; });
        else
            votes[v[0]][1] = [
                votes[v[0]][1].concat(src[i][2]).reduce(function (a, b) { return a + b; }, 0)
            ];
        return votes;
    }, Object.assign.apply(Object, __spread([{}], candidates.map(function (c) {
        var _a;
        return (_a = {}, _a[c] = [0, []], _a);
    })))));
    var votesWithoutScore = votes.map(function (vote) { return [vote[0], vote[1][0]]; });
    /* eslint-disable @typescript-eslint/no-unused-vars */
    var _a = __read(votesWithoutScore.reduce(function (_a, _b) {
        var _c = __read(_a, 2), n = _c[0], m = _c[1];
        var _d = __read(_b, 2), v = _d[0], c = _d[1];
        return (c > m ? [v, c] : [n, m]);
    }, ['?', -Infinity]), 2); _a[0]; var topCount = _a[1];
    var _b = __read(votesWithoutScore.reduce(function (_a, _b) {
        var _c = __read(_a, 2), n = _c[0], m = _c[1];
        var _d = __read(_b, 2), v = _d[0], c = _d[1];
        return (c < m ? [v, c] : [n, m]);
    }, ['?', Infinity]), 2), bottomCand = _b[0]; _b[1];
    /* eslint-enable @typescript-eslint/no-unused-vars */
    var sortedByHighest = votes.sort(function (a, b) { return b[1][0] - a[1][0]; });
    var totalPowerOfVotes = ballots
        .map(function (bal) { return bal[1]; })
        .reduce(function (a, b) { return a + b; }, 0);
    rounds.push({
        round: rounds.length + 1,
        sortedByHighest: sortedByHighest
    });
    return topCount > totalPowerOfVotes / 2 || sortedByHighest.length < 3
        ? rounds
        : irv(ballots
            .map(function (ballot) { return [
            ballot[0].filter(function (c) { return c != bottomCand; }),
            ballot[1],
            ballot[2]
        ]; })
            .filter(function (b) { return b[0].length > 0; }), rounds);
}
function getFinalRound(i, votes) {
    var results = irv(votes.map(function (vote) { return [vote.choice, vote.balance, vote.scores]; }), []);
    var finalRound = results[results.length - 1];
    return finalRound.sortedByHighest.filter(function (res) { return res[0] == i + 1; });
}
var ApprovalVoting = /** @class */ (function () {
    function ApprovalVoting(proposal, votes, strategies, selected) {
        this.proposal = proposal;
        this.votes = votes;
        this.strategies = strategies;
        this.selected = selected;
    }
    ApprovalVoting.prototype.resultsByVoteBalance = function () {
        var _this = this;
        return this.proposal.choices.map(function (choice, i) {
            return getFinalRound(i, _this.votes).reduce(function (a, b) { return a + b[1][0]; }, 0);
        });
    };
    ApprovalVoting.prototype.resultsByStrategyScore = function () {
        var _this = this;
        return this.proposal.choices.map(function (choice, i) {
            return _this.strategies.map(function (strategy, sI) {
                return getFinalRound(i, _this.votes).reduce(function (a, b) { return a + b[1][1][sI]; }, 0);
            });
        });
    };
    ApprovalVoting.prototype.sumOfResultsBalance = function () {
        return this.resultsByVoteBalance().reduce(function (a, b) { return a + b; });
    };
    ApprovalVoting.prototype.getChoiceString = function () {
        var _this = this;
        return this.selected
            .map(function (choice) {
            if (_this.proposal.choices[choice - 1])
                return _this.proposal.choices[choice - 1];
        })
            .map(function (el, i) { return "(" + getNumberWithOrdinal(i + 1) + ") " + el; })
            .join(', ');
    };
    return ApprovalVoting;
}());

function percentageOfTotal(i, values, total) {
    var reducedTotal = total.reduce(function (a, b) { return a + b; }, 0);
    var percent = (values[i] / reducedTotal) * 100;
    return isNaN(percent) ? 0 : percent;
}
function weightedPower(i, choice, balance) {
    return ((percentageOfTotal(i + 1, choice, Object.values(choice)) / 100) * balance);
}
var WeightedVoting = /** @class */ (function () {
    function WeightedVoting(proposal, votes, strategies, selected) {
        this.proposal = proposal;
        this.votes = votes;
        this.strategies = strategies;
        this.selected = selected;
    }
    WeightedVoting.prototype.resultsByVoteBalance = function () {
        var _this = this;
        var results = this.proposal.choices.map(function (choice, i) {
            return _this.votes
                .map(function (vote) { return weightedPower(i, vote.choice, vote.balance); })
                .reduce(function (a, b) { return a + b; }, 0);
        });
        return results
            .map(function (res, i) { return percentageOfTotal(i, results, results); })
            .map(function (p) { return (_this.sumOfResultsBalance() / 100) * p; });
    };
    WeightedVoting.prototype.resultsByStrategyScore = function () {
        var _this = this;
        var results = this.proposal.choices
            .map(function (choice, i) {
            return _this.strategies.map(function (strategy, sI) {
                return _this.votes
                    .map(function (vote) { return weightedPower(i, vote.choice, vote.scores[sI]); })
                    .reduce(function (a, b) { return a + b; }, 0);
            });
        })
            .map(function (arr) { return arr.map(function (pwr) { return [pwr]; }); });
        return results.map(function (res, i) {
            return _this.strategies
                .map(function (strategy, sI) { return [
                percentageOfTotal(0, results[i][sI], results.flat(2))
            ]; })
                .map(function (p) { return [(_this.sumOfResultsBalance() / 100) * p]; });
        });
    };
    WeightedVoting.prototype.sumOfResultsBalance = function () {
        return this.votes.reduce(function (a, b) { return a + b.balance; }, 0);
    };
    WeightedVoting.prototype.getChoiceString = function () {
        var _this = this;
        return this.proposal.choices
            .map(function (choice, i) {
            if (_this.selected[i + 1]) {
                return Math.round(percentageOfTotal(i + 1, _this.selected, Object.values(_this.selected)) * 10) / 10 + "% for " + choice;
            }
        })
            .filter(function (el) { return el != null; })
            .join(', ');
    };
    return WeightedVoting;
}());

var voting = {
    'single-choice': SingleChoiceVoting,
    approval: ApprovalVoting$2,
    quadratic: ApprovalVoting$1,
    'ranked-choice': ApprovalVoting,
    weighted: WeightedVoting,
    basic: SingleChoiceVoting
};

var SNAPSHOT_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot',
    '4': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-rinkeby',
    '42': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-kovan',
    '97': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-binance-smart-chain',
    '100': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-gnosis-chain',
    '137': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-polygon',
    '250': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-fantom'
};
var SNAPSHOT_SCORE_API = 'https://score.blocksscan.io/api/scores';
var ENS_RESOLVER_ABI = [
    'function text(bytes32 node, string calldata key) external view returns (string memory)'
];
function call(provider, abi, call, options) {
    return __awaiter(this, void 0, void 0, function () {
        var contract, params, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contract = new contracts.Contract(call[0], abi, provider);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    params = call[2] || [];
                    return [4 /*yield*/, contract[call[1]].apply(contract, __spread(params, [options || {}]))];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(e_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function multicall(network, provider, abi$1, calls, options) {
    return __awaiter(this, void 0, void 0, function () {
        var multicallAbi, multi, itf, max_1, pages, promises_1, results, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    multicallAbi = [
                        'function aggregate(tuple(address target, bytes callData)[] calls) view returns (uint256 blockNumber, bytes[] returnData)'
                    ];
                    multi = new contracts.Contract(networks[network].multicall, multicallAbi, provider);
                    itf = new abi.Interface(abi$1);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    max_1 = (options === null || options === void 0 ? void 0 : options.limit) || 500;
                    pages = Math.ceil(calls.length / max_1);
                    promises_1 = [];
                    Array.from(Array(pages)).forEach(function (x, i) {
                        var callsInPage = calls.slice(max_1 * i, max_1 * (i + 1));
                        promises_1.push(multi.aggregate(callsInPage.map(function (call) { return [
                            call[0].toLowerCase(),
                            itf.encodeFunctionData(call[1], call[2])
                        ]; }), options || {}));
                    });
                    return [4 /*yield*/, Promise.all(promises_1)];
                case 2:
                    results = _a.sent();
                    results = results.reduce(function (prev, _a) {
                        var _b = __read(_a, 2), res = _b[1];
                        return prev.concat(res);
                    }, []);
                    return [2 /*return*/, results.map(function (call, i) {
                            return itf.decodeFunctionResult(calls[i][1], call);
                        })];
                case 3:
                    e_2 = _a.sent();
                    return [2 /*return*/, Promise.reject(e_2)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function subgraphRequest(url, query, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch__default["default"](url, {
                        method: 'POST',
                        headers: __assign({ Accept: 'application/json', 'Content-Type': 'application/json' }, options === null || options === void 0 ? void 0 : options.headers),
                        body: JSON.stringify({ query: jsonToGraphqlQuery.jsonToGraphQLQuery({ query: query }) })
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data || {}];
            }
        });
    });
}
function getUrl(uri, gateway) {
    if (gateway === void 0) { gateway = gateways[0]; }
    var ipfsGateway = "https://" + gateway;
    if (!uri)
        return null;
    if (!uri.startsWith('ipfs://') &&
        !uri.startsWith('ipns://') &&
        !uri.startsWith('https://') &&
        !uri.startsWith('http://'))
        return ipfsGateway + "/ipfs/" + uri;
    var uriScheme = uri.split('://')[0];
    if (uriScheme === 'ipfs')
        return uri.replace('ipfs://', ipfsGateway + "/ipfs/");
    if (uriScheme === 'ipns')
        return uri.replace('ipns://', ipfsGateway + "/ipns/");
    return uri;
}
function getJSON(uri) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            url = getUrl(uri);
            return [2 /*return*/, fetch__default["default"](url).then(function (res) { return res.json(); })];
        });
    });
}
function ipfsGet(gateway, ipfsHash, protocolType) {
    if (protocolType === void 0) { protocolType = 'ipfs'; }
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            url = "https://" + gateway + "/" + protocolType + "/" + ipfsHash;
            return [2 /*return*/, fetch__default["default"](url).then(function (res) { return res.json(); })];
        });
    });
}
function sendTransaction(web3, contractAddress, abi, action, params, overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, contractWithSigner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signer = web3.getSigner();
                    contract = new contracts.Contract(contractAddress, abi, web3);
                    contractWithSigner = contract.connect(signer);
                    return [4 /*yield*/, contractWithSigner[action].apply(contractWithSigner, __spread(params, [overrides]))];
                case 1: 
                // overrides.gasLimit = 12e6;
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getScores(space, strategies, network, addresses, snapshot, scoreApiUrl) {
    if (snapshot === void 0) { snapshot = 'latest'; }
    if (scoreApiUrl === void 0) { scoreApiUrl = SNAPSHOT_SCORE_API; }
    return __awaiter(this, void 0, void 0, function () {
        var params, res, obj, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    params = {
                        space: space,
                        network: network,
                        snapshot: snapshot,
                        strategies: strategies,
                        addresses: addresses
                    };
                    return [4 /*yield*/, fetch__default["default"](scoreApiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ params: params })
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    obj = _a.sent();
                    return [2 /*return*/, obj.result.scores];
                case 3:
                    e_3 = _a.sent();
                    return [2 /*return*/, Promise.reject(e_3)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function validateSchema(schema, data) {
    var ajv = new Ajv__default["default"]({ allErrors: true, allowUnionTypes: true, $data: true });
    // @ts-ignore
    addFormats__default["default"](ajv);
    var validate = ajv.compile(schema);
    var valid = validate(data);
    return valid ? valid : validate.errors;
}
function getEnsTextRecord(ens, record, network) {
    if (network === void 0) { network = '1'; }
    var address = networks[network].ensResolver || networks['1'].ensResolver;
    var ensHash = ethEnsNamehash.hash(ethEnsNamehash.normalize(ens));
    var provider = getProvider(network);
    return call(provider, ENS_RESOLVER_ABI, [address, 'text', [ensHash, record]]);
}
function getSpaceUri(id, network) {
    if (network === void 0) { network = '1'; }
    return __awaiter(this, void 0, void 0, function () {
        var e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getEnsTextRecord(id, 'snapshot', network)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_4 = _a.sent();
                    console.log('getSpaceUriFromTextRecord failed', id, e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, false];
            }
        });
    });
}
function clone(item) {
    return JSON.parse(JSON.stringify(item));
}
function sleep(time) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(resolve, time);
                })];
        });
    });
}
function getNumberWithOrdinal(n) {
    var s = ['th', 'st', 'nd', 'rd'], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
var utils = {
    call: call,
    multicall: multicall,
    subgraphRequest: subgraphRequest,
    ipfsGet: ipfsGet,
    getUrl: getUrl,
    getJSON: getJSON,
    sendTransaction: sendTransaction,
    getScores: getScores,
    validateSchema: validateSchema,
    getEnsTextRecord: getEnsTextRecord,
    getSpaceUri: getSpaceUri,
    clone: clone,
    sleep: sleep,
    getNumberWithOrdinal: getNumberWithOrdinal,
    voting: voting,
    getProvider: getProvider,
    signMessage: signMessage,
    getBlockNumber: getBlockNumber,
    Multicaller: Multicaller,
    validations: validations,
    getHash: getHash,
    verify: verify,
    SNAPSHOT_SUBGRAPH_URL: SNAPSHOT_SUBGRAPH_URL
};

var index = {
    Client: Client,
    Client712: Client$1,
    schemas: schemas,
    utils: utils
};

module.exports = index;
