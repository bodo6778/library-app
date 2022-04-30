import { Text, Grid, GridItem, Divider } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { rentedBooksState } from "../state/atoms";
import { book } from "../types/interfaces";

interface RentedBooksTableProps {}

const RentedBooksTable: React.FC<RentedBooksTableProps> = () => {
  const rentedBooks = useRecoilValue(rentedBooksState);
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
    </>
  );

  return (
    <Grid
      templateColumns={{ base: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }}
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
            <GridItem colSpan={5}>
              <Divider />
            </GridItem>
            <Text>{book.title}</Text>
            <Text>{book.renter}</Text>
            <Text display={{ base: "none", lg: "initial" }}>{book.isbn}</Text>
            <Text>{book.price}</Text>
            <Text>{book.dateOfRent?.toDateString()}</Text>
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

export default RentedBooksTable;
