import { login } from "../../services/auth";

import { useState, useEffect, useRef } from "react"

import { Messages } from 'primereact/messages';
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"

import { Form, Link, redirect, useActionData } from "react-router-dom"

export async function action({request}) {

  let errores = []
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  if(!email || !password) {
    errores.push('Las credenciales son obligatorias')
    return errores
  }

  const response = await login({email, password})
  console.log(response);
  if(response.status === 200) {
    // Guardar el token en la sesión
    localStorage.setItem('token', response.data.token)
    return redirect('/')
  }

  return [response.data.errores]
}

function Login() {

  const errores = useActionData();
  const messages = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    if(errores?.length) {
      const msg = errores.map((error) => {
        return { severity: 'error', sticky: true, content :(
          <p>{error}</p>
        )}
      }) 
      
      if(messages.current){
        messages.current.clear();
        messages.current.show(msg);
      }
    }
  }
  , [errores])

  return (
    <div>
      <h1 className="text-primary font-bold text-center text-4xl my-2">Iniciar Sesión</h1>
      <Form method="POST" className="flex flex-col items-center my-5 gap-6">
        <InputText 
          type="email" 
          className="w-4/5"
          placeholder="Correo electrónico" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
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
          name="password"
        />  
        <Messages ref={messages} 
          className="w-4/5 font-text-sm"
          style={{ color: "blue", fontSize: "0.8rem" }} 
        />
        <Button 
          inputMode="submit"
          label="Iniciar Sesión" 
          className="w-4/5 p-button-primary bg-primary hover:bg-blue-800"
        />
        <div className="flex flex-col md:flex-row justify-evenly items-center">
          <Link to="/auth/forgot-password" className="text-primary">¿Olvidaste tu contraseña?</Link>
          <Divider layout="vertical">o</Divider>
          <Link to="/auth/register" className="text-primary">Regístrate</Link>
        </div>
      </Form>
    </div>
  )
}

export default Login
