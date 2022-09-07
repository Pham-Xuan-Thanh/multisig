# staking-contracts

Smart contracts for Multisign Account. 


## How to start

```shell
$ git clone https://github.com/Pham-Xuan-Thanh/multisig.git
$ cd staking-contracts
$ npm i
```

### Build contracts

```shell
$ npm run build
```
### Environment Variables
    Default staking contract address: 0x0000000000000000000000000000000000001001
 ```shell
    JSONRPC_URL=http://sc1-testnet.beowulfchain.com:10001
    PRIVATE_KEYS=0x
    STAKING_CONTRACT_ADDRESS=0x 
    VALIDATOR_ADDRESS=0x 
    MAX_VALIDATOR_COUNT=999999
    MIN_VALIDATOR_COUNT=0
 ```
### Run unit tests

```shell
$ npm run test
```

### Deploy contract to Polygon Edge

```shell
$ npm run deploy
```

### Stake balance to contract

Please make sure required values are set in .env to use this command

```shell
$ npm run stake
```

### Unstake from contract

```shell
$ npm run unstake
```

### Check current total staked amount and validators in contract

```shell
$ npm run info
```
### Allowance stake for another to be validators
```shell
$ npm run allowance-stake
```