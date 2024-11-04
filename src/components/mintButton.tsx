import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  authorityPDA,
  checkPDAExists,
  collectionMint,
  configPDA,
  getMetadataEditionPDA,
  getMetadataPDA,
  getNFTMintedCount,
  getNftPDA,
  INSTRUCTIONS_SYSVAR_ID,
  METADATA_PROGRAM_ID,
  program,
  vaultPDA,
} from "../anchor/setup";
import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { BN } from "@coral-xyz/anchor";
export default function MintButton() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const handleMint = async () => {
    if (!publicKey) return;

    let id = new BN(0);
    let status = false;
    if ((await getNFTMintedCount()) == 500) return;
    do {
      id = new BN(Math.floor(Math.random() * 1000));
      status = await checkPDAExists(connection, getNftPDA(new BN(id)));
      console.log("status", id.toString(), status);
    } while (status == true);

    // const METADATA_PROGRAM_ID = new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID);
    setIsLoading(true);
    try {
      const mintKeyPair = Keypair.generate();
      const mint = mintKeyPair.publicKey;
      const destination = await getAssociatedTokenAddress(
        mintKeyPair.publicKey,
        publicKey
      );
      console.log(">>>", mintKeyPair.publicKey.toString());

      // Create a transaction to invoke the increment function
      const mintTransaction = await program.methods
        .mintNft(id) // This takes no arguments so we don't need to pass anything
        .accounts({
          owner: publicKey,
          mint,
          destination,
          metadata: getMetadataPDA(mint),
          masterEdition: getMetadataEditionPDA(mint),
          mintAuthority: authorityPDA,
          nftInfo: getNftPDA(id),
          vault: vaultPDA,
          config: configPDA,
          collectionMint: collectionMint,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenMetadataProgram: METADATA_PROGRAM_ID,
        })
        .transaction();
      const verifyTransaction = await program.methods
        .verifyCollection() // This takes no arguments so we don't need to pass anything
        .accounts({
          authority: publicKey,
          metadata: getMetadataPDA(mint),
          mint,
          mintAuthority: authorityPDA,
          collectionMint,
          collectionMetadata: getMetadataPDA(collectionMint),
          collectionMasterEdition: getMetadataEditionPDA(collectionMint),
          systemProgram: SystemProgram.programId,
          sysvarInstruction: INSTRUCTIONS_SYSVAR_ID,
          tokenMetadataProgram: METADATA_PROGRAM_ID,
        })
        .transaction();
      const transaction = new Transaction();
      transaction.add(...mintTransaction.instructions);
      transaction.add(...verifyTransaction.instructions);
      // return;
      const transactionSignature = await sendTransaction(
        transaction,
        connection,
        { signers: [mintKeyPair] }
      );
      await connection.confirmTransaction(transactionSignature, "processed");
      console.log("NFT minted successfully:", transactionSignature);
      console.log(
        `View on explorer: https://solana.fm/tx/${transactionSignature}?cluster=devnet-alpha`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="w-24" onClick={handleMint} disabled={!publicKey}>
        {isLoading ? "Loading" : "Mint"}
      </button>
    </>
  );
}
