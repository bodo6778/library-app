import { Grid, GridItem, Flex, Text, Divider } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { booksState } from "../state/atoms";
import { book } from "../types/interfaces";

interface BooksTableProps {}

const BooksTable: React.FC<BooksTableProps> = () => {
  const currentBooks = useRecoilValue(booksState);

  // Remove duplicates from books
  const filteredBooks = currentBooks.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.isbn === value.isbn)
  );

  const tableHead = (
    <>
      <Text fontWeight="semibold" textTransform="uppercase">
        Title
      </Text>
      <Text fontWeight="semibold" textTransform="uppercase">
        Author
      </Text>
      <Text
        fontWeight="semibold"
        textTransform="uppercase"
        display={{ base: "none", lg: "initial" }}
      >
        ISBN
      </Text>
      <Text fontWeight="semibold" textTransform="uppercase">
        Price
      </Text>
      <Text fontWeight="semibold" textTransform="uppercase">
        Copies
      </Text>
    </>
  );

  return (
    <Grid
      templateColumns={{ base: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }}
      columnGap={6}
      rowGap={2}
      textAlign="center"
      p={4}
    >
      {tableHead}
      {filteredBooks.map((book: book, key) => {
        return (
          <>
            <GridItem colSpan={5} key={key}>
              <Divider />
            </GridItem>
            <Text key={key}>{book.title}</Text>
            <Text key={key}>{book.author || ""}</Text>
            <Text key={key} display={{ base: "none", lg: "initial" }}>
              {book.isbn}
            </Text>
            <Text key={key}>{book.price}</Text>
            <Text key={key}>
              {currentBooks.reduce(
                (acc, currentBook) =>
                  currentBook.isbn === book.isbn ? ++acc : acc,
                0
              )}
            </Text>
          </>
        );
      })}
      <GridItem colSpan={5}>
        <Divider />
      </GridItem>

      {tableHead}
    </Grid>
  );
};

export default BooksTable;
