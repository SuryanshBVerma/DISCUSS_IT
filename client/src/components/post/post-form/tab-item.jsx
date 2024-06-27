
import { Flex, Icon, Text } from "@chakra-ui/react";

const TabItem = ({ item, selected, setSelectedTab }) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      bg={"black"}
      p="14px 0px"
      cursor="pointer"
      fontFamily={"outfit"}
      borderRadius={"lg"}
      fontWeight={700}
      color={selected ? "purple.400" : "white"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "purple.500" : "gray.200"}
      borderRightColor="purple.200"
      _hover={{ textColor: "purple.400" }}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon height="100%" as={item.icon} fontSize={18} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};

export default TabItem;