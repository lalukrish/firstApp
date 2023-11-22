import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  useEffect(() => {
    const template = async () => {
      const contractAddress = "";
      const contractABI = "";

      //metamask

      const { ethereum } = window;

      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });
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
