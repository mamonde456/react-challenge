import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atom";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoBox = styled.div`
  max-width: 500px;
  padding: 10px;
  margin: 0px auto;
  position: relative;
  top: 150px;
  border-radius: 15px;
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
  background-color: white;
`;

const Title = styled.h1`
  font-size: 28px;
  text-transform: uppercase;
  color: #0c005dcc;
  font-weight: 700;
`;

const Select = styled.select`
  padding: 5px 10px;
  border: none;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <ToDoBox>
      <Title>to dos</Title>
      <hr />
      <Select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>Todo</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </Select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </ToDoBox>
  );
}

export default ToDoList;
