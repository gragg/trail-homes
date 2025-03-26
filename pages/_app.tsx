import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css'; // Import your global CSS here

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Northwest Arkansas Trail Homes</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}