import { useState } from "react"

import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Divider } from "primereact/divider"
import {locale} from "primereact/api"

import { Form } from "react-router-dom"

function Login() {
  locale('en');
  const [password, setPassword] = useState('');
  const footer = (
      <>
          <Divider />
          <p className="mt-2">Te sugerimos al menos incluir:</p>
          <ul className="pl-2 ml-2 mt-0 line-height-3 list-disc">
              <li>Una letra minúscula</li>
              <li>Una letra mayúscula</li>
              <li>Un número</li>
              <li>8 caracteres</li>
          </ul>
      </>
  );


  return (
    <div className="">
      <h1 className="text-primary font-bold text-center text-4xl my-2">Resgistro</h1>
      <Form className="flex flex-col items-center" >
        <InputText 
          type="email" 
          placeholder="Correo electrónico" 
        />
        <Password 
          placeholder="Contraseña"
          toggleMask 
          footer={footer}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />  
      </Form>
    </div>
  )
}

export default Login
