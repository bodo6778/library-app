import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { rentedBooksState } from "../state/atoms";
import { book } from "../types/interfaces";

interface RentedBooksTableProps {}

const RentedBooksTable: React.FC<RentedBooksTableProps> = () => {
  const rentedBooks = useRecoilValue(rentedBooksState);
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>The rended books</TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>ISBN</Th>
              <Th>Renter</Th>
              <Th isNumeric>To pay</Th>
              <Th>Date of rent</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rentedBooks.map((book: book, key) => {
              return (
                <Tr key={key}>
                  <Td>{book.title}</Td>
                  <Td>{book.isbn}</Td>
                  <Td>{book.renter}</Td>
                  <Td isNumeric>{book.price}</Td>
                  <Td>{book.dateOfRent?.toDateString()}</Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Title</Th>
              <Th>ISBN</Th>
              <Th>Renter</Th>
              <Th isNumeric>Price</Th>
              <Th>Date of rent</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default RentedBooksTable;
