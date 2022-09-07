import {ethers} from "hardhat";
import {MultiSigWallet} from "../types/MultiSigWallet";

const MULTISIG_CONTRACT_ADDRESS = process.env.MULTISIG_CONTRACT_ADDRESS ?? '';


async function main() {

  // Check parameter from cli
  const toParam = process.argv[2]
  const valueParam = ethers.utils.parseUnits(process.argv[3],"ether").toBigInt()
  const dataParam = process.argv[4]

  if (!ethers.utils.isAddress(toParam))
  {
    console.log("Invalid address \"to\" with", toParam)
    return 
  }
  

  const [account] = await ethers.getSigners();

  console.log(`Multisig: address=${MULTISIG_CONTRACT_ADDRESS}, account=${account.address}`);
  console.log(`Account balance: ${(await account.getBalance()).toString()}`);

  const MultisigContractFactory = await ethers.getContractFactory("MultiSigWallet");
  let multisigcontract = await MultisigContractFactory.attach(MULTISIG_CONTRACT_ADDRESS) as MultiSigWallet;
  multisigcontract = multisigcontract.connect(account);
  


  const tx = await multisigcontract.submitTransaction(toParam, valueParam, dataParam)
  const receipt = await tx.wait();

  console.log("Transaction:", tx.hash);

  receipt.events?.map(event => {
    if ( event?.args) {
      const [owner, txIndex , to , value , data ] =  event.args.slice(0,5)
      console.log(
`  Submited Transaction with index=${txIndex} (ID to confirm or execute later)
  By owner: ${owner}. The Transaction information:
    to: ${to} 
    value: ${value}
    data: ${data}`
       )
    } else {
      console.log("Something wrong!! Feedback with beowulf to supported as soon as possible")
    }
      
    
  })
  
  // console.log("for more: ",)
  // events?.map((event,i) => {
  //   console.log(i)
  //   console.log("Args : " , event.args)
  //   console.log("Event :",event.event)
  // } )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
