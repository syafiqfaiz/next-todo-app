import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import TodoItem from "@/components/TodoItems/TodoItem";
import Input from "@/components/Input";
import Link from "next/link";
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

const Home = () => {
 
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // const [itemsList, setItemsList] = useState([])
  const [usersList, setUsersList] = useState([])

  const { data: itemsList, error, isLoading, mutate } = useSWR('https://node-todo-api-gp9h.onrender.com/api/items', fetcher)


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
    // fetchItems()
    fetchUsers()
  }, [])

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
      <button>
        {user.name}
      </button>
      
    </Link>
  )

  return (
    <div className="h-full w-full flex items-center justify-center bg-teal-200 font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">User List</h1>
          {usersList.map((user) => (
            <UserList user={user} key={user.id} />
          ))}
          <h1 className="text-grey-darkest mt-5">Todo List</h1>
          <div className="flex mt-4 w-full">
            <form onSubmit={handleSubmit(onSubmit)}  className="w-full flex">
              <Input
                registerBuilder={register("item", {required: true})}
                placeholder="Add Todo"
                error={errors.item}
                inputName='Item'
              />
              <Button label='Add' colourType='info'/>
            </form>
          </div>
        </div>
        <div>
          {itemsList && itemsList.map((item) => (
            <TodoItem item={item}  key={item.id} onChange={mutate}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;
