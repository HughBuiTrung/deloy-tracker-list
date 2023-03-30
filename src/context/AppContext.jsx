import React from 'react';
import { message, Spin } from "antd";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <AppContext.Provider 
      value={{
        // states
        messageApi,

        // actions
        setIsLoading
      }}
    >
      {children}
      {contextHolder}

      {isLoading && (
        <div className="spin">
          <Spin />
        </div>
      )}
     
    </AppContext.Provider>
  )
}

export const useAppContext = () => React.useContext(AppContext);