import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import TodoItem from "@/components/TodoItems/TodoItem";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter()
  const {id} = router.query

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [itemsList, setItemsList] = useState([])
  const [usersList, setUsersList] = useState([])

  const fetchItems =() => {
    axios.get('https://node-todo-api-gp9h.onrender.com/api/items',{
        params: {user_id: id}
      })
      .then((response) => {
        setItemsList([...response.data])
      })
      .catch((err) => {
        debugger
      })
  }

  const fetchUsers =() => {
    axios.get('https://node-todo-api-gp9h.onrender.com/api/users')
      .then((response) => {
        setUsersList([...response.data])
      })
      .catch((err) => {
        debugger
      })
  }

  useEffect(() => {
    // api call
    fetchItems()
    fetchUsers()
  }, [id])

  const onSubmit = (data) => {
    let currentUser = localStorage.getItem('todoUser')
    currentUser = JSON.parse(currentUser)
    axios.post(
      'https://node-todo-api-gp9h.onrender.com/api/items',
      data,
      {
        headers: {
          'Authorization': 'Bearer ' + currentUser.jwt
        }
      }
    )
      .then(function (response) {
        console.log(response);
        fetchItems()
      })
      .catch(function (error) {
        console.log(error);
        debugger
      });
  }

  const UserList = ({user}) => (
    <Link
      className="text-blue-500 underline ml-2"
      href={`/users/${user.id}`}
    >
      {user.name}
    </Link>
  )

  return (
    <div className="h-full w-full flex items-center justify-center bg-teal-200 font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">User List</h1>
          {usersList.map((user, index) => {
            return (
              <>
                <UserList user={user} key={user.id} />
                {index < usersList.length - 2 && (', ')}
              </>
              
            )
          })}
          <h1 className="text-grey-darkest mt-5">Todo List</h1>
          <div className="flex mt-4 w-full">
            <form onSubmit={handleSubmit(onSubmit)}  className="w-full flex">
              <Input
                registerBuilder={register("item")}
                placeholder="Add Todo"
              />
              <Button label='Add' colourType='info'/>
            </form>
          </div>
        </div>
        <div>
          {itemsList.map((item) => (
            <TodoItem item={item}  key={item.id} onChange={fetchItems}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;
