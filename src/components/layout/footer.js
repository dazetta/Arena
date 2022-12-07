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
      <div
        id="notice-container"
        style={{
          "background-color": "orange",
          color: "black",
          width: "100%",
          padding: "10px 20px",
          "text-align": "center",
          "border-top": "4px solid white",
          bottom: "0px",
          "z-index": "999999",
        }}
      >
        <p
          style={{
            "font-size": "12px",
            "line-height": "16px",
            "margin-bottom": "0px",
            "text-align": "left",
          }}
        >
          ATTENTION: This Website is for training and demonstration purposes
          only. It is not intended to be a live production website and the
          privacy notices we provide in our live websites do not apply to this
          website.
          <br />
          <br />
          If you provide your personal data during the training or
          demonstrations, we will collect and store your personal information as
          part of the training and demonstration functions of the website. This
          information will be used solely to provide the training and
          demonstrations and for no other purposes. It is possible that some
          third party technology is implemented as part of this website. Such
          third-party technology may collect and store the information provided
          by you. We recommend that you do not provide any personal information
          to us in your use of this website. However, if you do participate in
          the training or demonstrations of this website, the information you
          provide is solely in your discretion and at your own risk. If you do
          not wish to participate please do not use this website.
        </p>
      </div>
    </div>
  );
};

export default Footer;
