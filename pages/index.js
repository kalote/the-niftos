import { useState, useEffect } from 'react';
import { useMetamask, useNFTDrop, useAddress } from '@thirdweb-dev/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const toastOptions = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  };

  const [loading, setLoading] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const [claimedSupply, setClaimedSupply] = useState(0);
  const [nftPrice, setNFTPrice] = useState(0);

  const getNFTDropDetails = async () => {
    setLoading(true);
    try {
      const { claimedSupply, totalSupply, nftPrice } = await fetcher.get('/api/get-nft-drop');
      setTotalSupply(totalSupply);
      setClaimedSupply(claimedSupply);
      setNFTPrice(nftPrice);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNFTDropDetails();
  }, []);

  const mintNFT = async () => {
    if (!nftDrop) return;
    if (!address) return;

    setLoading(true);
    try {
      const quantity = 1;
      await nftDrop.claimTo(address, quantity);
      const { claimedSupply } = await fetcher.get('/api/get-nft-drop');
      setClaimedSupply(claimedSupply);
      toast.success('Nifto Successfully Minted!', toastOptions);
    } catch (error) {
      console.log(error);
      if (error.message.includes('insufficient')) {
        toast.error('Insufficient funds!', toastOptions);
      } else {
        toast.error('Something went wrong!', toastOptions);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <Head>
        <title>The Niftos | NFT Drop | Ⓒ Ronzo </title>
        <link rel="shortcut icon" href="/images/logo.png" />
      </Head>

      {loading && <Loading />}

      <Hero
        mintNFT={mintNFT}
        totalSupply={totalSupply}
        claimedSupply={claimedSupply}
        nftPrice={nftPrice}
        connectWithMetamask={connectWithMetamask}
      />
      <Footer />
    </div>
  );
};

export default Home;
