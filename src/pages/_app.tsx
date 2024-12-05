import "@/styles/globals.css";
import type { AppProps } from "next/app";

import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mysten/dapp-kit/dist/index.css";
import { darkTheme } from "@/config/theme";
import { NextUIProvider } from "@nextui-org/react";

const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl("mainnet") },
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
          <WalletProvider theme={darkTheme}>
            <Component {...pageProps} />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}
