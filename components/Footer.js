import Image from 'next/image';

const styles = {
  wrapper: 'w-screen flex justify-between items-center',
  copyright: 'flex justify-start p-10',
  logoContainer: 'flex justify-end p-10',
};

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.copyright}>
        <p>Ⓒ The Niftos. All Right Reserved</p>
      </div>
      <div className={styles.logoContainer}>
        <a href="https://ronzo.co.uk/" target={'_blank'}>
          <Image src="/images/logo.png" width={40} height={55} layout="fixed" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
