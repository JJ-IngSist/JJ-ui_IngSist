import React, { useState } from "react";

const UserNode = ({ user, number, setUser }) => {

  function handleOnClick() {
    setUser(user);
  }

  return (
    <button
      className={`buttonPanel-box buttonPanel-text-${number}`}
      onClick={handleOnClick}
    >
      {user.name}
    </button>
  );
};

export default UserNode;
