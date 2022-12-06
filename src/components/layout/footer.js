import React from "react";

const Footer = () => {
  let footerStyle = {
    // paddingTop: "10px",
    // position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    backgroundColor: "#1C1C20",
  };

  let footerTextStyle = {
    fontSize: "14px",
    color: "#aaaaaa",
    textAlign: "center",
    margin: "0px",
  };

  return (
    <div className="jumbotron mt-5" style={footerStyle}>
      <p style={footerTextStyle}>
        Transactions on this site are not real.
        <br />
        Forked from <a href="http://localhost:3000/">GitHub</a>
        <br />
        File bugs and feedback under{" "}
        <a href="http://localhost:3000/">Feedback and Issues</a>
      </p>
    </div>
  );
};

export default Footer
