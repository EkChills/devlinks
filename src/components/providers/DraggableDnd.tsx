"use client"

import React from 'react'
import { Draggable, DraggableChildrenFn } from 'react-beautiful-dnd'

interface Props {
  id:string,
  index:number
  children:DraggableChildrenFn
}

export default function DraggableDnd({id, index, children}:Props) {
  return (
    <Draggable draggableId={id} index={index} >
      {children as DraggableChildrenFn}
    </Draggable>
  )
}
