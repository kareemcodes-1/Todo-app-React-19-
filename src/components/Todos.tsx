import React, { useMemo, useState } from 'react'
import TodoList from './TodoList'
import { useTodo } from '@/provider/TodoProvider'
import { DndContext, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Todo } from '../provider/TodoProvider';
import { createPortal } from 'react-dom';

const Todos = () => {

  const {todos} = useTodo();

  const todoIds: number[] = useMemo(() => todos.map((todo) => todo.id), [todos]);

  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  function onDragStart(e: DragStartEvent){
    console.log(e);
    if(e.active.data.current?.type === "Todo" ){
      setActiveTodo(e.active.data.current.todo);
      return;
    }
  }

  return (
        <DndContext onDragStart={onDragStart}>
           <div className='w-[50%] mt-[2rem] flex flex-col gap-[.5rem]'>
            <SortableContext items={todoIds}>
               {todos.map((todo) => {
                 return <TodoList key={todo.id} todo={todo}/>
               })}
            </SortableContext>
         </div>
         {createPortal(
           <DragOverlay>
           {activeTodo && <TodoList key={activeTodo.id} todo={activeTodo}/>}
       </DragOverlay>, document.body
         )}
        </DndContext>
  )
}

export default Todos