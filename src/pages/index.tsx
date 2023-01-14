import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Page = () => {
  return (
    <>
      <Head>
        <title>FastClub</title>
        <meta
          name="description"
          content="Private fasting, currently on Android"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>Coming soon.</p>
      </main>
    </>
  );
};

export default Page;
