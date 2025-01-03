import { getAll } from '../../services/users'

import { useState, useEffect, useRef } from 'react'

import { useLoaderData, Form, useActionData} from "react-router-dom"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';


export async function loader() {
    const response = await getAll()
    if(response.status !== 200) {
        return response.data.errors
    }
    return response.data
}

export async function action({request}) {
  return null
}


function Users() {
  const { users: usersData, branches: branchesData } = useLoaderData()
  const [showDialog, setShowDialog] = useState(false);
  const [users, setUsers] = useState(usersData)
  const [branches, setBranches] = useState(branchesData)
  const [refreshing, setRefreshing] = useState(false);

  const [id, setId] = useState('');
  
  const messages = useActionData()

  const toast = useRef(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    const response = await getAll()
    if(response.status == 200) {
      setUsers(response.data.users)
      setBranches(response.data.branches)
    }
    setRefreshing(false);
  };

  const actionTemplate = (rowData) => {
      return (
          <div className='flex justify-center items-center gap-2'>
              
          </div>
      );
  };

  const header = (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2">
        <Button label="Refrescar" icon="pi pi-refresh" className="p-button-raised p-button-info" onClick={handleRefresh} />
      </div>
    </div>
  );

  useEffect(() => {
    if(messages?.data.length) {
      const msg = messages.data.map((message) => {
        return { severity: messages.status ? 'success' : 'error', content :(
          <p>{message}</p>
        )}
      }) 
      if(messages){
        toast.current.clear();
        toast.current.show(msg);
      }
      if(messages.status) handleRefresh();
    }  
    setShowDialog(false);
  }, [messages])

  return (
    <div className='my-12 space-y-12 mx-2 md:mx-5'>
      <Toast ref={toast} />
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl'>Usuarios</h1>
      {refreshing ? (
          <div className="mx-auto" style={{ height: '200px' }}>
            <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
          </div>
      ) :
      (<DataTable value={users} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} header={header}>
            {/* "id": 19,
            "name": "Junius Kemmer Sr.",
            "email": "rosenbaum.thea@example.org",
            "email_verified_at": null,
            "created_at": "2024-12-31T03:59:18.000000Z",
            "updated_at": "2024-12-31T03:59:18.000000Z",
            "paternal_last_name": "Farrell",
            "maternal_last_name": "Borer",
            "phone_number": "678.462.9721",
            "birthdate": "1980-05-22",
            "sex": 1,
            "tshirt_size": "XXL",
            "user_type": 3,
            "branch_id": 4,
            "full_name": "Junius Kemmer Sr. Farrell Borer",
            "type": "Instructor" */}
          <Column field="id" header="ID" sortable></Column>
          <Column field='full_name' header="Nombre" sortable frozen className='min-w-20 md:min-w-52' />
          <Column field="email" header="Correo" sortable></Column>
          <Column field="type" header="Tipo" sortable></Column>
          <Column field="branch_id" header="Rama" sortable body={
            (rowData) => {
              const branch = branches.find(branch => branch.id == rowData.branch_id)
              return branch ? branch.name : ''
            }
          }></Column>
          <Column field="phone_number" header="Teléfono" sortable></Column>
          <Column field="birthdate" header="Fecha de nacimiento" sortable></Column>
          <Column field='sex_name' header='Sexo' sortable></Column>
          <Column field='tshirt_size' header='Talla de camisa' sortable></Column>
          <Column body={actionTemplate} ></Column>
      </DataTable>)}
      <Dialog header={`${id ? 'Editar' : 'Agregar'} tipo de evento`} visible={showDialog} className='w-full md:w-3/4 lg:w-1/2' onHide={() => {if (!showDialog) return; setShowDialog(false); }}>
        <Form method="POST" className="flex flex-col gap-3 my-3">
          
        <Button label="Guardar" className="p-button-text bg-lime-600 hover:bg-lime-800 border-none" />  
        </Form>
    </Dialog>

    </div>
  )
}
export default Users
