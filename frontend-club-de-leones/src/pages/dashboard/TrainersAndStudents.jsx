import { myMembers } from "../../services/users"
import { removeStudent, addStudent, updateStudent, getAllUsers} from "../../services/trainer"

import { useState, useRef } from 'react'
import { useLoaderData, useOutletContext } from "react-router-dom"

import LoaderPage from "../LoaderPage"

import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { Toast } from 'primereact/toast';

import Member from "../../components/dashboard/Member"

export async function loader() {
  const promises = [myMembers(), getAllUsers()]
  const [members, users] = await Promise.all(promises)
  
  if(members.status !== 200) {
    return null
  }

  return{
    members: members.data.members,
    users: users.status == 200 ? users.data.users : []
  }
}

function TrainersAndStudents() {

  const {members, users} = useLoaderData()

  const [myMembers, setMyMembers] = useState(members);
  const [allUsers] = useState(users);
  const {user} = useOutletContext();

  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [id, setId] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [title, setTitle] = useState('')

  const toast = useRef(null);
  
  const deleteStudent = async () => {
      setIsLoading(true)
      const response = await removeStudent(id)
      if(response.status === 200) {
          setMyMembers(myMembers.filter(member => member.user.id != id))
          setDeleteDialog(false)
          if (toast.current) {
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Alumno eliminado', life: 3000 });
          }
      }
      setIsLoading(false)
  }

  const handleSubmitStudent = async () => {
      setIsLoading(true)
      if(isEdit) {
          const response = await updateStudent(id, title);
          if (response.status === 200) {
              setMyMembers(myMembers.map(member => member.user.id == id ? { ...member, title: title } : member));
              if (toast.current) {
                  toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Alumno actualizado', life: 3000 });
              }
          } else {
              if (toast.current) {
                  toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el alumno', life: 3000 });
              }
          }
      } else {
          const response = await addStudent(id, title);
          if (response.status === 200) {
              setMyMembers([...myMembers, response.data.member]);
              if (toast.current) {
                  toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Alumno agregado', life: 3000 });
              }
          } else {
              if (toast.current) {
                  toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar el alumno', life: 3000 });
              }
          }
      }
      setShowDialog(false)
      setIsLoading(false)
  }

  const groupedItemTemplate = (option) => {
    return (
        <div className="bg-primary text-white font-bold p-3">
            <div>{option.name}</div>
        </div>
      );
  };

  return (
    <div>
      <Toast ref={toast} />
      {isLoading ? <LoaderPage /> : (
        <div>
          <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl my-5'>{user.user_type == 3 ? 'Alumnos' : user.user_type == 2 ? 'Personas de tu sede' : 'Entrenadores'}</h1>
          {user.user_type == 3 && (
              <div className="flex justify-center items-center my-5">
                <Button onClick={() => {setShowDialog(true), setId(''), setTitle(''), setIsEdit(false)}} className="bg-primary text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-primary-dark">Agregar Alumno</Button>
              </div>
            )}
    
          {myMembers?.length > 0 ?  (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 md:mx-20 md:my-12">
            {myMembers.map(myMember =>(
                <Member key={myMember.id} myMember={myMember} type={user.user_type} deleteStudent={deleteStudent} setDeleteDialog={setDeleteDialog} setId={setId} setIsEdit={setIsEdit} setShowDialog={setShowDialog} setTitle={setTitle}/>
            ))}
            </div>
          ) : (
            <div className="flex justify-center items-center my-32">
            <p className='text-primary text-2xl font-bold'>No tienes ningún {user.user_type == 3 ? 'alumno, agrega uno.' : user.user_type == 2 ? 'miembro en tu sede.' : user.user_type == 1 && 'entrenador.' }</p>
          </div>
          )}
          <Dialog header={`${isEdit ? 'Editar' : 'Agregar'} alumno`} visible={showDialog} className='w-full md:w-2/3 lg:w-1/2' onHide={() => setShowDialog(false)}>
              <div className='flex flex-col gap-3 my-3'>
                <InputText value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" className="w-full" style={{width: '100%', display: 'flex'}} />
                <Dropdown filter showClear disabled={isEdit ? true : false} value={id} onChange={(e) => setId(e.value)} options={allUsers} optionLabel="full_name"  optionValue='id'
                    optionGroupLabel="name" optionGroupChildren="users" optionGroupTemplate={groupedItemTemplate} className="w-full" placeholder="Selecciona el alumno" style={{width: '100%', display: 'flex'}} />
                <Button label="Guardar" onClick={handleSubmitStudent} className="p-button-text bg-green-600 hover:bg-green-800 border-none block m-auto" />
              </div>
          </Dialog>
          <Dialog header="Eliminar alumno" visible={deleteDialog} className='w-full md:w-1/3 lg:w-1/4' onHide={() => setDeleteDialog(false)}>
              <div className='flex flex-col gap-3 my-3'>
              <p>¿Estás seguro de que ya no quieres a este alumno?</p>
              <Button label="Eliminar" onClick={deleteStudent} className="p-button-text bg-red-600 hover:bg-red-800 border-none block m-auto" />
              </div>
          </Dialog>
        </div>
      )}
    </div>
  )
}

export default TrainersAndStudents
