import { Droppable, DroppableProps } from "react-beautiful-dnd"

interface Props {

}

const Page = ({children, droppableId}:DroppableProps) => {
  return (
    <Droppable droppableId={droppableId}>
      {children}
    </Droppable>
  )
}

export default Page