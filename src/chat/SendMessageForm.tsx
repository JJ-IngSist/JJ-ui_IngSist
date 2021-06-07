import React from "react";
import "./chat.scss";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

const arrow = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.3208 13.8842L1.85348 0.132036C1.6382 0.0242271 1.39639 -0.0189696 1.15716 0.00764733C0.917931 0.0342642 0.691485 0.12956 0.505089 0.282059C0.327081 0.431449 0.194217 0.627597 0.121433 0.848454C0.0486481 1.06931 0.0388291 1.30612 0.0930796 1.53226L3.78868 14.9969L0.0431391 28.424C-0.00776714 28.6129 -0.0137095 28.811 0.0257901 29.0026C0.0652897 29.1942 0.149129 29.3738 0.270567 29.527C0.392004 29.6802 0.547652 29.8028 0.724994 29.8848C0.902336 29.9668 1.09642 30.006 1.29165 29.9993C1.4871 29.9981 1.67954 29.951 1.85348 29.8617L29.3208 16.1096C29.5253 16.0046 29.6969 15.8453 29.8167 15.6489C29.9366 15.4526 30 15.227 30 14.9969C30 14.7668 29.9366 14.5412 29.8167 14.3448C29.6969 14.1485 29.5253 13.9891 29.3208 13.8842ZM3.22685 26.3862L5.98606 16.2471H17.5223V13.7467H5.98606L3.22685 3.60758L25.9623 14.9969L3.22685 26.3862Z"
      fill="white"
      fillOpacity="0.7"
    />
  </svg>
);

const SendMessageForm = ({ handleSubmit, handleChange, message }) => {
  return (
    <div className="send-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="send-input"
          placeholder="Escribí algo"
          value={message}
          onChange={(event) => handleChange(event)}
        />
        <button disabled={message===''} className="send-button">
          <SendIcon/>
        </button>
      </form>
    </div>
  );
};

export default SendMessageForm;
