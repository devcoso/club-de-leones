import { useState } from "react"

import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Divider } from "primereact/divider"

import { Form } from "react-router-dom"

function Login() {

  const [password, setPassword] = useState('');


  return (
    <div className="">
      <h1 className="text-primary font-bold text-center text-4xl my-2">Iniciar Sesión</h1>
      <Form className="flex flex-col items-center" >
        <InputText 
          type="email" 
          placeholder="Correo electrónico" 
        />
        <Password 
          placeholder="Contraseña"
          toggleMask
          feedback={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />  
      </Form>
    </div>
  )
}

export default Login
