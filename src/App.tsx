import React from 'react'
import TodoHeader from './components/TodoHeader'
import Todos from './components/Todos'

const App = () => {
  return (
     <div className='flex items-center justify-center flex-col w-full mt-[2rem]'>
        <TodoHeader />
         <Todos />
     </div>
  )
}

export default App