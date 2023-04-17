import axios from "axios"
import Button from "../Button"

const TodoItem = ({item, onChange}) => {
  const onDelete = () => {
    let currentUser = localStorage.getItem('todoUser')
    currentUser = JSON.parse(currentUser)

    axios.delete(`https://node-todo-api-gp9h.onrender.com/api/items/${item.id}`,{
      headers: {
        'Authorization': 'Bearer ' + currentUser.jwt
      }
    }).then((_response) => {
      onChange()
    }).catch(err => {
      console.log(err);
      debugger
    })
  }
  return (
    <div className="flex mb-4 items-center">
      <p className={`w-full text-grey-darkest ${item.completed && 'line-through'}`}>
        {item.item}<small className="text-blue-500"> by {item.user_name}</small>
      </p>
      <Button
        label={item.completed ? 'Mark as Not Done' : 'Mark as Done'}
        colourType={item.completed ? '' : 'success'}
      />

      <Button label="Remove" colourType="warning" onClick={onDelete}/>
    </div>
  )
}

export default TodoItem
