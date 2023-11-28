import { useState, useEffect } from "react";
import abi from "./contractJson/chai.json";
import { ethers } from "ethers";
import Memos from "./components/Memos";
import Buy from "./components/Buy";
import chai from "./chai.png";
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
      const contractAddress = "0x0640a3dDbBAF1FB4fF8d89f447cb06Ffe45D1176";
      const contractABI = abi.abi;

      //metamask
      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
        const signer = provider.getSigner(); //write the blockchain

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
    template();
  }, []);
  const [imageHeight, setImageHeight] = useState("auto");

  useEffect(() => {
    const handleResize = () => {
      // Adjust the max-height based on your design
      const maxImageHeight = window.innerWidth <= 768 ? "900px" : "600px";
      setImageHeight(maxImageHeight);
    };

    // Initial adjustment
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div style={{ position: "relative" }}>
        <img
          src="https://imgs.search.brave.com/xegFDT9jlWlIID7ENwR7Vb0o-TLogG8FL3D2Vd_aWPI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dGFzdGluZ3RhYmxl/LmNvbS9pbWcvZ2Fs/bGVyeS90aGUtcmFw/aWRseS1ncm93aW5n/LWNvZmZlZS1jaGFp/bi10aGF0LW9ubHkt/bG9va3MtaW5kaWUv/aW50cm8tMTY2MjA2/MjE1MS5qcGc"
          className="img-fluid"
          alt=".."
          style={{
            width: "100%",
            height: imageHeight,
            maxWidth: "100%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "80%", // Adjust the width based on your design
            margin: "0 auto", // Center the element
          }}
        >
          <p
            style={{
              color: "Blue",
              fontSize: "44px",
              fontWeight: "bold",
              marginTop: "80px",
              fontStyle: "italic",
            }}
          >
            Buy <span style={{ color: "red" }}>your</span>
            <span style={{ color: "yellow" }}> coffee</span>
          </p>
          <Buy state={state} account={account} />
        </div>
        {/* Add other components if needed */}
      </div>
      <div style={{ marginTop: "110px" }}>
        {" "}
        <h1 style={{ textAlign: "center" }}> Transaction History</h1>
        <Memos state={state} />
      </div>
    </>
  );
}

export default App;
