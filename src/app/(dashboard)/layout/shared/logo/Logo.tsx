import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import React from "react";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/FaviconIcon2.png" alt="logo" height={70} width={70} priority />
    </LinkStyled>
  );
};

export default Logo;
