"use client";
import { useState, Dispatch, SetStateAction, ReactElement } from "react";
import EditDialog from "./editDialog";
import RemoveDialog from "./removeDialog";
import { Button, Highlight } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export default function Task(props: {
  id: number;
  text: string;
  priority: string;
  deadline: string;
  update_at: string;
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>;
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const id = props.id;
  const text = props.text;
  const priority = props.priority;
  const deadline = props.deadline;
  const update_at = props.update_at;
  let last_update = new Date(update_at);

  const getColorFromPriority = (priority: string) => {
    switch (priority) {
      case "高":
        return { px: "2", py: "1", rounded: "full", bg: "red.100" };
      case "中":
        return { px: "2", py: "1", rounded: "full", bg: "yellow.100" };
      case "低":
        return { px: "2", py: "1", rounded: "full", bg: "green.100" };
    }
  };

  const priorityColorStyles = getColorFromPriority(priority);

  return (
    <>
      <div>
        <div className="flex items-center">
          <Highlight query={priority} styles={priorityColorStyles}>
            {priority}
          </Highlight>
          <p className="text-lg text-gray-700 break-all ml-4">{text}</p>
        </div>
        <p className="text-base text-gray-600 ml-12">期日：{deadline}</p>
        <p className="text-xs text-gray-400 mt-6">
          最終更新日時：{last_update.toLocaleString("ja-JP")}
        </p>
      </div>

      <div className="flex">
        <Button
          leftIcon={<EditIcon />}
          colorScheme="messenger"
          onClick={() => setShowEditModal(true)}
        >
          編集
        </Button>

        <Button
          marginLeft={"2"}
          leftIcon={<DeleteIcon />}
          colorScheme="red"
          onClick={() => setShowRemoveModal(true)}
        >
          削除
        </Button>
      </div>
      {showEditModal ? (
        <EditDialog
          id={id}
          taskList={props.taskList}
          showModal={setShowEditModal}
        ></EditDialog>
      ) : null}
      {showRemoveModal ? (
        <RemoveDialog
          id={id}
          taskList={props.taskList}
          showModal={setShowRemoveModal}
        ></RemoveDialog>
      ) : null}
    </>
  );
}
