import {
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Divider,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { booksState } from "../state/atoms";
import { book } from "../types/interfaces";

interface AddBookFormProps {
  onClose?: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState(0);
  const [author, setAuthor] = useState("");

  const [books, setBooks] = useRecoilState(booksState);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleIsbnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setIsbn(e.target.value);
  const handlePriceChange = (value: any) => setPrice(value);
  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAuthor(e.target.value);

  const onSubmit = () => {
    const newBook: book = {
      id: Math.max.apply(
        Math,
        books.map((book) => book.id)
      ),
      title: title,
      isbn: isbn,
      price: price,
      author: author,
    };
    setBooks([...books, newBook]);
    onClose && onClose();
  };

  return (
    <form>
      <FormControl isRequired>
        {/* ---------------- TITLE ---------------- */}
        <FormLabel>Book Title</FormLabel>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="How is the book called?"
        />
        {/* ---------------- ISBN ---------------- */}
        <FormLabel mt={2}>ISBN</FormLabel>
        <Input
          id="isbn"
          type="text"
          value={isbn}
          onChange={handleIsbnChange}
          placeholder="What is the ISBN of the book?"
        />
        <Divider />
        {/* ---------------- PRICE ---------------- */}
        <FormLabel mt={2}>Rent Price</FormLabel>
        <NumberInput
          min={0}
          onChange={(_, valueAsNumber) => handlePriceChange(valueAsNumber)}
        >
          <NumberInputField
            id="price"
            value={price}
            placeholder="How much it costs to rent it?"
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Divider />
        {/* ---------------- AUTHOR ---------------- */}
        <FormControl>
          <FormLabel mt={2} optionalIndicator>
            Book Author
          </FormLabel>
          <Input
            id="author"
            type="text"
            value={author}
            onChange={handleAuthorChange}
            placeholder="Who wrote the book?"
          />
        </FormControl>
      </FormControl>
      <Flex pt={6} justifyContent="end">
        <Button onClick={onSubmit} colorScheme="blue" mr={3}>
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Flex>
    </form>
  );
};

export default AddBookForm;
