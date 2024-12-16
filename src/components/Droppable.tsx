import React, { ReactNode } from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable({children}: {children: ReactNode}) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}