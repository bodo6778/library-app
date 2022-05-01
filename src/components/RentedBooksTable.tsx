import { RepeatClockIcon } from "@chakra-ui/icons";
import {
  Text,
  Grid,
  GridItem,
  Divider,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { booksState, rentedBooksState } from "../state/atoms";
import { book } from "../types/interfaces";

interface RentedBooksTableProps {}

/**
 * If the there are more than 14 days between beginningDate and endDate
 * returns the price increased by 1% for every day passed
 * @param price
 * @param beginningDate
 * @param endDate
 */
const priceIncrease = (price: number, beginningDate: Date, endDate: Date) => {
  const daysBetweenDates = Math.floor(
    (endDate.getTime() - beginningDate.getTime()) / (1000 * 3600 * 24)
  );
  return daysBetweenDates > 14
    ? price + price * 0.01 * daysBetweenDates
    : price;
};

const RentedBooksTable: React.FC<RentedBooksTableProps> = () => {
  const [rentedBooks, setRentedBooks] = useRecoilState(rentedBooksState);
  const [currentBooks, setCurrentBooks] = useRecoilState(booksState);
  const dateNow = new Date();

  const tableHead = (
    <>
      <Text fontWeight="semibold" textTransform="uppercase">
        Title
      </Text>
      <Text fontWeight="semibold" textTransform="uppercase">
        Renter
      </Text>
      <Text
        fontWeight="semibold"
        textTransform="uppercase"
        display={{ base: "none", lg: "initial" }}
      >
        ISBN
      </Text>
      <Text fontWeight="semibold" textTransform="uppercase">
        To pay
      </Text>
      <Text fontWeight="semibold" textTransform="uppercase">
        Date of rent
      </Text>
      <Text fontWeight="semibold" textTransform="uppercase">
        Return now
      </Text>
    </>
  );

  const divider = (
    <GridItem colSpan={6}>
      <Divider />
    </GridItem>
  );

  const removeRentedBook = (book: book) => {
    setRentedBooks([...rentedBooks.filter((b) => b.id !== book.id)]);
    setCurrentBooks([...currentBooks, book]);
  };

  return (
    <Grid
      templateColumns={{ base: "repeat(5, 1fr)", lg: "repeat(6, 1fr)" }}
      columnGap={6}
      rowGap={2}
      textAlign="center"
      overflowX="hidden"
      p={4}
    >
      {tableHead}
      {rentedBooks.map((book: book, key) => {
        return (
          <>
            {divider}
            <Text key={key}>{book.title}</Text>
            <Text key={key}>{book.renter}</Text>
            <Text display={{ base: "none", lg: "initial" }} key={key}>
              {book.isbn}
            </Text>
            <Text key={key}>
              {priceIncrease(book.price, book.dateOfRent || dateNow, dateNow)}
            </Text>
            <Text key={key}>{book.dateOfRent?.toDateString()}</Text>
            <Flex justifyContent="center">
              <IconButton
                key={key}
                aria-label="Return book now"
                icon={<RepeatClockIcon />}
                width={4}
                onClick={() => removeRentedBook(book)}
              />
            </Flex>
          </>
        );
      })}
      {divider}
      {tableHead}
    </Grid>
  );
};

export default RentedBooksTable;
