import React, {useEffect, useState} from "react";
import {User} from "../utils/models";
import UserNode from "./UserNode";
import {get, userUrl} from "../utils/http";

const ButtonPanel = ({ setActiveUser }) => {

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    get(userUrl + 'user/followed').then(res => {
      setUsers(res)
      console.log(res)
    }).catch()
  }, [])

  return (
    <div className="button-container">
      <div className="button-container-title">
        <span> Contactos </span>
      </div>

      <div className="button-each">
        {users.map((r, i) => {
          return (
            <UserNode
              user={r}
              key={i}
              number={i}
              setUser={setActiveUser}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ButtonPanel;
