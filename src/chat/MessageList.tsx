import React, { Fragment } from "react";
import "./chat.scss";

function MessageList({ chat }) {
  return (
    chat && (
      <Fragment>
        <div className="chat-list">
          {chat.map((message, i) => {
            const { text, watson } = message; //timestamp
            let textToHtml = text.toString().replace(/(?:\r\n|\r|\n)/g, "<br>");
            const renderText = (
              <div key={i} className={`msg-box-${watson ? "watson" : "user"}`}>
                {textToHtml === "[object Object]" ? (
                  <div className="msg-box-text">{text}</div>
                ) : (
                  <div
                    className={"msg-box-text"}
                    dangerouslySetInnerHTML={{
                      __html: textToHtml,
                    }}
                  />
                )}
              </div>
            );
            return renderText;
          })}
          <div id="thisistheend" style={{ float: "left" }} />
        </div>
      </Fragment>
    )
  );
}

export default MessageList;
