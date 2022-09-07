# Multisig Account

Smart contracts for Multisign Account. 


## How to start

```shell
$ git clone https://github.com/Pham-Xuan-Thanh/multisig.git
$ cd multisig
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
    MULTISIG_CONTRACT_ADDRESS=0x 
 ```
### Run unit tests

```shell
$ npm run test
```
### Command Line Syntax
   Get arguments from CLI with Nodejs supported: 
   ```shell
      npm run [task] -- --arg1 [data1] --arg2 [data2] --arg3 [data3]
   ```

* Note: Symbol -- is required for passing the arguments to below layer. 
### Deploy contract to Polygon Edge
Deploy Multisig with:
   * arg1: list of owners. I.e. : ["0xabc","0x456"]
   * arg2: number of owners required for commit an action. i.e. 2 
```shell
$ npm run deploy -- --arg1 ["0xabc","0x456"] --arg2 2
```

* Note: Get Smart Contract Address to export to .env

### Get information Multisig

Please make sure required values are set in .env to use this command

```shell
$ npm run info
```

### Submit a Transaction 
   Submit a transaction and waiting for others owners confirmed. The transaction is identified by transaction index - storage in smartcontract.
   
   Arguments:
   * arg1: to - the address to execute. i.e. 0xabcdef
   * arg2: value  - amount of W will send to "to" units is W. i.e. 1
   * arg3: data - data to send to  "to" usually to is a smart contract. i.e. : 0x6a35af00000

```shell
$ npm run submit-tx -- --arg1 [data1] --arg2 [data2] --arg3 [data3]
```

### Confirm transaction submitted
   The owners of contract will confirm the submitted.  When number of confirmations to required that transaction can be executed.  
   * arg1: txIndex - transaction indexed in smart contract [ from 0 to max uint32]. i.e. 0
```shell
$ npm run confirm-tx -- --arg1 [data]
```
### Revoke transaction confirmed
   Revoke confirmation. 
   * arg1: txIndex - transaction indexed in smart contract [ from 0 to max uint32]. i.e. 0
```shell
$ npm run revoke-tx -- --arg1 [data]
```
### Get transaction info
   Get information for the transaction that submitted. Check that can be executed or not.
   * arg1: txIndex - transaction indexed in smart contract [ from 0 to max uint32]. i.e. 0
```shell
$ npm run txinfo -- --arg1 [data]
```

### Execute transaction 
   Execute transaction
   * arg1: txIndex - transaction indexed in smart contract [ from 0 to max uint32]. i.e. 0
```shell
$ npm run execute-tx -- --arg1 [data]
```

