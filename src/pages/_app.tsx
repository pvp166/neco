import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { StoreProvider } from "@/context/StoreContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import '@/styles/globals.css';
import nextI18NextConfig from '../../next-i18next.config.js'
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Match Vuetify's xs breakpoint
      sm: 600, // Match Vuetify's sm breakpoint
      md: 960, // Match Vuetify's md breakpoint
      lg: 1280, // Match Vuetify's lg breakpoint
      xl: 1920, // Match Vuetify's xl breakpoint
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  </ThemeProvider>
);

export default appWithTranslation(MyApp, nextI18NextConfig);
