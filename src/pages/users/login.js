import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    axios.post('https://node-todo-api-gp9h.onrender.com/api/users/login', data)
      .then(function (response) {
        localStorage.setItem('todoUser', JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error);
        debugger
      });
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-teal-200 font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Login</h1>
          <div className="flex mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <Input
                label="Email"
                registerBuilder={register("email")}
                placeholder="Email"
              />
              <Input
                label="Password"
                registerBuilder={register("password")}
                placeholder="Password"
                type="password"
              />
              <Button label='Login' colourType='info'/>
            </form>
          </div>
        </div>
       
      </div>
    </div>
    
  )
}

export default Login
