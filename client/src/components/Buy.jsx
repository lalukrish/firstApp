import { ethers } from "ethers";
import { useState } from "react";

const Buy = ({ state, account }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = { value: ethers.utils.parseEther("0.0001") };
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
    alert("trasaction  successfull");
    window.location.reload();
  };
  const selectedAccount = Array.isArray(account) ? account[0] : account;

  // Format the account number to display only the first three and last three characters with ellipses
  const truncatedAccount =
    typeof selectedAccount === "string" && selectedAccount.length > 6
      ? `${selectedAccount.slice(0, 3)}...${selectedAccount.slice(-3)}`
      : selectedAccount;
  return (
    <>
      <form
        onSubmit={buyChai}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: isHovered ? "purple" : "violet",
            padding: "45px",
            borderRadius: "10px",
            marginBottom: "25px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p
            style={{
              marginTop: "10px",
              marginLeft: "5px",
              color: isHovered ? "white" : "black",
            }}
          >
            <small>Connected Account - {truncatedAccount}</small>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                boxSizing: "border-box",
                margin: "0",
              }}
            />
            <input
              type="text"
              id="message"
              placeholder="Your Message"
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                boxSizing: "border-box",
                margin: "0",
              }}
            />
          </div>
        </div>
        <button
          style={{
            backgroundColor: isHovered ? "purple" : "violet",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Buy;
