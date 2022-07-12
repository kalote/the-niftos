import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Rinkeby}
      chainRpc={{
        [ChainId.Rinkeby]: process.env.NEXT_PUBLIC_RPC_URL,
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
};

export default MyApp;
