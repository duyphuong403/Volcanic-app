import "../styles/global.scss";

import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { useSWRConfig } from "swr";

import LayoutMain from "../components/layout/main/LayoutMain";

const CustomApp = (props: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Recruitment Dashboard | Access Volcanic</title>
        <meta name="description" content="This website serves recruiters to manage the job that they want to advertise" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#e5173f" />
      </Head>

      <RecoilRoot>
        <App {...props} />
      </RecoilRoot>
    </>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  const { cache } = useSWRConfig();

  // swr clean cache for new page props
  Object.keys(pageProps).forEach((key) => {
    cache.delete(key);
  });

  return (
    <LayoutMain>
      <Component {...pageProps} />
    </LayoutMain>
  );
};

export default CustomApp;
