import { useState } from 'react'
import Button from '@mui/joy/Button';
import { useInputValidation } from "6pp";
import Input from '@mui/joy/Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";



const SignIn = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()


  const name = useInputValidation("");
  const password = useInputValidation("");
  const email = useInputValidation("")
  const mobileNumber = useInputValidation("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      await axios.post("http://localhost:3000/user/login", {
        email: email.value,
        password: password.value,
      }).then((e) => {
        if (e.data.success) {
          navigate("/")
        }
        setIsLoading(false)
        console.log(e.data.success)
        console.log(e.data.message)
        toast.success(e.data.message);
      }).catch((e) => {
        toast.error(e.response.data.error.message);
        setIsLoading(false)
        console.log(e.response.data.error.message)
        console.log(e)
        console.log(e.response.data.success)
      })
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='m-auto w-4/6' >
      <form
        style={{
          width: "100%",
          marginTop: "1rem",
        }}
        className='flex justify-center'
        onSubmit={handleSubmit}
      >
        <div className='flex gap-5 justify-center w-1/2 flex-col'>
          <h1 className='mx-auto' >Login</h1>
          
          <Input
            fullWidth
            placeholder="email"
            required
            value={email.value}
            onChange={email.changeHandler}
            sx={{
              "--Input-radius": "11px",
              "--Input-gap": "12px",
              "--Input-minHeight": "52px",
              "--Input-paddingInline": "15px"
            }}
          />
          
          <Input
            fullWidth
            type="password"
            placeholder="********"
            required
            value={password.value}
            onChange={password.changeHandler}
            sx={{
              "--Input-radius": "11px",
              "--Input-gap": "12px",
              "--Input-minHeight": "52px",
              "--Input-paddingInline": "15px"
            }}
          />


          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={isLoading}
            sx={{ fontWeight: "bold", transition: "2s", backgroundColor: "#2196f3", fontSize: "20px", margin: "0px" }}
          >
            Login
          </Button>
          <p className='-my-4 mx-auto ' >or</p>
          <p className='mx-auto' > Is not sign up<a className='w-full text-blue-400 ' href={"./sign-up"}>Sign Up</a> ?</p>
        </div>
      </form>
    </div>
  )
}

export default SignIn
