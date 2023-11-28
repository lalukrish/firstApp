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
  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    overflowX: "auto",
  };

  const tableCellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const tableRowStyle = {
    borderBottom: "1px solid #ddd",
  };
  const responsiveTableCellStyle = {
    ...tableCellStyle,
    fontSize: "12px", // Adjust the font size for smaller screens
  };
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableCellStyle}>Name</th>
            <th style={tableCellStyle}>Message</th>
            <th style={tableCellStyle}>Timestamp</th>
            <th style={tableCellStyle}>From</th>
          </tr>
        </thead>
        <tbody>
          {memos?.map((memo, i) => (
            <tr key={i} style={tableRowStyle}>
              <td style={responsiveTableCellStyle}>{memo?.name}</td>
              <td style={responsiveTableCellStyle}>{memo?.message}</td>
              <td style={responsiveTableCellStyle}>
                {new Date(memo?.timestamp * 1000).toLocaleString()}
              </td>
              <td style={responsiveTableCellStyle}>{memo?.from}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Memos;
