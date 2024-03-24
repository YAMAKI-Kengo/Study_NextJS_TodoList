"use client";
import { supabase } from "@/utils/supabase/supabase";
import { Dispatch, SetStateAction, ReactElement, useState } from "react";
import getData from "./getData";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
} from "@chakra-ui/react";
import React from "react";

export default function AddTask(props: {
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>;
}) {
  const [text, setText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState("");
  const [date, setDate] = useState("");

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let { data, error } = await supabase
        .from("tasks")
        .insert([{ text: text }])
        .select();
      if (error) {
        console.log(error);
      }

      await getData(props.taskList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
<Button
  onClick={onOpen}
  colorScheme='messenger'
  className="mt-4 w-full font-semibold rounded-lg px-4 py-2"
>
  タスクを追加する
</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規タスクの作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form className="mt-4" onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>タスク名</FormLabel>
                <Input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-2 py-1"
                  placeholder="新しいタスクを入力してください"
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>優先度</FormLabel>
                <Select
                  value={selectedOption}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1"
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>期日</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              </FormControl>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2"
              >
                追加
              </button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
