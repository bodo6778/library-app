import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { booksState, rentedBooksState } from "../state/atoms";
import { book } from "../types/interfaces";

interface RentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RentBookModal: React.FC<RentModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [selectedBook, setSelectedBook] = useState<book>();
  const [rentedBooks, setRentedBooks] = useRecoilState(rentedBooksState);
  const [books, setBooks] = useRecoilState(booksState);

  const filteredBooks = books.filter((book) => {
    if (bookTitle === "") {
      return book;
    }
    //return the item which contains the user input
    else {
      return book.title.toLowerCase().includes(bookTitle);
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rent a book 📕</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Who rents it?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormLabel>Search book</FormLabel>
            <Input
              placeholder={selectedBook?.title || "What book?"}
              value={bookTitle}
              onChange={(e) => {
                setBookTitle(e.target.value);
                setSelectedBook(undefined);
              }}
            />
          </FormControl>
          {selectedBook && (
            <Box bg="gray.100" p={2} mt={4} borderRadius={4}>
              <Text fontWeight="semibold">You will rent:</Text>
              <Text>{selectedBook.title}</Text>
              {selectedBook.author && <Text>By {selectedBook.author}</Text>}
              <Text>ISBN: {selectedBook.isbn}</Text>
              <Text>Price: {selectedBook.price}</Text>
            </Box>
          )}
          {bookTitle !== "" && (
            <TableContainer mt={4}>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredBooks.map((book, key) => {
                    return (
                      <Tr key={key} p="1px">
                        <Td
                          _hover={{
                            backgroundColor: "gray.100",
                            cursor: "pointer",
                          }}
                          _focus={{
                            backgroundColor: "green.400",
                          }}
                          onClick={() => {
                            setBookTitle("");
                            setSelectedBook(book);
                          }}
                        >
                          {book.title}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              if (selectedBook) {
                setRentedBooks([
                  ...rentedBooks,
                  { ...selectedBook, renter: name, dateOfRent: new Date() },
                ]);
                setBooks([
                  ...books.filter((book) => book.id !== selectedBook.id),
                ]);
              }
              setName("");
              setBookTitle("");
              onClose();
            }}
          >
            Rent
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RentBookModal;
