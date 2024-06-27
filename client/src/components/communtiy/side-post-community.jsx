import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createCommunity, getCommunities } from "../../api/communities";
import { Link, useNavigate } from "react-router-dom";
//   import { FaConnectdevelop } from "react-icons/fa";
import InputItem from "../ui/input";
import toast from "react-hot-toast";
import { isLoggedIn } from "../../utils/auth";

export const SidePostCommunity = () => {
  const [communities, setCommunities] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const user = isLoggedIn();

  const [form, setForm] = useState({
    name: "",
    bio: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = await createCommunity(form);
    if (!data.error) {
      toast.success("Community created successfully!");
      onClose();
    }
  };

  const onChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getCommunities().then((data) => {
      setCommunities(data.communities);
    });
  }, []);

  return (
    <>
      <Flex
        direction="column"
        bg="white"
        borderRadius={8}
        cursor="pointer"
        // border="1px solid"
        borderColor="gray.100"
      >
        <Flex
          align="flex-end"
          color="white"
          p="6px 10px"
          bg="black"
          height="70px"
          borderRadius={8}
          fontFamily={"outfit"}
          fontWeight={600}
          cursor={"pointer"}
          bgImage="url(/images/recCommsArt.png)"
          backgroundSize="cover"
          bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
          url('images/recCommsArt.png')"
        >
          Home
        </Flex>
        <Flex direction="column" fontFamily={"outfit"}>
          <Stack mt={2} p={3}>
            <Button
              colorScheme={"green"}
              bg={"black"}
              _hover={{
                color: "purple.400",
              }}
              rounded={"full"}
              px={6}
              as={"a"}
              href={"/submit"}
              fontSize={"10pt"}
            >
              Create Post
            </Button>
            <Button
              colorScheme={"green"}
              bg={"black"}
              rounded={"full"}
              px={6}
              _hover={{
                color: "purple.400",
              }}
              fontSize={"10pt"}
              onClick={() => {
                if (user) {
                  onOpen();
                } else {
                  navigate("/login");
                }
              }}
            >
              Create Community
            </Button>
          </Stack>
        </Flex>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader fontWeight={"bold"}>Create a community</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form style={{ width: "100%", fontFamily: "outfit" }}>
              <Box>
                <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
                  Name
                </Text>
                <InputItem
                  name="name"
                  placeholder="name"
                  type="text"
                  mb={2}
                  onChange={onChange}
                />
              </Box>
              <Box mt={4}>
                <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
                  About Community
                </Text>
                <Textarea
                  name="bio"
                  onChange={onChange}
                  fontSize="10pt"
                  placeholder="About Community"
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
                  bg={"gray.50"}
                  ht="100px"
                />
              </Box>
            </form>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
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
              onClick={onClose}
              variant={"outline"}
            >
              Close
            </Button>
            <Button
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
              onClick={onSubmit}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
