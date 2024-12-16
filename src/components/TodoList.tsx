import { Todo, useTodo } from '@/provider/TodoProvider'
import React, { useEffect, useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from "@dnd-kit/utilities";
import { format } from "date-fns"
import { DatePicker } from './DatePicker';

const TodoList = ({todo}: {todo: Todo}) => {

  const {findTodo, date, setDate, deleteTodo, editingTodo, completeTodo, updateTodo} = useTodo();
  const [name, setName] = useState(editingTodo?.name || '');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  

  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
    id: todo.id,
    data: {
      type: 'Todo',
      todo
    }
  });

 

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  useEffect(() => {
      setName(editingTodo ? editingTodo.name : '');
  }, [editingTodo])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = e.target;
      setName(value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(editingTodo && date){
      const updatedTodo = {
        id: editingTodo.id,
        name,
        completed: editingTodo?.completed,
        dueDate: date
      }

      updateTodo(updatedTodo, editingTodo.id);
      setDate(undefined);
      setIsDialogOpen(false);
    }
  }


  if(isDragging){
    return (
      <div className='shadow-md p-[1rem] flex w-full opacity-60 h-[5rem] justify-between items-start bg-[#0000001c] rounded-[.5rem]' ref={setNodeRef} style={style} >      
      </div>
    )
  }

  return (
    <div className='shadow-md p-[1rem] flex w-full justify-between items-start border rounded-[.5rem]' ref={setNodeRef} style={style} >
        <div className='flex items-center justify-center gap-[.5rem]'>
            {todo.completed ? <input type="checkbox" defaultChecked className={`checkbox checkbox-success !text-white`} onClick={() => completeTodo(todo)}/> : <input type="checkbox" className={`checkbox`} onClick={() => completeTodo(todo)}/>}
            <h2 className='text-[1.3rem]'  {...attributes} {...listeners}>{todo.name}</h2>
        </div>

        <div className='flex items-center gap-[.5rem]'>

          <div className='bg-white shadow-md p-[.5rem] rounded-[.5rem]'>
              {format(todo.dueDate, 'dd/MM/yy')}
          </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
          <div
          className="bg-white shadow-md hover:bg-gray-100 cursor-pointer transition-all p-[.7rem] rounded-[.5rem]"
          onClick={() => {findTodo(todo.id); setIsDialogOpen(true);}}
        >
          <BiEdit />
        </div>
        </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-[1.5rem]">Edit Task</DialogTitle>

              <form onSubmit={onSubmit} className="flex items-start flex-col gap-[1rem] pt-[1rem]">
                    <label htmlFor="todo-name" className="text-[1rem] font-medium">Name</label>
                    <div className="w-full">
                    <input type="text" name="name" value={name} onChange={onChange} className="pl-[.5rem] h-[2.7rem] border rounded-[1rem] w-full outline-none"/>
                    </div>

                    <DatePicker />
                    <button className="btn btn-primary" type="submit">Save</button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>


        <button
           onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 text-white shadow-md hover:opacity-90 cursor-pointer transition-all p-[.7rem] rounded-[.5rem]"
        >
          <BiTrash />
        </button>

        </div>

        
    </div>
  )
}

export default TodoList