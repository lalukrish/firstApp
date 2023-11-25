import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  useEffect(() => {
    const template = async () => {
      const contractAddress = "";
      const contractABI = "";

      //metamask
      try {
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum); //read the blockchain
        const signer = provider.getSigner(); //write the blockchain

        const contract = new ethers.Conract(
          contractAddress,
          contractABI,
          signer
        );
        setState(provider, signer, contract);
      } catch (err) {
        alert(err);
        console.log("err", err);
      }
    };
    template();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}

export default App;
