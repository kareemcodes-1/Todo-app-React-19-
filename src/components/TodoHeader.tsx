import React, { useState } from "react";
import { BiFilter, BiPlus } from "react-icons/bi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useTodo } from "@/provider/TodoProvider";
import { DatePicker } from "./DatePicker";
import SubmitBtn from "./SubmitBtn";

const TodoHeader = () => {
  const { addTodo, todos, date, handleFilter } = useTodo();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  function submitAction(formData: any) {
    if (date) {
      const newTodo = {
        id: todos.length + 1,
        name: formData.get("name") as string,
        completed: false,
        dueDate: date,
      };
      addTodo(newTodo);
      setIsDialogOpen(false);
    }
  }

  return (
    <div className="flex items-center gap-[1rem] w-[50%] justify-between">
      <h1 className="text-[2rem] font-medium">All Tasks</h1>

      <div className="flex items-center gap-[.5rem]">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <div
              onClick={() => setIsDialogOpen(true)}
              className="bg-white shadow-md hover:bg-gray-100 cursor-pointer transition-all p-[1rem] rounded-[.5rem]"
            >
              <BiPlus />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-[1.5rem]">Create Task</DialogTitle>

              <form
                action={submitAction}
                className="flex items-start flex-col gap-[1rem] pt-[1rem]"
              >
                <label htmlFor="todo-name" className="text-[1rem] font-medium">
                  Name
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    name="name"
                    id="todo-name"
                    className="pl-[.5rem] h-[2.7rem] border rounded-[1rem] w-full outline-none"
                  />
                </div>

                <DatePicker />
                <SubmitBtn />
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <details className="dropdown">
          <summary className="bg-white shadow-md hover:bg-gray-100 cursor-pointer transition-all p-[1rem] rounded-[.5rem]">
          <BiFilter />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <a onClick={() => handleFilter('name')}>By Name</a>
            </li>
            <li>
              <a onClick={() => handleFilter('date')}>By Date</a>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default TodoHeader;
