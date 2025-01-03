import {getAll, create, update, remove } from '../../services/branch'

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
import { InputMask } from 'primereact/inputmask';


export async function loader() {
    const response = await getAll()
    if(response.status !== 200) {
        return null
    }
    return response.data.branches
}

export async function action({request}) {

    const formData = await request.formData()
    const id = formData.get('id')
    const name = formData.get('branch_name')
    const location = formData.get('branch_location')
    const phone = formData.get('branch_phone')

    if (!name || !location || !phone) {
        return {status:0, data:['Todos los campos son requeridos']}
    }

    if (id) {
        const response = await update(id, name, location, phone)
        if(response.status !== 200) {
          return {status:0, data:[response.data.errors]}
        }
        return {status:1, data:[response.data.message]}
    }
    const response = await create(name, location, phone)
    if(response.status !== 201) {
      return {status:0, data:[response.data.errors]}
    }
    return {status:1, data:[response.data.message]}
}


function Branches() {

  const [showDialog, setShowDialog] = useState(false);
  const [branches, setBranches] = useState(useLoaderData())
  const [refreshing, setRefreshing] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  
  const messages = useActionData()

  const toast = useRef(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    const response = await getAll()
    if(response.status == 200) {
      setBranches(response.data.branches)
    }
    setRefreshing(false);
  };

  const addBranche = () => {
    setId('');
    setName('');
    setLocation('');
    setPhone('');
    setShowDialog(true);
  };

  const onEdit = (rowData) => {
    setId(rowData.id);
    setName(rowData.name);
    setLocation(rowData.location);
    setPhone(rowData.phone_number);
    setShowDialog(true);
  };

  const onDelete = (rowData) => {
    setId(rowData.id);
    setName(rowData.name);
    setDeleteDialog(true);
  }
  
  const deleteBranch = async () => {
    const response = await remove(id)
    setDeleteDialog(false);
    if(response.status !== 200) {
      toast.current.show({severity:'error', summary:'Error', detail: name + ' no pudo ser eliminado'});
      return;
    }
    remove(id)
    toast.current.show({severity:'success', summary:'Borrado', detail: name + ' eliminado correctamente'});
    handleRefresh();
  }
  

  const actionTemplate = (rowData) => {
      return (
          <div className='flex justify-center items-center gap-2'>
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-success bg-yellow-600 border-none hover:bg-yellow-800" onClick={() => onEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-danger bg-red-600 border-none hover:bg-red-800" onClick={() => onDelete(rowData)} />
          </div>
      );
  };

  const header = (
    <div className="flex justify-between items-center w-full">
        <Button icon="pi pi-plus" onClick={addBranche } className="p-button-text bg-lime-600 hover:bg-lime-800 border-none" />
        <Button icon="pi pi-refresh" onClick={handleRefresh} className="p-button-text" />
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
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl'>Sedes</h1>
      {refreshing ? (
          <div className="mx-auto" style={{ height: '200px' }}>
            <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
          </div>
      ) :
      (<DataTable value={branches} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} header={header}>
          <Column field="id" header="ID" style={{ width: '10%' }} sortable></Column>
          <Column field="name" header="Nombre" style={{ width: '60%' }} sortable></Column>
          <Column body={actionTemplate} style={{ width: '10%' }}></Column>
      </DataTable>)}
      <Dialog header={`${id ? 'Editar' : 'Agregar'} sede`} visible={showDialog} className='w-full md:w-3/4 lg:w-1/2' onHide={() => {if (!showDialog) return; setShowDialog(false); }}>
        <Form method="POST" className="flex flex-col gap-3 my-3">
          <label htmlFor="branch_name" className=" text-gray-500 font-bold">Nombre</label>
          <input type="hidden" name="id" value={id} />
          <InputText
            id="branch_name" 
            type="text"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            name="branch_name"
          />
          <label htmlFor="branch_location" className=" text-gray-500 font-bold">Localización</label>
          <InputTextarea
            id="branch_location" 
            type="text"
            className="w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)} 
            name="branch_location"
            rows={5} 
            cols={30} 
          />
          <div className='flex items-center gap-2'>
            <label htmlFor="branch_phone" className=" text-gray-500 font-bold">Teléfono</label>
            <InputMask
              id="branch_phone" 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
              name="branch_phone"
              mask="99-9999-9999"
            />
          </div>
        <Button label="Guardar" className="p-button-text bg-lime-600 hover:bg-lime-800 border-none" />  
        </Form>
    </Dialog>
    <Dialog header="Eliminar sede" visible={deleteDialog} className='w-full md:w-1/3 lg:w-1/4' onHide={() => setDeleteDialog(false)}>
        <div className='flex flex-col gap-3 my-3'>
          <p>¿Estás seguro de eliminar esta sede?</p>
          <Button label="Eliminar" onClick={deleteBranch} className="p-button-text bg-red-600 hover:bg-red-800 border-none block m-auto" />
        </div>
    </Dialog>
    </div>
  )
}
export default Branches
