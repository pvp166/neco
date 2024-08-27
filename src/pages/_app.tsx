import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { StoreProvider } from "@/context/StoreContext";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>
);

export default appWithTranslation(MyApp);
