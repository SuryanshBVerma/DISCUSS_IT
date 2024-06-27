import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { deletePost } from "../../api/posts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteComment } from "../../api/comment";

export const DeleteCommentModal = ({ comment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (comment) {
      const data = await deleteComment(comment?.post, comment?._id);
      if (!data.error) {
        toast.success("Comment deleted successfully!");
        navigate(0);
        onClose();
      } else {
        toast.error("Comment failed to delete!");
      }
    }
  };

  return (
    <>
      <Flex as={"button"} onClick={onOpen}>
        {/* <Icon as={AiOutlineDelete} mr={2} /> */}
        <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
          Delete
        </Text>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader fontWeight={700}>Delete Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily={"outfit"}>
            <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
              Are you sure you want to delete this comment?
            </Text>
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
              
              _hover={{
                color: "purple.400",
              }}
              onClick={onSubmit}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
