import { createContext, useState } from "react";


export const UserContext = createContext();

// Crea el componente de proveedor del contexto del usuario
export function UserProvider ({ children }){

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};