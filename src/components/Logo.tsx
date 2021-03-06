import { Heading } from "@chakra-ui/react";
import React from "react";

interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
  return (
    <Heading p={8} as="h2" size="2xl">
      The Library
    </Heading>
  );
};

export default Logo;
