import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppLoading from "@/components/base/AppLoading";
import ToastContainer from "@/components/base/toast/ToastContainer";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", (path) => {
      if (window && path !== window.location.pathname) {
        setLoading(true);
      }
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, [router]);

  return (
    <>
      {loading && <AppLoading />}
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
