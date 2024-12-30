import {getAll} from '../../services/eventType'

import { useLoaderData } from "react-router-dom"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export async function loader() {
    const response = await getAll()
    if(response.status !== 200) {
        return response.data.errors
    }
    return response.data.categories
}


function EventTypes() {

  const categories = useLoaderData()

  console.log(categories);

  return (
    <div className='my-12 space-y-12 mx-2 md:mx-5'>
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl'>Tipos de eventos</h1>
       <DataTable value={categories} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} stripedRows>
          <Column field="name" header="Tipo" style={{ width: '25%' }} sortable></Column>
          <Column field="description" header="Descripción" style={{ width: '75%' }}></Column>
      </DataTable>
    </div>
  )
}
export default EventTypes
