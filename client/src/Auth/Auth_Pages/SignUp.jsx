import { useState } from 'react'
import Button from '@mui/joy/Button';
import { useInputValidation, useStrongPassword } from "6pp";
import Input from '@mui/joy/Input';
import { Link } from 'react-router-dom';



const SignUp = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const name = useInputValidation("");
  const password = useInputValidation("");
  const email = ""
  const mobileNumber = ""

  const handleSubmit = async(e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const formData = new FormData();
 
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("mobileNumber", mobileNumber.value);
    try {
      const { data } = await axios.post(
        `${server}/user/newuser`,
        formData,
        config
      );
      console.log(data)
      console.log(formData)
      
    } catch (error) {
     console.log(error)
    } finally {
      setIsLoading(false);
    }
    
  };




  return (
    <div className='m-auto' >
      <form
        style={{
          width: "100%",
          marginTop: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <div
          className='flex gap-10 justify-center flex-col'>
          <Input
            fullWidth
            placeholder="Name"
            required
            value={name.value}
            onChange={name.changeHandler}
            sx={{
              "--Input-radius": "11px",
              "--Input-gap": "12px",
              "--Input-minHeight": "52px",
              "--Input-paddingInline": "15px"
            }}
          />
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
            placeholder="enter your mobile no."
            required
            value={mobileNumber.value}
            onChange={mobileNumber.changeHandler}
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
            placeholder={"password"}
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
              sx={{fontWeight:"bold", transition:"2s", backgroundColor:"#2196f3" ,fontSize:"20px",margin:"0px"}}
            >
              Sign Up
            </Button>
            <p className='-my-4' >or</p>
            <Link sx={{width:"100%",color:"#fff"}} to={"./sign-in"}>Login</Link>
        </div>
      </form>

    </div>
  )
}

export default SignUp
