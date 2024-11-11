import { useState } from "react"

import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"

import { Form, Link } from "react-router-dom"

function Login() {

  const [password, setPassword] = useState('');


  return (
    <div className="">
      <h1 className="text-primary font-bold text-center text-4xl my-2">Iniciar Sesión</h1>
      <Form className="flex flex-col items-center my-5 gap-6">
        <InputText 
          type="email" 
          className="w-4/5"
          placeholder="Correo electrónico" 
        />
        <Password 
          placeholder="Contraseña"
          toggleMask
          style={{width: '80%', display: 'block'}}
          className="w-full"
          inputClassName="w-full"
          feedback={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />  
        <Button 
          label="Iniciar Sesión" 
          className="w-4/5 p-button-primary bg-primary"
        />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/auth/forgot-password" className="text-primary">¿Olvidaste tu contraseña?</Link>
          <Divider layout="vertical">o</Divider>
          <Link to="/auth/register" className="text-primary">Regístrate</Link>
        </div>
      </Form>
    </div>
  )
}

export default Login
