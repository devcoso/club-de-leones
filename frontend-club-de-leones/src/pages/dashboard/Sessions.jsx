import { getAllSessionsByEvent, update } from "../../services/session"

import {formatDate} from '../../utils/formatDate'

import { useState } from "react"

import { useLoaderData } from "react-router-dom"

import { FilterMatchMode } from "primereact/api"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { InputText } from "primereact/inputtext"
import { InputMask } from "primereact/inputmask"
import { InputIcon } from "primereact/inputicon"
import { Dropdown } from "primereact/dropdown"
import { IconField } from "primereact/iconfield"
import { Tag } from "primereact/tag"
import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"

export async function loader({params}) {
    const response = await getAllSessionsByEvent(params.id)
    if(response.status !== 200) {
        return redirect('/dashboard/events')
    }
    return response.data.event_sessions
}


function Sessions() {
    const event_sessions = useLoaderData()

    const [sessions, setSessions] = useState(event_sessions.sessions)

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'user.full_name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'participated_at': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'duration': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'user.email': { value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'user.age': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'created_at' : { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'user.sex_name': { value: null, matchMode: FilterMatchMode.EQUALS },
        'user.tshirt_size': { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [sex] = useState(['Masculino', 'Femenino']);
    const [tshirtSizes] = useState(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
    const [tempDate, setTempDate] = useState(null);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
  
        _filters['global'].value = value;
  
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const getSeveritySex = (type) => {
        switch (type) {
            case 'Masculino':
                return 'info';
            case 'Femenino': 
                return 'warning';
        }
    };

    const getSeverityTShirt = (type) => {
        switch (type) {
            case 'XS':
                return 'warning';
            case 'S':
                return 'info';
            case 'M':
                return 'success';
            case 'L':
                return 'warning';
            case 'XL':
                return 'danger';
            case 'XXL':
                return 'danger';
        }
      };

    const handleRefresh = async () => {
        setRefreshing(true);
        const response = await getAllSessionsByEvent(event_sessions.event_id)
        if(response.status === 200) {
            setSessions(response.data.event_sessions.sessions)
        }
        setRefreshing(false);
    }
  
    const handleEditDuration = async (id, newValue, actualValue) => {
        if(newValue === actualValue) return;

        const response = await update(id, {duration: newValue});

        if(response.status !== 200) {
            return;
        }

        const _sessions = [...sessions];
        const index = _sessions.findIndex(session => session.id === id);
        _sessions[index].duration = newValue;
        setSessions(_sessions);
    }

    const handleEditParticipated = async (id, actualValue) => {
        if(!tempDate) return;
        if(tempDate.date === actualValue) {
            setTempDate(null);
            return;
        }
        
        const response = await update(id, {participated_at: formatDate(tempDate.date)});

        if(response.status !== 200) {
            return;
        }

        const _sessions = [...sessions];
        const index = _sessions.findIndex(session => session.id === id);
        _sessions[index].participated_at = tempDate.date;
        setSessions(_sessions);
        setTempDate(null);
    }


    const header = (
    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} 
            placeholder="Buscar" />
        </IconField>
        <Button icon="pi pi-refresh" onClick={handleRefresh} />
    </div>
    );


      const sexItemTemplate = (option) => {
          return <Tag value={option} severity={getSeveritySex(option)} className='text-sm' />;
      };

      const dateBodyTemplate = (rowData) => {
            return <div className='flex justify-center'>
                {new Date(rowData.created_at).toLocaleDateString()}
            </div>
      };
    
      const sexRowFilter = (options) => {
        return (
            <Dropdown value={options.value} options={sex} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={sexItemTemplate} placeholder="Sexo" className='text-sm'  style={{ width: '7rem'}} />
        );
      };

      const sexBodyTemplate = (rowData) => {
        return <div className='flex justify-center'>
          <Tag value={rowData.user.sex_name} severity={getSeveritySex(rowData.user.sex_name)} />
        </div>
      }

      const tshirtItemTemplate = (option) => {
            return <Tag value={option} severity={getSeverityTShirt(option)} className='text-sm' />;
      };

      const tshirtBodyTemplate = (rowData) => {
        return <div className='flex justify-center'>
          <Tag value={rowData.user.tshirt_size} severity={getSeverityTShirt(rowData.user.tshirt_size)} />
        </div>
      }
  
    const tshirtRowFilter = (options) => {
      return (
          <Dropdown value={options.value} options={tshirtSizes} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={tshirtItemTemplate} placeholder="Talla de camisa" className='text-sm'  style={{ width: '7rem'}} />
      );
    };

    const durationEditor = (rowData) => {
        return <InputMask value={rowData.duration} onBlur={(e) => handleEditDuration(rowData.id, e.target.value, rowData.duration)}  mask="99:99:99"  className='text-sm' style={{ width: '5rem' }} />;
    };
    
    const participtedEditor = (rowData) => {
        const date = (tempDate && (tempDate.id == rowData.id ? tempDate.date : false)) || (rowData.participated_at && new Date(rowData.participated_at));

        return <Calendar value={date} onChange={e => setTempDate({id:rowData.id, date: e.value && new Date(e.value)})} onHide={(e) => handleEditParticipated(rowData.id, new Date(rowData.participated_at))} showTime hourFormat="24" showButtonBar/>;
    }

    return (
        <div className="w-full md:w-5/6 mx-auto bg-white shadow-md rounded my-6 py-5 px-2 md:px-5 space-y-5">
            <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl my-5'>Participaciones de {event_sessions.event_name}</h1>
            <DataTable value={sessions} paginator editMode="cell" dataKey="id" rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} header={header} loading={refreshing}
                globalFilterFields={['user.full_name', 'user.email', 'user.age', 'user.sex_name']} emptyMessage="No hay sesiones registradas"
                filters={filters} filterDisplay="row">
                <Column field='user.full_name' header="Nombre" sortable frozen className='min-w-20 md:min-w-52' />
                <Column field="user.email" header="Correo" sortable></Column>
                <Column field="participated_at" header="Participó" body={participtedEditor} sortable ></Column>
                <Column  field="duration" header="Duración" sortable body={durationEditor}></Column>
                <Column field="user.age" header="Edad" sortable></Column>
                <Column field="created_at" header="Fecha de inscripción" sortable body={dateBodyTemplate}></Column>
                <Column field='user.sex_name' header='Sexo' body={sexBodyTemplate} filter filterElement={sexRowFilter} showFilterMenu={false} filterMenuStyle={{ width: '2rem' }}></Column>
                <Column field='user.tshirt_size' header='Talla de camisa' body={tshirtBodyTemplate} filter filterElement={tshirtRowFilter} showFilterMenu={false} filterMenuStyle={{ width: '2rem' }}></Column>
            </DataTable>
        </div>
    )
}

export default Sessions
