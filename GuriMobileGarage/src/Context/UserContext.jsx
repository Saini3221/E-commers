import React, { useState } from "react";
export const UserContext = React.createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState(false);
  
  

  return (
    <UserContext.Provider value={{ user, setUser, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

// UserContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default UserContextProvider;
