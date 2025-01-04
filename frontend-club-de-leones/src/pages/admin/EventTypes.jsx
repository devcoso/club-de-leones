import {getAll, create, update, remove } from '../../services/eventType'

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
        return null
    }
    return response.data.categories
}

export async function action({request}) {

    const formData = await request.formData()
    const id = formData.get('id')
    const name = formData.get('event_type_name')
    const description = formData.get('event_type_description')

    if(!name || !description) {
        return {status:0, data:['Todos los campos son obligatorios']}
    }

    if (id) {
        const response = await update(id, name, description)
        if(response.status !== 200) {
          return {status:0, data:[response.data.errors]}
        }
        return {status:1, data:[response.data.message]}
    }
    const response = await create(name, description)
    if(response.status !== 201) {
      return {status:0, data:[response.data.errors]}
    }
    return {status:1, data:[response.data.message]}
}


function EventTypes() {

  const [showDialog, setShowDialog] = useState(false);
  const [categories, setCategories] = useState(useLoaderData())
  const [refreshing, setRefreshing] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const messages = useActionData()

  const toast = useRef(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    const response = await getAll()
    if(response.status == 200) {
      setCategories(response.data.categories)
    }
    setRefreshing(false);
  };

  const addEventType = () => {
    setId('');
    setName('');
    setDescription('');
    setShowDialog(true);
  };

  const onEdit = (rowData) => {
    setId(rowData.id);
    setName(rowData.name);
    setDescription(rowData.description);
    setShowDialog(true);
  };

  const onDelete = (rowData) => {
    setId(rowData.id);
    setName(rowData.name);
    setDeleteDialog(true);
  }

  const deleteEventType = async () => {
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
        <Button icon="pi pi-plus" onClick={addEventType } className="p-button-text bg-lime-600 hover:bg-lime-800 border-none" />
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
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl'>Tipos de eventos</h1>
      <DataTable value={categories} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} header={header} loading={refreshing}>
          <Column field="id" header="ID" style={{ width: '5%' }} sortable></Column>
          <Column field="name" header="Tipo" style={{ width: '25%' }} sortable></Column>
          <Column field="description" header="Descripción" style={{ width: '60%' }}></Column>
          <Column body={actionTemplate} style={{ width: '10%' }}></Column>
      </DataTable>
      <Dialog header={`${id ? 'Editar' : 'Agregar'} tipo de evento`} visible={showDialog} className='w-full md:w-3/4 lg:w-1/2' onHide={() => {if (!showDialog) return; setShowDialog(false); }}>
        <Form method="POST" className="flex flex-col gap-3 my-3">
          <label htmlFor="event_type_name" className=" text-gray-500 font-bold">Nombre</label>
          <input type="hidden" name="id" value={id} />
          <InputText
            id="event_type_name" 
            type="text"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            name="event_type_name"
          />
          <label htmlFor="event_type_description" className=" text-gray-500 font-bold">Descripción</label>
          <InputTextarea
            id="event_type_description" 
            type="text"
            className="w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            name="event_type_description"
            rows={5} 
            cols={30} 
          />
        <Button label="Guardar" className="p-button-text bg-lime-600 hover:bg-lime-800 border-none" />  
        </Form>
    </Dialog>
    <Dialog header="Eliminar tipo de evento" visible={deleteDialog} className='w-full md:w-1/3 lg:w-1/4' onHide={() => setDeleteDialog(false)}>
        <div className='flex flex-col gap-3 my-3'>
          <p>¿Estás seguro de eliminar este tipo de evento?</p>
          <Button label="Eliminar" onClick={deleteEventType} className="p-button-text bg-red-600 hover:bg-red-800 border-none block m-auto" />
        </div>
    </Dialog>

    </div>
  )
}
export default EventTypes
