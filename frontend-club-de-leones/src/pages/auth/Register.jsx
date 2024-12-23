import { register } from "../../services/auth";

import { useState, useRef, useEffect } from "react"

import { Messages } from 'primereact/messages';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';

import { Form, Link, redirect, useActionData } from "react-router-dom"

export async function action({request}) {
  const formData = await request.formData()

  const name = formData.get('name')
  const paternalLastName = formData.get('paternal_last_name')
  const maternalLastName = formData.get('maternal_last_name')
  const birthdate = formData.get('birthdate')
  const sex = formData.get('sex')
  const phoneNumber = formData.get('phone_number')
  const email = formData.get('email')
  const password = formData.get('password')
  const password2 = formData.get('password2')
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  //Validación
  let errores = []
  if(name.length < 3 || paternalLastName.length < 3 || maternalLastName.length < 3) { 
      errores.push('Los nombres deben tener almenos 3 caracteres')
  }
  if(birthdate.length < 1) {
      errores.push('La fecha de nacimiento es obligatoria')
  }
  if(sex == 0) {
      errores.push('El sexo es obligatorio')
  }
  if(phoneNumber.length < 10) {
      errores.push('El número de teléfono debe tener al menos 10 dígitos')
  }
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
      return errores
  }
  const datos = {
    "name": name,
    "paternal_last_name": paternalLastName,
    "maternal_last_name": maternalLastName,
    "birthdate": birthdate,
    "sex": sex,
    "phone_number": phoneNumber,
    "email": email,
    "password": password,
  }
  const respuesta = await register(datos)
  if(respuesta.status == 201) {  
    return redirect('/auth/login')
  }

  // Formatear errores
  const errors = Object.values(respuesta.data.errors).flat()

  return errors
}

function Register() {

  const errores = useActionData();
  const messages = useRef(null);

  const [setname, setName] = useState('');
  const [paternalLastName, setPaternalLastName] = useState('');
  const [maternalLastName, setMaternalLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [sex, setSex] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

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
    <div className="md:h-full">
      <h1 className="text-primary font-bold text-center text-4xl md:h-1/6 content-center">Registro</h1>
      <Form method="POST" className="flex flex-col items-center gap-6 md:overflow-y-auto my-10 md:my-0 md:h-5/6 md:p-5">
        <FloatLabel className="w-4/5">
          <InputText 
            id="name"
            className="w-full"
            type="text" 
            value={setname}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />  
          <label htmlFor="name" className=" text-gray-500">Nombre</label>
        </FloatLabel>
        <FloatLabel className="w-4/5">
          <InputText
            id="paternal_last_name" 
            type="text"
            className="w-full"
            value={paternalLastName}
            onChange={(e) => setPaternalLastName(e.target.value)} 
            name="paternal_last_name"
          />
          <label htmlFor="paternal_last_name" className=" text-gray-500">Apellido Paterno</label>
        </FloatLabel>
        <FloatLabel className="w-4/5">
          <InputText 
            id="maternal_last_name"
            type="text"
            className="w-full"
            value={maternalLastName}
            onChange={(e) => setMaternalLastName(e.target.value)}
            name="maternal_last_name"
          />
          <label htmlFor="maternal_last_name" className=" text-gray-500">Apellido Materno</label>
        </FloatLabel>
        <FloatLabel className="w-4/5">
          <InputMask 
            id="birthdate"
            style={{width: '100%', display: 'block'}}
            slotChar="yyyy-mm-dd"
            mask="9999-99-99" 
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            name="birthdate"
          />
          <label htmlFor="birthdate" className=" text-gray-500">Fecha de Nacimiento</label>
        </FloatLabel>
        <FloatLabel className="w-4/5">
          <Dropdown
            id="sex"
            style={{width: '100%', display: 'flex'}}
            optionLabel="name"
            optionValue="id"
            options={[
              {id:1, name: 'Masculino' },
              {id:2, name: 'Femenino' }
            ]}
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            name="sex"
          />
          <label htmlFor="sex" className=" text-gray-500">Sexo</label>
        </FloatLabel>
        <FloatLabel className="w-4/5">
          <InputMask 
            id="phone_number"
            style={{width: '100%', display: 'block'}}
            mask="9999999999" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            name="phone_number"
          />
          <label htmlFor="phone_number" className=" text-gray-500">Número de teléfono</label>
        </FloatLabel>
        <FloatLabel className="w-4/5">
          <InputText 
            type="email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            name="email"
          />
          <label htmlFor="email" className=" text-gray-500">Correo electrónico</label>
        </FloatLabel>
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
          label="Regístrate" 
          className="w-4/5 p-button-primary  py-0 md:py-6 bg-primary hover:bg-blue-800"
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

export default Register
