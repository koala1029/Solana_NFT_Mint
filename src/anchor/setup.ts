import { Program } from "@coral-xyz/anchor";
import { IDL, MintNFT } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const programId = new PublicKey("Aq3BJbaCtNTinYS2YWtzWyADX9oY5SXRP6MFu8JzRZy3");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<MintNFT>(IDL, programId, {
  connection,
});

export const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
// Derive a PDA for the counter account, using "counter" as the seed.
// We'll use this to update the counter on-chain.
export const [vaultPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("vault")],
  program.programId
);
export const [configPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("config")],
  program.programId
);
export const [authorityPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("authority")],
  program.programId
);

export const getNftPDA = (id: number) => {
  const numberSeedBuffer = Buffer.alloc(8); // Allocate 4 bytes for a 32-bit integer
  numberSeedBuffer.writeUInt32LE(id);
  return PublicKey.findProgramAddressSync(
    [Buffer.from("nftinfo"), numberSeedBuffer],
    program.programId
  )[0];
};

export const getMetadataPDA = (mint: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(), // mint address
      mint.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  )[0];
};

export const getMetadataEditionPDA = (mint: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(), // mint address
      mint.toBuffer(),
      Buffer.from("edition"),
    ],
    METADATA_PROGRAM_ID
  )[0];
};

export const collectionMint = new PublicKey(
  "6AZSjSVgTGUboN93ouKWhDhYgUADhBReQzJKkGKPpV7n"
);

export const INSTRUCTIONS_SYSVAR_ID = new PublicKey(
  "Sysvar1nstructions1111111111111111111111111"
);
const NFTINFO_ACCOUNT_SIZE = 8 + 8 + 32 + 32;
export const getNFTMintedCount = async () => {
  const accounts = await connection.getProgramAccounts(
    new PublicKey(programId)
  );

  // Filter accounts based on the expected size of UserInfo
  const userInfoAccounts = accounts.filter(
    ({ account }) => account.data.length === NFTINFO_ACCOUNT_SIZE
  );

  return userInfoAccounts.length;
};

export const checkPDAExists = async (
  connection: Connection,
  pda: PublicKey
) => {
  const accountInfo = await connection.getAccountInfo(pda);
  return accountInfo !== null; // true if PDA exists, false otherwise
};
// Define a TypeScript type for the Counter data structure based on the IDL.
// This ensures type safety when interacting with the "counter" account, facilitating development and maintenance.
// export type CounterData = IdlAccounts<MintNFT>["counter"];
