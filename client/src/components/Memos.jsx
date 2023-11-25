import { useEffect, useState } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;
  useEffect(() => {
    const memoMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
      console.log(memos);
    };
    contract && memoMessage();
  }, [contract]);
  return (
    <div>
      {memos?.map((memo, i) => (
        <div key={i}>
          <p>{memo?.name}</p>
          <p>{memo?.message}</p>
          <p>{new Date(memo?.timestamp * 1000).toLocaleString()}</p>
          <p>{memo?.from}</p>
        </div>
      ))}
    </div>
  );
};

export default Memos;
