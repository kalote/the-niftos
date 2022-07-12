import { useState, useEffect } from 'react';
import { useMetamask, useDisconnect, useNFTDrop, useAddress } from '@thirdweb-dev/react';
import Head from 'next/head';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Loading from '../components/Loading';
import useFetcher from '../utils/fetch';

const styles = {
  wrapper: 'flex flex-col h-screen max-h-screen h-min-screen w-screen text-white justify-between',
};

const Home = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const fetcher = useFetcher();
  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_NFT_DROP_ADDRESS);

  const [loading, setLoading] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const [nftPrice, setNFTPrice] = useState(0);

  useEffect(() => {
    if (!address) return;

    const getNFTDropDetails = async () => {
      setLoading(true);
      try {
        const { totalSupply, nftPrice } = await fetcher.get('/api/get-nft-drop');
        setTotalSupply(totalSupply);
        setNFTPrice(nftPrice);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getNFTDropDetails();
  }, [address]);

  const mintNFT = async () => {
    if (!nftDrop) return;

    setLoading(true);
    try {
      const quantity = 1;
      await nftDrop.claimTo(address, quantity);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>The Niftos | NFT Drop | Ⓒ Ronzo </title>
        <link rel="shortcut icon" href="/images/logo.png" />
      </Head>

      {loading && <Loading />}

      <Hero
        mintNFT={mintNFT}
        totalSupply={totalSupply}
        nftPrice={nftPrice}
        connectWithMetamask={connectWithMetamask}
      />
      <Footer />
    </div>
  );
};

export default Home;
