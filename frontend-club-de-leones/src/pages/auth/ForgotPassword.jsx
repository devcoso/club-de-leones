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
      return errores
  }
  const response = await forgotPassword({email})
  if(response.status == 200) {  
    console.log(response); 
    return null;
    //return redirect('/auth/login')
  }

  return [response.data.errores]
}

function ForgotPassword() {

  const errores = useActionData();
  const messages = useRef(null);

  const [email, setEmail] = useState('');


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
          <Link to="/auth/login" className="text-primary">Inicia Sesion</Link>
          <Divider layout="vertical">o</Divider>
          <Link to="/auth/register" className="text-primary">Regístrate</Link>
        </div>
      </Form>
    </div>
  )
}

export default ForgotPassword
