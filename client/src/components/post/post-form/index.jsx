import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  Textarea,
  VStack,
  Input,
  Stack,
  Spacer,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItem from "./tab-item";
import TextInputs from "./text-inputs";
import ImageUpload from "./image-upload";
import { ChevronDownIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";
import { createPost } from "../../../api/posts";
import { getCommunities } from "../../../api/communities";
import { useNavigate } from "react-router-dom";
import { VscTerminalPowershell } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";

import Editor from "@monaco-editor/react";
import { languages, themes, LANGUAGE_VERSIONS } from ".";
import { Code } from "@chakra-ui/react";

import { handelContentMod } from "../../../api/textMod";
import { CgPoll } from "react-icons/cg";
import Options from "./Options";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images",
    icon: IoImageOutline,
  },
  {
    title: "<Code/>",
    icon: VscTerminalPowershell,
  },
  {
    title: "Poll",
    icon: CgPoll,
  },
];


export const PostForm = () => {
  // Data from the form
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    content: "",
  });

  const [community, setCommunity] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const selectFileRef = useRef(null);
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  // Code Data
  const [lang, setLang] = useState("Choose a language");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState("");
  const [codeOutput, setCodeOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const executeCode = async (language, sourceCode) => {

    try {
      setIsLoading(true);
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        body: JSON.stringify({
          "language": language,
          "version": LANGUAGE_VERSIONS[language],
          "files": [
            {
              "content": sourceCode
            }
          ]
        })
      });

      const data = await response.json();

      setCodeOutput(data.run.output);

      // console.log(data);
      return;
    } catch (err) {
      console.log("error : ", err);
    } finally {
      setIsLoading(false);
    }

  };

  // Poll Data
  const [pollTitle, SetPollTitle] = useState("");
  const [pollOpt, setPollOpt] = useState({});
  const [poll, setPoll] = useState({});

  // useEffect(() => {
  //   console.log(pollTitle);
  // }, [pollTitle])

  useEffect(() => {
    getCommunities().then((data) => {
      setCommunities(data.communities);
    });
  }, [community, setCommunity]);

  const onTextChange = ({ target: { name, value } }) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePost = async () => {
    // Handeling TextMod
    const textModResult = await handelContentMod(
      textInputs.title,
      textInputs.content
    );
    // console.log(textModResult.moderation_classes);

    const Result = textModResult.moderation_classes;

    if (
      Result.discriminatory > 0.3 ||
      Result.insulting > 0.3 ||
      Result.sexual > 0.3 ||
      Result.toxic > 0.3 ||
      Result.violent > 0.3
    ) {
      toast.error("Oops! The content violates our community guidelines.");
      return;
    }

    // Setting poll if exsists
    var pollData;
    if (pollTitle && pollOpt) {
      // Create poll
      var opt = {};
      Object.entries(pollOpt).forEach(([key, value]) => {
        // Remove blank values (empty strings)
        if (value.trim() !== "") {
          opt[value] = 0;
        }
      });

      if (!opt) {
        toast.error("Unable to Post the Poll -- length");
        return;
      }

      pollData = {
        title: pollTitle,
        options: opt,
      };

      console.log(pollData);
      // toast.error("Unable to Post the Poll");
      // return
    }

    // Creating data Json
    const data = await createPost({
      title: textInputs.title,
      content: textInputs.content,
      imageUrl: selectedFile,
      communityId: community,
      code: code,
      poll: pollData,
    });

    if (!data.error) {
      toast.success("Post created successfully!");
      navigate(`/explore`);
    } else {
      toast.error("Post failed to create!");
    }
  };

  const onMount = (editor) => {
    editor.current = editor;
    editor.focus();
  };

  const [count, setCount] = useState(1);

  const handelCount = (operator) => {
    if (operator) {
      var t = count;
      t++;
      setCount(t);
      console.log(count);
    }
  };

  return (
    <>
      <Select
        fontFamily={"outfit"}
        border={2}
        borderStyle={"solid"}
        borderColor={"black"} // Set border color to black
        borderRadius={"xl"} // Set a large border radius
        placeholder="Choose a community"
        size={"md"}
        width={"fit-content"}
        onChange={(e) => setCommunity(e.target.value)}
        _focus={{ borderColor: "transparent" }} // No border color on focus
      >
        {communities.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </Select>
      <Flex
        direction="column"
        fontFamily={"outfit"}
        border={2}
        // bg={"black"}
        minH={"68vh"}
        borderStyle={"solid"}
        borderColor={"black"}
        borderRadius={"xl"}
        mt={2}
        padding={3}
      >
        <Flex
          // bg={"black"} 
          borderRadius={"xl"} width="100%" gap={1}>
          {formTabs.map((item, index) => (
            <TabItem
              key={index}
              item={item}
              selected={item.title === selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </Flex>
        <Flex p={4}>
          {selectedTab === "Post" && (
            <TextInputs
              textInputs={textInputs}
              onChange={onTextChange}
              handleCreatePost={handleCreatePost}
              loading={false}
            />
          )}
          {selectedTab === "Images" && (
            <ImageUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setSelectedTab={setSelectedTab}
              selectFileRef={selectFileRef}
            />
          )}

          {selectedTab === "<Code/>" && (
            <>
              <VStack width={"100%"}>
                <Flex gap={14}>
                  <Select
                    border={2}
                    borderStyle={"solid"}
                    borderColor={"gray.100"}
                    placeholder="Choose a language"
                    size={"sm"}
                    width={"fit-content"}
                    onClick={(e) => setLang(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </Select>

                  <Select
                    border={2}
                    borderStyle={"solid"}
                    borderColor={"gray.100"}
                    placeholder={"Theme"}
                    size={"sm"}
                    width={"fit-content"}
                    onClick={(e) => setTheme(e.target.value)}
                  >
                    {themes.map((th) => (
                      <option key={th.Value} value={th.Value}>
                        {th.Value}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Editor
                  height="20rem"
                  width="100%"
                  theme={theme}
                  language={lang}
                  onMount={onMount}
                  value={code}
                  onChange={(code) => {
                    setCode(code);
                  }}
                />
                <Flex
                  gap={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Icon
                    as={VscTerminalPowershell}
                    fontSize={20}
                    flex={"flex-start"}
                  />

                  <Button
                    height="25px"
                    padding="15px"
                    bg={"black"}
                    color={"white"}
                    isLoading ={isLoading}
                    _hover={
                      { textColor: "purple.400"}
                    }
                    disabled={!textInputs.title}
                    onClick={() => { executeCode(lang, code) }}
                  >
                    Run Code
                  </Button>
                </Flex>


                <Code width={"100%"} rounded={"xl"} p={4} bg={"#dce6ef"}>
                  <pre>{codeOutput}</pre>
                </Code>
              </VStack>
            </>
          )}

          {selectedTab === "Poll" && (
            <>
              <Stack spacing={5} width={"100%"}>
                <Input
                  _placeholder={{ color: "gray.500" }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue",
                  }}
                  fontSize="10pt"
                  borderRadius={4}
                  placeholder="Ask Question"
                  value={pollTitle ? pollTitle : ""}
                  onChange={(e) => SetPollTitle(e.target.value)}
                />

                <HStack justifyContent="flex-end" width="100%">
                  <Spacer />
                  <Button onClick={handelCount} rounded={"full"}>
                    <IoMdAdd />
                  </Button>
                  <Button
                    onClick={() => {
                      var t = count;
                      if (t > 1) {
                        setCount(--t);
                      }
                    }}
                    rounded={"full"}
                  >
                    <FaMinus />
                  </Button>
                </HStack>

                <Options
                  count={count}
                  setPollOpt={setPollOpt}
                  pollOpt={pollOpt}
                />
              </Stack>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
