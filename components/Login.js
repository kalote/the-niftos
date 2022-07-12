import { useAddress } from '@thirdweb-dev/react';

const styles = {
  button:
    "rounded-full border-2 py-3 px-8 uppercase font-['MonumentExtended'] mt-8 text-xl tracking-widest",
};

const Login = ({ login, mintNFT }) => {
  const address = useAddress();
  return (
    <>
      {address ? (
        <button className={styles.button} onClick={mintNFT}>
          Mint Your NFT
        </button>
      ) : (
        <button className={styles.button} onClick={login}>
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default Login;
