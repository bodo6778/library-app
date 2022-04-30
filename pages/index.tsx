import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import AddBookModal from "../src/components/AddBookModal";
import BooksTable from "../src/components/BooksTable";
import Logo from "../src/components/Logo";
import RentBookModal from "../src/components/RentBookModal";
import RentedBooksTable from "../src/components/RentedBooksTable";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRentOpen,
    onOpen: onRentOpen,
    onClose: onRentClose,
  } = useDisclosure();

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
        <Flex gap={4} p={6}>
          <Button onClick={onOpen} colorScheme="orange">
            Add Book
          </Button>
          <Button onClick={onRentOpen} colorScheme="teal">
            Rent
          </Button>
        </Flex>

        <AddBookModal isOpen={isOpen} onClose={onClose} />
        <RentBookModal isOpen={isRentOpen} onClose={onRentClose} />
        <Flex gap={8}>
          <BooksTable />
          <RentedBooksTable />
        </Flex>
      </main>
    </div>
  );
};

export default Home;
