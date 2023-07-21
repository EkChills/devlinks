'use client'

import { Children } from "react"
import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd"

interface Props {
  children:React.ReactNode
}

const DragContext = ({children, onDragEnd}:DragDropContextProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  )
}

export default DragContext