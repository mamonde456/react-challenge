import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";
import styled from "styled-components";

const Input = styled.input`
  width: 85%;
  height: 30px;
  margin-bottom: 50px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const Button = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: rgba(13, 2, 115, 1);
  color: white;
  margin-left: 5px;
`;

interface IInput {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IInput>();
  const onValid = ({ toDo }: IInput) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <Button>add</Button>
    </form>
  );
}

export default CreateToDo;
