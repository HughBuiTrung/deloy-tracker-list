import React from 'react';
import { message } from "antd";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <AppContext.Provider 
      value={{
        messageApi
      }}
    >
      {children}
      {contextHolder}
    </AppContext.Provider>
  )
}

export const useAppContext = () => React.useContext(AppContext);