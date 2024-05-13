window.__RUNTIME_CONFIG__ = {
  INDEXER__URL: "http://localhost:8000",
  CHAINBRIDGE: {
    chains: [
	  {
        chainId: 0,
        networkId: 1792,
        name: "DollarChain",
        decimals: 18,
        bridgeAddress: "0x2a5c02f801B0c9d42A0C0E11c0a2DDC3cfD8b1eD",
        erc20HandlerAddress: "0xbe5AD90dE5BCed0F956789069ebEC6Ac5e1b7e3B",
        rpcUrl: "https://rpc.dollarchain.org/",
        type: "Ethereum",
		blockExplorer: "https://dollarscan.io/",
        nativeTokenSymbol: "USD",
		deployedBlockNumber: 36774,
        tokens: [
		  {
            address: "0xA0694eaf0274399BEa474A24EEdAb7cC12aD5fd3",
            name: "USD (USDT)",
            symbol: "USD (USDT)",
			decimals: 18,
            imageUri: "DLCIcon",
            resourceId:
              "0x0000000000000000000000000000000000000000000000000000000000000001",
          },
        ],
      },
	
	
      {
        chainId: 1,
        networkId: 56,
        name: "Binance Smart Chain",
        decimals: 18,
        bridgeAddress: "0x2a5c02f801B0c9d42A0C0E11c0a2DDC3cfD8b1eD",
        erc20HandlerAddress: "0xbe5AD90dE5BCed0F956789069ebEC6Ac5e1b7e3B",
        rpcUrl: "https://rpc.ankr.com/bsc",
        type: "Ethereum",
		blockExplorer: "https://bscscan.com/",
        nativeTokenSymbol: "BNB",
		deployedBlockNumber: 27789763,
        tokens: [
		  {
            address: "0x55d398326f99059fF775485246999027B3197955",
            name: "USDT",
            symbol: "USDT",
			decimals: 18,
            imageUri: "BNBIcon",
            resourceId:
              "0x0000000000000000000000000000000000000000000000000000000000000001",
          },
        ],
      },

    ],
  },
};
