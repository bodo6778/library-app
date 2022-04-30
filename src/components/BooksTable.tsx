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

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>The collection of books</TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>ISBN</Th>
              <Th isNumeric>Price</Th>
              <Th>Copies</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBooks.map((book: book, key) => {
              return (
                <Tr key={key}>
                  <Td>{book.title}</Td>
                  <Td>{book.author || ""}</Td>
                  <Td>{book.isbn}</Td>
                  <Td isNumeric>{book.price}</Td>
                  <Td>
                    {currentBooks.reduce(
                      (acc, currentBook) =>
                        currentBook.title === book.title ? ++acc : acc,
                      0
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>ISBN</Th>
              <Th isNumeric>Price</Th>
              <Th>Copies</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default BooksTable;
