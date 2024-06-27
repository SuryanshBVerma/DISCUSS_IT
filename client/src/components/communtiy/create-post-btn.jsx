import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsLink45Deg } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoCreateOutline } from "react-icons/io5";
import {
  sortByLatest,
  sortByLikes,
  sortByComments,
} from "../../redux/sortingSlice";
import { useState } from "react";

export const CreatePostBtn = ({ handleSort }) => {
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("Sort By");

  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="black"
      height="56px"
      borderRadius={8}
      p={2}
      fontFamily={"outfit"}
      mb={4}
    >
      <Icon as={IoCreateOutline} fontSize={30} color="white" mr={2} ml={1} mb={1} />
      <Input
        placeholder="Create Post...."
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={8}
        mr={4}
        // color={"#50288c"}
        onClick={() => navigate("/submit")}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="white"
        cursor="pointer"
      />
      {/* <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" /> */}
      <Menu
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        _hover={{
          bg: "gray.700",
        }}
      >
        {({ isOpen }) => (
          <>
            <MenuButton
              fontSize="11pt"
              borderRadius={8}
              border={"1px"}
              borderColor="white"
              bg="black"
              color="white"
              height="36px"
              // transition="background-color 0.5s ease-in-out, color 0.5s ease-in-out"
              _hover={{
                color: "purple.400",
              }}
              _active={{
                bg: "black",
                color: "white",
                borderColor: "white",
              }}
              _focus={{
                bg: "black",
                color: "white",
                borderColor: "white",
                boxShadow: "none",
              }}
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              minW={36}
            >
              {sortBy}
            </MenuButton>

            <MenuList
              boxShadow={isOpen ? "0px 8px 24px rgba(0, 0, 0, 0.4)" : "none"}
            >
              <MenuItem
                fontSize="10pt"
                fontWeight={"semibold"}
                onClick={() => {
                  setSortBy("Latest");
                  handleSort("createdAt");
                }}
              >
                Latest
              </MenuItem>
              <MenuItem
                fontSize="10pt"
                fontWeight={"semibold"}
                as={"button"}
                onClick={() => {
                  setSortBy("Likes");
                  handleSort("upvotedBy");
                }}
              >
                Likes
              </MenuItem>
              <MenuItem
                fontSize="10pt"
                fontWeight={"semibold"}
                as={"button"}
                onClick={() => {
                  setSortBy("Comments");
                  handleSort("commentCount");
                }}
              >
                Comments
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};
