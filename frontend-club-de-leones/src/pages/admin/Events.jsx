import {getAll, create, update, remove } from '../../services/event'
import {formatDate} from '../../utils/formatDate'

import { useState, useEffect, useRef } from 'react'

import { useLoaderData, Form, useActionData} from "react-router-dom"

import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';


export async function loader() {
    const response = await getAll()
    if(response.status !== 200) {
        return null
    }
    return response.data
}

export async function action({request}) {

    const formData = await request.formData()
    const id = formData.get('id')
    const name = formData.get('event_name')
    const description = formData.get('event_description')
    const start_date = formatDate(formData.get('event_start_date'))
    const end_date = formatDate(formData.get('event_end_date'))
    const sign_up_deadline = formatDate(formData.get('event_sign_up_deadline'))
    const sign_up_fee = formData.get('event_sign_up_fee').replace(/[$,]/g, '')
    const min_age = formData.get('event_min_age')
    const max_age = formData.get('event_max_age')
    const max_participants = formData.get('event_max_participants')
    const branch_id = formData.get('event_branch')
    const type_id = formData.get('event_type')
    const managers = formData.get('event_managers').split(',').map((e) => parseInt(e))


    if(!name || !description || !start_date || !end_date || !sign_up_deadline || !sign_up_fee || !min_age || !max_age || !max_participants || !branch_id || !type_id || !managers) {
        return {status:0, data:['Todos los campos son obligatorios']}
    }

    if(!managers.length || Number.isNaN(parseInt(managers[0]))) {
        return {status:0, data:['Debes agregar al menos un manager']}
    }

    if(parseInt(min_age) > parseInt(max_age)) {
        return {status:0, data:['La edad mínima no puede ser mayor a la edad máxima']}
    }

    const data = {
        name,
        description,
        start_date,
        end_date,
        sign_up_deadline,
        sign_up_fee,
        min_age,
        max_age,
        max_participants,
        branch_id,
        type_id,
        managers
    }

    if (id) {
        const response = await update(id, data)
        if(response.status !== 200) {
          return {status:0, data:["Error al actualizar el evento"]}
        }
        return {status:1, data:["Evento actualizado"]}
    }
    const response = await create(data)
    if(response.status !== 201) {
      return {status:0, data:["Error al crear el evento"]}
    }
    return {status:1, data:["Evento creado"]}
}


