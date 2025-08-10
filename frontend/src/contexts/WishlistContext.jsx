import { createContext } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children, value }) => {
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContext };
