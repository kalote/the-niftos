import { CheckIcon, ClockIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Login from '../components/Login';

const styles = {
  wrapper: 'flex w-full items-center justify-center pt-[122px] text-center',
  heroTitle: 'text-6xl font-bold',
  heroMarginTop: 'mt-16',
  heroParagraph: 'px-40 text-l',
  heroCatchphrase: "px-40 text-2xl font-['MonumentExtended'] mt-8 tracking-wider",
  heroSub: 'px-40 text-xl mt-2 tracking-wide',
  heroTwitter: 'mt-8',
};

const Hero = ({ mintNFT, totalSupply, claimedSupply, nftPrice, connectWithMetamask }) => {
  //   const timelines = claimPhases.map(phase => {
  //     const now = new Date().getTime();
  //     const hasPast = now > phase.startTime;

  //     return {
  //       ...phase,
  //       icon: hasPast ? CheckIcon : ClockIcon,
  //       iconBackground: hasPast ? 'bg-green-500' : 'bg-gray-400',
  //     };
  //   });

  return (
    <main className={styles.wrapper}>
      <div>
        <Image src="/images/title.png" width={600} height={140} layout="fixed" />

        <p className={`${styles.heroParagraph} ${styles.heroMarginTop}`}>
          The Niftos are a generative NFT project on the Ethereum Blockchain. <br />
          These fantastical alien lifeforms are especially crafted using <br />
          cutting edge AI and Machine Learning technology. Each Nifto is a one
          <br />
          of a kind unique 3D avatar. Join and build the Niftoverse together.
        </p>
        <p className={styles.heroCatchphrase}>Niftos ‘Alphas’ now minting</p>
        <p className={styles.heroSub}>
          {claimedSupply} / {totalSupply} claimed | Price: {nftPrice} Eth
        </p>

        <Login login={connectWithMetamask} mintNFT={mintNFT} />

        <p className={styles.heroTwitter}>
          <a href="https://twitter.com/rzo1" target={'_blank'}>
            <Image src="/images/logoTwitter.svg" width={49} height={40} layout="fixed" />
          </a>
        </p>

        {/* <ul>
          {timelines.map((timeline, index) => (
            <Timeline
              key={index}
              index={index}
              timeline={timeline}
              isLastTimeline={timelines.length === index + 1}
            />
          ))}
        </ul> */}
      </div>
    </main>
  );
};

export default Hero;
