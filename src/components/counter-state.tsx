import { useEffect, useState } from "react";
import { program, getNFTMintedCount } from "../anchor/setup";

export default function CounterState() {
  const [nftCount, setNFTCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const count = await getNFTMintedCount();
      setNFTCount(count);
    };
    fetchData();
    // Set up the event listener
    const listener = program.addEventListener("NFTMinted", async (event) => {
      console.log("NFT Minted Event:", event);
      fetchData(); // Update count when an NFT is minted
    });

    // Clean up the listener on component unmount
    return () => {
      program.removeEventListener(listener);
    };
  }, [program]);

  return <p className="text-lg">Count: {nftCount.toString()}</p>;
}
