import {ethers} from "hardhat";
import {MultiSigWallet} from "../types/MultiSigWallet";

const MULTISIG_CONTRACT_ADDRESS = process.env.MULTISIG_CONTRACT_ADDRESS ?? '';


async function main() {

  // Check parameter from cli
  const txID = process.argv[2]

  

  const [account] = await ethers.getSigners();

  console.log(`Multisig: address=${MULTISIG_CONTRACT_ADDRESS}, account=${account.address}`);
  console.log(`Account balance: ${(await account.getBalance()).toString()}`);

  const MultisigContractFactory = await ethers.getContractFactory("MultiSigWallet");

  let multisigcontract = await MultisigContractFactory.attach(MULTISIG_CONTRACT_ADDRESS) as MultiSigWallet;
  multisigcontract = multisigcontract.connect(account);
  

    const {to , value, data ,executed ,numConfirmations } = await multisigcontract.getTransaction(txID)
    const numConfirmationsRequired = await multisigcontract.numConfirmationsRequired()
      console.log(
`  The Transaction ID=${txID} information :
    to: ${to} 
    value: ${value}
    data: ${data}
    Is executed: ${executed}
    Number of owners confirmed: ${numConfirmations}/${numConfirmationsRequired.toNumber()}`
       )
      
    
  
  
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
