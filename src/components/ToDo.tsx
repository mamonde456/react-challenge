import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atom";
import styled from "styled-components";

const ToDoLi = styled.li`
  list-style: none;
  width: 100%;
  padding: 10px 0px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const Button = styled.button`
  width: 80px;
  height: 30px;
  position: absolute;
  top: 50%;
  margin-top: -15px;
  right: 0px;
  background-color: transparent;
  border-radius: 5px;
  border: solid 1px rgba(13, 2, 115, 1);
  text-transform: uppercase;
  &:nth-child(2) {
    right: 80px;
  }
  &:nth-child(3) {
    right: 160px;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      if (name === Categories.DLELTE) {
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      }
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <ToDoLi>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <Button name={Categories.DOING} onClick={onClick}>
          Doing
        </Button>
      )}
      {category !== Categories.TO_DO && (
        <Button name={Categories.TO_DO} onClick={onClick}>
          todo
        </Button>
      )}
      {category !== Categories.DONE && (
        <Button name={Categories.DONE} onClick={onClick}>
          done
        </Button>
      )}
      <Button name={Categories.DLELTE} onClick={onClick}>
        delete
      </Button>
    </ToDoLi>
  );
}

export default ToDo;
