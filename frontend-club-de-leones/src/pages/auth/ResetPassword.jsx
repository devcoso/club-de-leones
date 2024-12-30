import { resetPassword } from "../../services/auth";

import { useState, useEffect, useRef } from "react"

import { Messages } from 'primereact/messages';
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"

import { Form, Link, useActionData, useParams } from "react-router-dom"


export async function action({request}) {

  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')
  const password2 = formData.get('password2')
  const token = formData.get('token')
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
 //Validación
  let errores = []
  if(!regex.test(email)){
    errores.push('Correo no válido')
}
  if(password.length < 8) {
      errores.push('La contraseña debe tener al menos 8 caracteres')
  }
  if(password != password2) {
      errores.push('Las contraseñas no coinciden')
  }
  if(Object.keys(errores).length) {
      return {status: false, data: [errores]}
  }

  const response = await resetPassword({email, token, password}) 
  if(response.status == 200) {  
    console.log(response); 
    return {status:1, data: [response.data.messages]}
  }
  console.log(response);
  return {status: 0, data: [response.data.errors]}

  return {status: false, data: errors}
}


function ResetPassword() {

  const { token } = useParams();
  const data = useActionData()
  const messages = useRef(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const footer = (
    <>
        <Divider />
        <p className="mt-2">Te sugerimos al menos incluir:</p>
        <ul className="pl-2 ml-2 mt-0 line-height-3 list-disc">
            <li className="text-red-800 font-bold">8 caracteres</li>
            <li>Una letra minúscula</li>
            <li>Una letra mayúscula</li>
            <li>Un número</li>
        </ul>
    </>
  );

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
      <h1 className="text-primary font-bold text-center text-4xl my-2">Crea una contraseña</h1>
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
        <input type="hidden" name="token" value={token} />
        <Messages ref={messages} 
          className="w-4/5 font-text-sm"
          style={{ color: "blue", fontSize: "0.8rem" }} 
        />
        <Button 
          label="Guardar contraseña" 
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

export default ResetPassword
