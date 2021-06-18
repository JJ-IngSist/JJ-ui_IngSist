import React, {Fragment} from "react";
import "./chat.scss";

function MessageList({ chat }) {

  const logged = +localStorage.getItem('id')

  return (
    chat && (
      <Fragment>
        <div className="chat-list">
          {chat.map((message, i) => {
            const { text, sender_id } = message;
            let textToHtml = text.toString().replace(/(?:\r\n|\r|\n)/g, "<br>");
            return (
              <div key={i} className={`msg-box-${logged === sender_id ? "user" : "watson"}`}>
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
          })}
          <div id="thisistheend" style={{ float: "left" }} />
        </div>
      </Fragment>
    )
  );
}

export default MessageList;
