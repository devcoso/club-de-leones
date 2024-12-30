import { forgotPassword } from "../../services/auth"

import { useState, useEffect, useRef } from "react"

import { Messages } from 'primereact/messages';
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"

import { Form, Link, useActionData } from "react-router-dom"

export async function action({request}) {
  const formData = await request.formData()

  const email = formData.get('email')
 let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  //Validación
  let errores = []
  if(!regex.test(email)){
      errores.push('Correo no válido')
  }
  if(Object.keys(errores).length) {
      return {status: 0, data: errores}
  }
  const response = await forgotPassword({email})
  if(response.status == 200) {  
    console.log(response); 
    return {status:1, data: [response.data.messages]}
  }
  console.log(response);
  return {status: 0, data: [response.data.errors]}
}

function ForgotPassword() {

  const data = useActionData();
  const messages = useRef(null);

  const [email, setEmail] = useState('');


  useEffect(() => {
    if(data?.data.length) {
      const msg = data.data.map((error) => {
        return { severity: data.status  ? 'success' : 'error', sticky: true, content :(
          <p>{error}</p>
        )}
      }) 
      console.log(data); 
      if(messages.current){
        messages.current.clear();
        messages.current.show(msg);
      }
    }
  }
  , [data])


  return (
    <div>
      <h1 className="text-primary font-bold text-center text-4xl my-2">Recupera tu contraseña</h1>
      <Form method="POST" className="flex flex-col items-center my-5 gap-6">
        <InputText 
          type="email" 
          className="w-4/5"
          placeholder="Correo electrónico" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <Messages ref={messages} 
          className="w-4/5 font-text-sm"
          style={{ color: "blue", fontSize: "0.8rem" }} 
        />
        <Button 
          label="Enviar correo" 
          className="w-4/5 p-button-primary bg-primary hover:bg-blue-800"
        />
        <div className="flex flex-col md:flex-row justify-evenly items-center">
          <Link to="/auth" className="text-primary">Inicia Sesion</Link>
          <Divider layout="vertical">o</Divider>
          <Link to="/auth/register" className="text-primary">Regístrate</Link>
        </div>
      </Form>
    </div>
  )
}

export default ForgotPassword
