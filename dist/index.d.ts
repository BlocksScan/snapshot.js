import Client712 from './sign';
import Client from './client';
declare const _default: {
    Client: typeof Client;
    Client712: typeof Client712;
    schemas: {
        space: {
            title: string;
            type: string;
            properties: {
                name: {
                    type: string;
                    title: string;
                    minLength: number;
                    maxLength: number;
                };
                private: {
                    type: string;
                };
                about: {
                    type: string;
                    title: string;
                    maxLength: number;
                };
                guidelines: {
                    type: string;
                    title: string;
                    maxLength: number;
                };
                terms: {
                    type: string;
                    title: string;
                    format: string;
                    maxLength: number;
                };
                avatar: {
                    type: string;
                    title: string;
                    format: string;
                    maxLength: number;
                };
                location: {
                    type: string;
                    title: string;
                    maxLength: number;
                };
                website: {
                    type: string;
                    title: string;
                    format: string;
                    maxLength: number;
                };
                twitter: {
                    type: string;
                    title: string;
                    pattern: string;
                    maxLength: number;
                };
                github: {
                    type: string;
                    title: string;
                    pattern: string;
                    maxLength: number;
                };
                email: {
                    type: string;
                    title: string;
                    maxLength: number;
                };
                network: {
                    type: string;
                    title: string;
                    minLength: number;
                    maxLength: number;
                };
                symbol: {
                    type: string;
                    title: string;
                    minLength: number;
                    maxLength: number;
                };
                skin: {
                    type: string;
                    title: string;
                    maxLength: number;
                };
                domain: {
                    type: string;
                    title: string;
                    maxLength: number;
                };
                strategies: {
                    type: string;
                    minItems: number;
                    maxItems: number;
                    items: {
                        type: string;
                        properties: {
                            name: {
                                type: string;
                                maxLength: number;
                                title: string;
                            };
                            network: {
                                type: string;
                                maxLength: number;
                                title: string;
                            };
                            params: {
                                type: string;
                                title: string;
                            };
                        };
                        required: string[];
                        additionalProperties: boolean;
                    };
                    title: string;
                };
                members: {
                    type: string;
                    items: {
                        type: string;
                        pattern: string;
                        minLength: number;
                        maxLength: number;
                    };
                    title: string;
                };
                admins: {
                    type: string;
                    items: {
                        type: string;
                        pattern: string;
                        minLength: number;
                        maxLength: number;
                    };
                    title: string;
                };
                filters: {
                    type: string;
                    properties: {
                        defaultTab: {
                            type: string;
                        };
                        minScore: {
                            type: string;
                            minimum: number;
                        };
                        onlyMembers: {
                            type: string;
                        };
                        invalids: {
                            type: string;
                            items: {
                                type: string;
                                maxLength: number;
                            };
                            title: string;
                        };
                    };
                    additionalProperties: boolean;
                };
                validation: {
                    type: string;
                    properties: {
                        name: {
                            type: string;
                            maxLength: number;
                            title: string;
                        };
                        params: {
                            type: string;
                            title: string;
                        };
                    };
                    required: string[];
                    additionalProperties: boolean;
                };
                plugins: {
                    type: string;
                };
                voting: {
                    type: string;
                    properties: {
                        delay: {
                            type: string;
                            minimum: number;
                        };
                        period: {
                            type: string;
                            minimum: number;
                        };
                        type: {
                            type: string;
                            title: string;
                        };
                        quorum: {
                            type: string;
                            minimum: number;
                        };
                        blind: {
                            type: string;
                        };
                        hideAbstain: {
                            type: string;
                        };
                    };
                    additionalProperties: boolean;
                };
                categories: {
                    type: string;
                    maxItems: number;
                    items: {
                        type: string;
                        enum: string[];
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        proposal: {
            title: string;
            type: string;
            properties: {
                name: {
                    type: string;
                    title: string;
                    minLength: number;
                    maxLength: number;
                };
                body: {
                    type: string;
                    title: string;
                    minLength: number;
                    maxLength: number;
                };
                choices: {
                    type: string;
                    title: string;
                    minItems: number;
                    maxItems: number;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                snapshot: {
                    type: string;
                    title: string;
                };
                start: {
                    type: string;
                    title: string;
                    minimum: number;
                    maximum: number;
                };
                end: {
                    type: string;
                    title: string;
                    minimum: number;
                    maximum: number;
                    exclusiveMinimum: {
                        $data: string;
                    };
                };
                metadata: {
                    type: string;
                    title: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        vote: {
            title: string;
            type: string;
            properties: {
                proposal: {
                    type: string;
                    title: string;
                };
                choice: {
                    type: string[];
                    title: string;
                };
                metadata: {
                    type: string;
                    title: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
    };
    utils: {
        call: typeof import("./utils").call;
        multicall: typeof import("./utils").multicall;
        subgraphRequest: typeof import("./utils").subgraphRequest;
        ipfsGet: typeof import("./utils").ipfsGet;
        getUrl: typeof import("./utils").getUrl;
        getJSON: typeof import("./utils").getJSON;
        sendTransaction: typeof import("./utils").sendTransaction;
        getScores: typeof import("./utils").getScores;
        validateSchema: typeof import("./utils").validateSchema;
        getEnsTextRecord: typeof import("./utils").getEnsTextRecord;
        getSpaceUri: typeof import("./utils").getSpaceUri;
        clone: typeof import("./utils").clone;
        sleep: typeof import("./utils").sleep;
        getNumberWithOrdinal: typeof import("./utils").getNumberWithOrdinal;
        voting: {
            'single-choice': typeof import("./voting/singleChoice").default;
            approval: typeof import("./voting/approval").default;
            quadratic: typeof import("./voting/quadratic").default;
            'ranked-choice': typeof import("./voting/rankedChoice").default;
            weighted: typeof import("./voting/weighted").default;
            basic: typeof import("./voting/singleChoice").default;
        };
        getProvider: typeof import("./utils/provider").default;
        signMessage: typeof import("./utils/web3").signMessage;
        getBlockNumber: typeof import("./utils/web3").getBlockNumber;
        Multicaller: typeof import("./utils/multicaller").default;
        validations: {
            basic: typeof import("./validations/basic").default;
            aave: typeof import("./validations/aave").default;
            nouns: typeof import("./validations/nouns").default;
        };
        getHash: typeof import("./sign/utils").getHash;
        verify: typeof import("./sign/utils").verify;
        SNAPSHOT_SUBGRAPH_URL: {
            1: string;
            4: string;
            42: string;
            97: string;
            100: string;
            137: string;
            250: string;
        };
    };
};
export default _default;
