import React, { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = (props) => {
  const [username, setUsername] = useState("Manan");

  return (
    <StateContext.Provider value={[username, setUsername]}>
      {props.children}
    </StateContext.Provider>
  );
};
