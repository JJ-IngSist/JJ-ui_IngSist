import React, {useEffect, useState} from "react";
import {User} from "../utils/models";
import UserNode from "./UserNode";
import {get, messageUrl, userUrl} from "../utils/http";

const ButtonPanel = ({ setActiveUser, setConversation, connect, disconnect }) => {

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    get(userUrl + 'user/followed').then(res => {
      setUsers(res)
    }).catch()
  }, [])

  return (
    <div className="button-container">
      <div className="button-container-title">
        <span> Contacts </span>
      </div>

      <div className="button-each">
        {users.map((r, i) => {
          return (
            <UserNode
              user={r}
              key={i}
              number={i}
              setUser={setActiveUser}
              setConversation = {setConversation}
              connect={connect}
              disconnect={disconnect}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ButtonPanel;
