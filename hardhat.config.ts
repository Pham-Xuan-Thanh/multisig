import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle"
import "tsconfig-paths/register";
import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import "hardhat-gas-reporter"

import fsExtra from "fs-extra";
import { ERRORS } from "hardhat/internal/core/errors-list"
import { HardhatError } from "hardhat/internal/core/errors"
import { runScriptWithHardhat } from "hardhat/internal/util/scripts-runner"
import { task } from "hardhat/config"

require("dotenv").config();

const privateKeys = (process.env.PRIVATE_KEYS ?? "0000000000000000000000000000000000000000000000000000000000000000").split(",")

task("multisig", "for testing be getting  familiar with Hardhat  ")
  .addPositionalParam("script", "first param for testing", "./scripts/deploy.ts")
  .addOptionalParam("arg1" , "the first param for typescript")
  .addOptionalParam("arg2" , "the 2nd param for typescript")
  .addOptionalParam("arg3" , "the 3rd param for typescript")
  .addFlag("flag1", "Its flag")
  .setAction(async ({ script, flag1, arg1, arg2 , arg3 }, { hardhatArguments }) => {

    
    if (!(await fsExtra.pathExists(script))) {
      throw new HardhatError(ERRORS.BUILTIN_TASKS.RUN_FILE_NOT_FOUND, {
        script,
      });
    }

    try {
      process.exitCode = await runScriptWithHardhat(hardhatArguments, script,[arg1, arg2 , arg3]);
    } catch (error) {
      if (error instanceof Error) {
        throw new HardhatError(
          ERRORS.BUILTIN_TASKS.RUN_SCRIPT_ERROR,
          {
            script,
            error: error.message,
          },
          error
        );
      }
    }
  }
  )

const config: HardhatUserConfig = {
  solidity: "0.8.13",
  networks: {
    beowulfsmartchain: {
      url: process.env.JSONRPC_URL ?? "http://localhost:10002",
      accounts: [
        ...privateKeys,
      ],
    },
  },
  gasReporter: {
    currency: "EUR",
    gasPrice: 500
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false,
    externalArtifacts: ["externalArtifacts/*.json"],
  },
};


export default config;
