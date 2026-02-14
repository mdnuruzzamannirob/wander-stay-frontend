"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store/store";
// import AuthInitializer from '@/components/layout/AuthInitializer';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      {children}
      {/* <AuthInitializer>{children}</AuthInitializer> */}
    </ReduxProvider>
  );
};

export default Provider;
