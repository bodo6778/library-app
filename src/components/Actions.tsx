import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import AddBookModal from "./AddBookModal";
import RentBookModal from "./RentBookModal";

interface ActionsProps {}

const Actions: React.FC<ActionsProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRentOpen,
    onOpen: onRentOpen,
    onClose: onRentClose,
  } = useDisclosure();

  return (
    <Flex gap={4} p={6}>
      <Button onClick={onOpen} colorScheme="orange">
        Add Book
      </Button>
      <Button onClick={onRentOpen} colorScheme="teal">
        Rent
      </Button>
      <AddBookModal isOpen={isOpen} onClose={onClose} />
      <RentBookModal isOpen={isRentOpen} onClose={onRentClose} />
    </Flex>
  );
};

export default Actions;
