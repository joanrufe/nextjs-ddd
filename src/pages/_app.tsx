import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Layout from "@/frontend/components/Layout";
import "@/styles/globals.css";
import { api } from "@/api-utils/client";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default api.withTRPC(App);