function Event() {

  const { branches: branchesData, events: eventsData, types: typesData, trainers: trainersData } = useLoaderData()
  const [showDialog, setShowDialog] = useState(false);
  const [events, setEvents] = useState(eventsData)
  const [branches] = useState(branchesData)
  const [types] = useState(typesData)
  const [trainers] = useState(trainersData)

  const [refreshing, setRefreshing] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'branch.id': { value: null, matchMode: FilterMatchMode.EQUALS },
    'type.id': { value: null, matchMode: FilterMatchMode.EQUALS},
  });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stardDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [signUpDeadline, setSignUpDeadline] = useState('');
  const [signUpFee, setSignUpFee] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [branch, setBranch] = useState('');
  const [type, setType] = useState('');
  const [managers, setManagers] = useState('');
  
  const messages = useActionData()

  const toast = useRef(null);

  const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };

      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    const response = await getAll()
    if(response.status == 200) {
      setEvents(response.data.events)
    }
    setRefreshing(false);
  };

  const addEventType = () => {
    setId('');
    setName('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setSignUpDeadline('');
    setSignUpFee('');
    setMinAge('');
    setMaxAge('');
    setMaxParticipants('');
    setBranch('');
    setType('');
    setManagers([]);
    setShowDialog(true);
  };

  const onEdit = (rowData) => {
    setId(rowData.id);
    setName(rowData.name);
    setDescription(rowData.description);
    setStartDate(new Date(rowData.start_date));
    setEndDate(new Date(rowData.end_date));
    setSignUpDeadline(new Date(rowData.sign_up_deadline));
    setSignUpFee(rowData.sign_up_fee);
    setMinAge(rowData.min_age);
    setMaxAge(rowData.max_age);
    setMaxParticipants(rowData.max_participants);
    setBranch(rowData.branch.id);
    setType(rowData.type.id);
    setManagers(rowData.managers.map((e) => e.id));
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
    toast.current.show({severity:'success', summary:'Borrado', detail: name + ' fue eliminado correctamente'});
    setEvents(events.filter((e) => e.id !== id));
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
    <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
      <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} 
          placeholder="Buscar" />
      </IconField>
      <div className="flex justify-between items-center w-full">
          <Button icon="pi pi-plus" onClick={addEventType } className="p-button-text bg-lime-600 hover:bg-lime-800 border-none" />
          <Button icon="pi pi-refresh" onClick={handleRefresh} className="p-button-text" />
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
      if(messages.status){
        setShowDialog(false);
        handleRefresh();
      } 
    }  
  }, [messages])

   const branchBodyTemplate = (rowData) => {
      return rowData?.branch ? <Tag value={rowData.branch.name} className='text-sm' style={{background: 'linear-gradient(-225deg,#3a6b99 0%,#23609a 48%,#175794 100%)'}} /> : ''
    }

   const typehBodyTemplate = (rowData) => {
      return rowData?.type ? <Tag value={rowData.type.name} className='text-sm' style={{background: 'linear-gradient(-225deg,#df0101 0%,#a80000 48%,#a00202 100%)'}} /> : ''
    }

    const branchItemTemplate = (option) => {
      const branch = branches.find((e) => e.id === option);
      return <Tag value={branch.name} className='text-sm'  style={{background: 'linear-gradient(-225deg,#3a6b99 0%,#23609a 48%,#175794 100%)'}} />
    };

    const branchRowFilter = (options) => {
      return (
        <Dropdown value={options.value} options={branches.map((e) => e.id)} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={branchItemTemplate} placeholder="Sede" className='text-sm'  style={{ width: '7rem'}} />
      );
    };

    const typeItemTemplate = (option) => {
      const type = types.find((e) => e.id === option);
      return <Tag value={type.name} className='text-sm'  style={{background: 'linear-gradient(-225deg,#df0101 0%,#a80000 48%,#a00202 100%)'}} />
    };

    const typeRowFilter = (options) => {
      return (
        <Dropdown value={options.value} options={types.map((e) => e.id)} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={typeItemTemplate} placeholder="Tipo" className='text-sm'  style={{ width: '7rem'}} />
      );
    };

    const groupedItemTemplate = (option) => {
      return (
          <div className="flex align-items-center">
              <div>{option.name}</div>
          </div>
        );
    };
  
    return (
    <div className='my-12 space-y-12 mx-2 md:mx-5'>
      <Toast ref={toast} />
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl'>Eventos</h1>
      <DataTable sortField="id" sortOrder={-1} value={events} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} header={header} loading={refreshing}
        globalFilterFields={['name', 'start_date', 'end_date', 'branch.name', 'type.name']} emptyMessage="No hay eventos registrados"
        filters={filters} filterDisplay="row">
          <Column field="id" header="ID" sortable></Column>
          <Column field="name" header="Nombre" sortable frozen></Column>
          <Column field='start_date' header='Fecha de inicio' sortable></Column>
          <Column field='end_date' header='Fecha de fin' sortable></Column> 
          <Column field='branch.id' header='Sede' body={branchBodyTemplate} filter filterElement={branchRowFilter} showFilterMenu={false} filterMenuStyle={{ width: '2rem' }}></Column>
          <Column field='type.id' header='Tipo de evento' body={typehBodyTemplate} filter filterElement={typeRowFilter} showFilterMenu={false} filterMenuStyle={{ width: '2rem' }}></Column>
          <Column body={actionTemplate}></Column>
      </DataTable>
      <Dialog header={`${id ? 'Editar' : 'Agregar'} evento`} visible={showDialog} className='w-full md:w-5/6 lg:w-2/3 overflow-auto' onHide={() => {if (!showDialog) return; setShowDialog(false); }}>
        <Form method="POST" className="flex flex-col gap-3 my-3">
          <label htmlFor="event_name" className="text-gray-500 text-sm md:text-base font-bold">Nombre</label>
          <input type="hidden" name="id" value={id} />
          <InputText
            id="event_name" 
            type="text"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.value)} 
            name="event_name"
          />
          <label htmlFor="event_description" className="text-gray-500 text-sm md:text-base font-bold">Descripción</label>
          <InputTextarea
            id="event_description" 
            type="text"
            className="w-full"
            value={description}
            onChange={(e) => setDescription(e.value)} 
            name="event_description"
            rows={5} 
            cols={30} 
          />
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-3 '>
            <div className='flex items-center gap-3 justify-between'>
              <label htmlFor="event_start_date" className="text-gray-500 text-sm md:text-base font-bold  min-w-20">Fecha de Inicio</label>
              <Calendar id="event_start_date" value={stardDate} onChange={(e) => setStartDate(e.value)} name="event_start_date" showTime hourFormat="24" showIcon />
            </div>
            <div className='flex items-center gap-3 justify-between'>
              <label htmlFor="event_end_date" className="text-gray-500 text-sm md:text-base font-bold  min-w-20">Fecha de Fin</label>
              <Calendar id="event_end_date" value={endDate} onChange={(e) => setEndDate(e.value)} name="event_end_date" showTime hourFormat="24" showIcon />
            </div>
            <div className='flex items-center gap-3 justify-between'>
              <label htmlFor="event_sign_up_deadline" className="text-gray-500 text-sm md:text-base font-bold  min-w-20">Fin de Inscripción</label>
              <Calendar id="event_sign_up_deadline" value={signUpDeadline} onChange={(e) => setSignUpDeadline(e.value)} name="event_sign_up_deadline" showTime hourFormat="24" showIcon />
            </div>
            <div className='flex items-center gap-3 justify-between'>
              <label htmlFor="event_sign_up_fee" className="text-gray-500 text-sm md:text-base font-bold  min-w-20">Precio</label>
              <div>
                <InputNumber inputId="event_sign_up_fee" name='event_sign_up_fee'  value={signUpFee} onValueChange={(e) => setSignUpFee(e.value)} mode="currency" currency="USD" locale="en-US" />
              </div>  
            </div>
            <div className='flex items-center gap-3 justify-between'>
              <label htmlFor="event_min_age" className="text-gray-500 text-sm md:text-base font-bold  min-w-20">Edad Mínima</label>
              <div>
                <InputNumber showButtons min={0} max={100} inputId="event_min_age" name='event_min_age'  value={minAge} onValueChange={(e) => setMinAge(e.value)} />
              </div>  
            </div>
            <div className='flex items-center gap-3 justify-between'>
              <label htmlFor="event_max_age" className="text-gray-500 text-sm md:text-base font-bold  min-w-20">Edad Máxima</label>
              <div>
                <InputNumber showButtons min={0} max={100} inputId="event_max_age" name='event_max_age'  value={maxAge} onValueChange={(e) => setMaxAge(e.value)} />
              </div>
            </div>
            <div className='flex items-center gap-3 justify-between xl:justify-center xl:col-span-2 xl:gap-10'>
              <label htmlFor="event_max_participants" className="text-gray-500 text-sm md:text-base font-bold  min-w-20">Máximo de Participantes</label>
              <div>
                <InputNumber showButtons inputId="event_max_participants" name='event_max_participants'  value={maxParticipants} onValueChange={(e) => setMaxParticipants(e.value)} />
              </div>
            </div>
          </div>
        <label htmlFor="event_type" className="text-gray-500 text-sm md:text-base font-bold">Tipo</label>
        <Dropdown
          options={types}
          id='event_type'
          className='w-full block'
          style={{width: '100%', display: 'flex'}}
          optionLabel="name"
          optionValue="id"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)} 
          name="event_type"
        />
        <label htmlFor="event_branch" className="text-gray-500 text-sm md:text-base font-bold">Sede</label>
        <Dropdown
          options={branches}
          id='event_branch'
          className='w-full block'
          style={{width: '100%', display: 'flex'}}
          optionLabel="name"
          optionValue="id"
          type="text"
          value={branch}
          onChange={(e) => setBranch(e.target.value)} 
          name="event_branch"
        />
        <label htmlFor="event_managers" className="text-gray-500 text-sm md:text-base font-bold">Managers</label>
        <MultiSelect value={managers} options={trainers} onChange={(e) => setManagers(e.value)} optionLabel="full_name" optionValue='id'
                optionGroupLabel="name" optionGroupChildren="users" optionGroupTemplate={groupedItemTemplate}
                placeholder="Agrega managers" display="chip" style={{width: '100%', display: 'flex'}}
                panelClassName='block' />
        <input type="hidden" name="event_managers" value={managers} />
        <Button label="Guardar" className="p-button-text bg-lime-600 hover:bg-lime-800 border-none" />  
        </Form>
    </Dialog>
    <Dialog header="Eliminar evento" visible={deleteDialog} className='w-full md:w-1/3 lg:w-1/4' onHide={() => setDeleteDialog(false)}>
        <div className='flex flex-col gap-3 my-3'>
          <p>¿Estás seguro de eliminar este evento?</p>
          <Button label="Eliminar" onClick={deleteEventType} className="p-button-text bg-red-600 hover:bg-red-800 border-none block m-auto" />
        </div>
    </Dialog>

    </div>
  )
}
export default Event
