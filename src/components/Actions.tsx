import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { booksState, rentedBooksState } from "../state/atoms";
import { defaultBooks } from "../types/mockData";
import AddBookModal from "./AddBookModal";
import RentBookModal from "./RentBookModal";

interface ActionsProps {}

const Actions: React.FC<ActionsProps> = () => {
  const setCurrentBooks = useSetRecoilState(booksState);
  const setRentedBooks = useSetRecoilState(rentedBooksState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRentOpen,
    onOpen: onRentOpen,
    onClose: onRentClose,
  } = useDisclosure();

  return (
    <Flex gap={4} p={6}>
      <Button onClick={onOpen} colorScheme="blue">
        Add Book
      </Button>
      <Button onClick={onRentOpen} colorScheme="teal">
        Rent
      </Button>
      <Button
        onClick={() => {
          setCurrentBooks(defaultBooks);
          setRentedBooks([]);
        }}
        colorScheme="red"
      >
        Reset State
      </Button>
      <AddBookModal isOpen={isOpen} onClose={onClose} />
      <RentBookModal isOpen={isRentOpen} onClose={onRentClose} />
    </Flex>
  );
};

export default Actions;
