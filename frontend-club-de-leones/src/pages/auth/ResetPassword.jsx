import { useState, useEffect, useRef } from "react"

import { Messages } from 'primereact/messages';
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"

import { Form, Link } from "react-router-dom"

function ForgotPassword() {

  const messages = useRef(null)

  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  return (
    <div>
      <h1 className="text-primary font-bold text-center text-4xl my-2">Crea una contraseña</h1>
      <Form className="flex flex-col items-center my-5 gap-6">
        <Password 
          placeholder="Contraseña"
          toggleMask
          style={{width: '80%', display: 'block'}}
          className="w-full"
          inputClassName="w-full"
          value={password}
          footer={footer}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        <Password 
          placeholder="Confirmar contraseña"
          toggleMask
          style={{width: '80%', display: 'block'}}
          className="w-full"
          inputClassName="w-full"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          name="password2"
          feedback={false}
        />  
        <Messages ref={messages} 
          className="w-4/5 font-text-sm"
          style={{ color: "blue", fontSize: "0.8rem" }} 
        />
        <Button 
          label="Guardar contraseña" 
          className="w-4/5 p-button-primary bg-primary hover:bg-blue-800"
        />
        <div className="flex flex-col md:flex-row justify-evenly items-center">
          <Link to="/auth/login" className="text-primary">Inicia Sesion</Link>
          <Divider layout="vertical">o</Divider>
          <Link to="/auth/register" className="text-primary">Regístrate</Link>
        </div>
      </Form>
    </div>
  )
}

export default ForgotPassword
