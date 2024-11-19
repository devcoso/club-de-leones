

import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"

import { Form, Link } from "react-router-dom"

function ForgotPassword() {

  return (
    <div>
      <h1 className="text-primary font-bold text-center text-4xl my-2">Recupera tu contraseña</h1>
      <Form className="flex flex-col items-center my-5 gap-6">
        <InputText 
          type="email" 
          className="w-4/5"
          placeholder="Correo electrónico" 
        />
        <Button 
          label="Enviar correo" 
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
