import { useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
// import { FaReddit } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { isLoggedIn } from "../../utils/auth";
import moment from "moment";

const About = ({ community }) => {
  const user = isLoggedIn();

  return (
    <Box position="sticky" top="14px" fontFamily={"outfit"}>
      <Flex
        justify="space-between"
        align="center"
        p={3}
        color="white"
        bg="purple.600"
        borderRadius={8}
      >
        <Text fontSize="12pt" fontWeight={700}>
          About Community
        </Text>
        {/* <Icon as={HiOutlineDotsHorizontal} cursor="pointer" /> */}
      </Flex>
      <Flex
        direction="column"
        p={3}
        bg="white"
        mt={2}
        border={2}
        borderStyle={"solid"}
        borderColor={"gray.300"}
        borderRadius={8}
      >
        {!community ? (
          <Stack mt={2}>
            <SkeletonCircle size="10" />
            <Skeleton height="10px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            {community?.bio && (
              <Box
                bg="gray.100"
                width="240px"
                p={2}
                borderRadius={8}
                border="1px solid"
                borderColor="gray.300"
                cursor="pointer"
              >
                <Text fontSize="10pt" fontWeight={700} color="purple.600">
                  {community.bio}
                </Text>
              </Box>
            )}
            <Stack spacing={2}>
              <Flex
                fontSize="10pt"
                direction="row"
                justify={"space-between"}
                flexGrow={1}
                p={2}
              >
                <Text fontWeight={"semibold"}>Members</Text>
                <Text fontWeight={"semibold"}>
                  {community?.subscribedBy?.length}
                </Text>
              </Flex>
              <Divider />
              <Flex
                align="center"
                width="100%"
                p={1}
                fontWeight={500}
                fontSize="10pt"
              >
                <Icon as={RiCakeLine} mr={2} fontSize={18} />
                {community?.createdAt && (
                  <Text fontSize={"10pt"}>
                    Created{" "}
                    {moment(new Date(community?.createdAt)).format(
                      "MMM DD, YYYY"
                    )}
                  </Text>
                )}
              </Flex>
              {user && (
                <Link to={`/submit`}>
                  <Button
                    mt={3}
                    height="36px"
                    w={"100%"}
                    bg="black"
                    borderRadius={8}
                    fontSize="11pt"
                    color="white"
                    _hover={{ color: "purple.400" }}
                  >
                    Create Post
                  </Button>
                </Link>
              )}
              {/* {user?.uid === communityData?.creatorId && (
                <>
                  <Divider />
                  <Stack fontSize="10pt" spacing={1}>
                    <Text fontWeight={600}>Admin</Text>
                    <Flex align="center" justify="space-between">
                      <Text
                        color="blue.500"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => selectFileRef.current?.click()}
                      >
                        Change Image
                      </Text>
                      {communityData?.imageURL || selectedFile ? (
                        <Image
                          borderRadius="full"
                          boxSize="40px"
                          src={selectedFile || communityData?.imageURL}
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Icon
                          as={FaReddit}
                          fontSize={40}
                          color="brand.100"
                          mr={2}
                        />
                      )}
                    </Flex>
                    {selectedFile &&
                      (imageLoading ? (
                        <Spinner />
                      ) : (
                        <Text cursor="pointer" onClick={updateImage}>
                          Save Changes
                        </Text>
                      ))}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      hidden
                      ref={selectFileRef}
                      onChange={onSelectImage}
                    />
                  </Stack>
                </>
              )} */}
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  );
};
export default About;
