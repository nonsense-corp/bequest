const globals = {
    REHIVE_API: {
        BASE_URL: "https://api.rehive.com/3/",
        URLS: {
            LOGIN: "auth/login/",
            REGISTER: "auth/register/",
            TRANSACTIONS: "transactions/",
            ACCOUNTS: "accounts/"
        }
    },
    BITCOIN_API: {
        BASE_URL: "https://bitcoin-testnet.services.rehive.io/api/1/",
        BLOCK_EXPLORER_URL: "https://bitcoin-node-testnet.rehive.io/",
        URLS: {
            USER: "user/",
            WALLET_SEND: "wallet/send/"
        }
    },
    STELLAR_API: {
        BASE_URL: "https://stellar.services.rehive.io/api/1/",
        BLOCK_EXPLORER_URL: "",
        URLS: {
            USER: "account/",
            USERNAME: "user/username/set/"
        }
    }
};

export default globals;