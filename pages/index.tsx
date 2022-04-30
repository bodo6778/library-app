import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Actions from "../src/components/Actions";
import BooksTable from "../src/components/BooksTable";
import Logo from "../src/components/Logo";
import RentedBooksTable from "../src/components/RentedBooksTable";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Library App</title>
        <meta
          name="description"
          content="A place where you can rent your favourite books."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Logo />
        <Actions />
        <Flex gap={8} direction={{ base: "column", xl: "row" }}>
          <BooksTable />
          <RentedBooksTable />
        </Flex>
      </main>
    </div>
  );
};

export default Home;
