window.__RUNTIME_CONFIG__ = {
  CHAINBRIDGE: {
    chains: [
	  {
        chainId: 1,
        networkId: 173,
        name: "LuxChain",
        decimals: 18,
        bridgeAddress: "0x1C43A44eFb1D4aB7489ef60590d194dA4c8FC483",
        erc20HandlerAddress: "0x99C1cF244C4Ff9e832a2306400C2f14Ad173D621",
        rpcUrl: "https://rpc.luxscan.net/",
        type: "Ethereum",
		blockExplorer: "https://luxscan.net/",
        nativeTokenSymbol: "LUX",
		deployedBlockNumber: 1,
        tokens: [
		  {
            address: "0xF7f6Dc84Ff9516291f214a393bd84E68ee50F59f",
            name: "Wrapped LUX",
            symbol: "WLUX",
			decimals: 18,
            imageUri: "LUXIcon",
            resourceId:
              "0x0000000000000000000000000000000000000000000000000000000000000001",
          },
        ],
      },
	
	
      {
        chainId: 11,
        networkId: 1,
        name: "Ethereum",
        decimals: 18,
        bridgeAddress: "0x0Ee4D60292E70c16A824d4213866833F6f877F58",
        erc20HandlerAddress: "0xaB6904EA82aeA6c34C9e287670f7c060bB1e4952",
        rpcUrl: "https://rpc.ankr.com/eth",
        type: "Ethereum",
		blockExplorer: "https://etherscan.io/",
        nativeTokenSymbol: "ETH",
		deployedBlockNumber: 19862000,
        tokens: [
		  {
            address: "0xfe8f84eCF50D5D5eD6C170C6f18F40233a34FbbA",
            name: "LuxChain",
            symbol: "LUX",
			decimals: 18,
            imageUri: "ETHIcon",
            resourceId:
              "0x0000000000000000000000000000000000000000000000000000000000000001",
          },
        ],
      },
    ],
  },
};
