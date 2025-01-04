import { getAll, assignType, assignBranch } from '../../services/users'

import { useState, useRef } from 'react'

import { useLoaderData} from "react-router-dom"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { FilterMatchMode } from 'primereact/api';
import { Tag } from 'primereact/tag';
import { Message } from 'primereact/message';

export async function loader() {
    const response = await getAll()
    if(response.status !== 200) {
        return response.data.errors
    }
    return response.data
}


function Users() {
  
  const { users: usersData, branches: branchesData } = useLoaderData()

  const [users, setUsers] = useState(usersData)
  const [branches, setBranches] = useState(branchesData)
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    full_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH},
    phone_number: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    branch_id: { value: null, matchMode: FilterMatchMode.EQUALS },
    type: { value: null, matchMode: FilterMatchMode.EQUALS },
    sex_name: { value: null, matchMode: FilterMatchMode.EQUALS },
    tshirt_size: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [types] = useState(['Administrador', 'Instructor', 'Miembro']);
  const [sex] = useState(['Masculino', 'Femenino']);
  const [tshirtSizes] = useState(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
  

  const toast = useRef(null);

  const getSeverityType = (type) => {
    switch (type) {
        case 'Administrador':
            return 'danger';
        case 'Miembro':
            return 'info';
        case 'Instructor':
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

  const getSeveritySex = (type) => {
    switch (type) {
        case 'Masculino':
            return 'info';
        case 'Femenino': 
            return 'warning';
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    const response = await getAll()
    if(response.status == 200) {
      setUsers(response.data.users)
      setBranches(response.data.branches)
    }
    setRefreshing(false);
  };

  const handleEditType = async(type, id) => {
    const response = await assignType(id, type)
    if(response.status !== 200) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.message });
      return
    }
    const user = users.find(user => user.id == id)
    user.type = type
    setUsers([...users])
    toast.current.show({ severity: 'success', summary: 'Éxito', detail: response.data.message });
  };

  const handleEditBranch = async(branch, id) => {
    const response = await assignBranch(id, branch)
    if(response.status !== 200) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.message });
      return
    }
    const user = users.find(user => user.id == id)
    user.branch_id = branch
    setUsers([...users])
    toast.current.show({ severity: 'success', summary: 'Éxito', detail: response.data.message });
  };

  const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };

      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
  };

  const typeItemTemplate = (option) => {
      return <Tag value={option} severity={getSeverityType(option)} className='text-sm' />;
  };

  const typeRowFilter = (options) => {
    return (
        <Dropdown value={options.value} options={types} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={typeItemTemplate} placeholder="Tipo" className='text-sm'  style={{ width: '7rem'}} />
    );
  };
  const sexItemTemplate = (option) => {
      return <Tag value={option} severity={getSeveritySex(option)} className='text-sm' />;
  };

  const sexRowFilter = (options) => {
    return (
        <Dropdown value={options.value} options={sex} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={sexItemTemplate} placeholder="Sexo" className='text-sm'  style={{ width: '7rem'}} />
    );
  };

  const branchItemTemplate = (option) => {
      const branch = branches.find(branch => branch.id == option)
      if(!branch) return <></>
      return <Tag value={branch.name} className='text-sm'  style={{background: 'linear-gradient(-225deg,#3a6b99 0%,#23609a 48%,#175794 100%)'}} />
  };

  const branchRowFilter = (options) => {
    return (
        <Dropdown value={options.value} options={branches.map((e) => e.id)} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={branchItemTemplate} placeholder="Sede" className='text-sm'  style={{ width: '7rem'}} />
    );
  };

  const tshirtItemTemplate = (option) => {
      return <Tag value={option} severity={getSeverityTShirt(option)} className='text-sm' />;
  };

  const tshirtRowFilter = (options) => {
    return (
        <Dropdown value={options.value} options={tshirtSizes} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={tshirtItemTemplate} placeholder="Talla de camisa" className='text-sm'  style={{ width: '7rem'}} />
    );
  };

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

  const typeBodyTemplate = (rowData) => {
    return <div className='flex justify-center'> 
      <Tag value={rowData.type} severity={getSeverityType(rowData.type)} />
    </div>
  };

  const phoneBodyTemplate = (rowData) => {
    const formattedPhoneNumber = `${rowData.phone_number.slice(0, 2)}-${rowData.phone_number.slice(2, 6)}-${rowData.phone_number.slice(6)}`;
    return <p>{formattedPhoneNumber}</p>
  }

  const branchBodyTemplate = (rowData) => {
    const branch = branches.find(branch => branch.id == rowData.branch_id)
    return branch ? <Tag value={branch.name} className='text-sm' style={{background: 'linear-gradient(-225deg,#3a6b99 0%,#23609a 48%,#175794 100%)'}} /> : ''
  }

  const sexBodyTemplate = (rowData) => {
    return <div className='flex justify-center'>
      <Tag value={rowData.sex_name} severity={getSeveritySex(rowData.sex_name)} />
    </div>
  }

  const tshirtBodyTemplate = (rowData) => {
    return <div className='flex justify-center'>
      <Tag value={rowData.tshirt_size} severity={getSeverityTShirt(rowData.tshirt_size)} />
    </div>
  }

  const typeEditor = (props) => {
    return <Dropdown itemTemplate={typeItemTemplate} value={props.rowData[props.field]} options={types} onChange={(e) => handleEditType(e.value, props.rowData.id)} placeholder="Tipo" className='text-sm'  style={{ width: '7rem'}} />;
  };

  const branchEditor = (props) => {
    return <Dropdown itemTemplate={branchItemTemplate} value={props.rowData[props.field]} options={branches.map(e => e.id)} onChange={(e) => handleEditBranch(e.value, props.rowData.id)} placeholder="Sede" className='text-sm'  style={{ width: '7rem'}} />;
  };

  return (
    <div className='my-12 space-y-8 mx-2 md:mx-5'>
      <Toast ref={toast} />
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl'>Usuarios</h1>
      <div>
        <Message text="Puedes editar el tipo y sede dando click" className='my-1' />
        <DataTable value={users} paginator editMode="cell" dataKey="id" rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} header={header} loading={refreshing}
          globalFilterFields={['full_name', 'email', 'type', 'phone_number', 'birthdate', 'sex_name', 'tshirt_size']} emptyMessage="No hay usuarios registrados"
          filters={filters} filterDisplay="row">
            <Column field="id" header="ID" sortable></Column>
            <Column field='full_name' header="Nombre" sortable frozen className='min-w-20 md:min-w-52' />
            <Column field="email" header="Correo" sortable></Column>
            <Column  editor={(options) => typeEditor(options)} field="type" header="Tipo" body={typeBodyTemplate} filter filterElement={typeRowFilter} showFilterMenu={false} filterMenuStyle={{ width: '2rem' }} ></Column>
            <Column editor={(options) => branchEditor(options)} field="branch_id" header="Sede" filter  filterElement={branchRowFilter} showFilterMenu={false} filterMenuStyle={{ width: '2rem' }} body={branchBodyTemplate}></Column>
            <Column field="phone_number" header="Teléfono" body={phoneBodyTemplate}></Column>
            <Column field="birthdate" header="Fecha de nacimiento" sortable></Column>
            <Column field='sex_name' header='Sexo' body={sexBodyTemplate} filter filterElement={sexRowFilter} showFilterMenu={false} filterMenuStyle={{ width: '2rem' }}></Column>
            <Column field='tshirt_size' header='Talla de camisa' body={tshirtBodyTemplate} filter filterElement={tshirtRowFilter} showFilterMenu={false} filterMenuStyle={{ width: '2rem' }}></Column>
        </DataTable>
      </div>
    </div>
  )
}
export default Users
