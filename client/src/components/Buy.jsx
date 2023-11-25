import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = { value: ethers.utils.parseEther("0.0001") };
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
    console.log("trasaction is successfull");
  };
  return (
    <>
      <form onSubmit={buyChai}>
        <input id="name"></input>
        <input id="message"></input>

        <button>submit</button>
      </form>
    </>
  );
};

export default Buy;
