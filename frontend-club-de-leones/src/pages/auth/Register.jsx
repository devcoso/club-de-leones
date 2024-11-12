import { useState } from "react"

import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';

import { Form, Link } from "react-router-dom"

function Login() {
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
    <div className="md:h-full">
      <h1 className="text-primary font-bold text-center text-4xl md:h-1/6 content-center">Resgistro</h1>
      <Form className="flex flex-col items-center gap-6 md:overflow-y-auto md:h-5/6 md:p-5">
        <InputText 
          type="text"
          className="w-4/5"
          placeholder="Nombre" 
        />
        <InputText 
          type="text"
          className="w-4/5"
          placeholder="Apellido paterno" 
        />
        <InputText 
          type="text"
          className="w-4/5"
          placeholder="Apellido materno" 
        />
        <InputMask 
          style={{width: '80%', display: 'block'}}
          className="w-4/5"
          placeholder="Número de teléfono"
          mode="decimal"
          mask="99-99999999" 
        />
        <Calendar 
          style={{width: '80%', display: 'block'}}
          inputClassName="w-full"
          placeholder="Fecha de nacimiento"
        />
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
          value={password}
          
          footer={footer}
          onChange={(e) => setPassword(e.target.value)}
        />  
        <Button 
          label="Regístrate" 
          className="w-4/5 p-button-primary py-6 bg-primary hover:bg-blue-800"
        />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/auth/forgot-password" className="text-primary">¿Olvidaste tu contraseña?</Link>
          <Divider layout="vertical">o</Divider>
          <Link to="/auth/login" className="text-primary">Inicia Sesión</Link>
        </div>
      </Form>

    </div>
  )
}

export default Login
