import React, { useState } from "react";
// import PropTypes from "prop-types";

export const UserContext = React.createContext(null);

function UserContextProvider({ children }) {
  const [user, setUser] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// UserContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default UserContextProvider;
