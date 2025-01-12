import {getAll} from '../../services/branch'

import { useState } from 'react'

import { redirect, useLoaderData, useOutletContext } from "react-router-dom"

import Branch from '../../components/dashboard/Branch'

export async function loader() {
  
  const response = await getAll()
  if(response.status !== 200) {
    return redirect('/dashboard')
  }
  return response.data.branches
}

function Branches() {
  
  const {user} = useOutletContext();
  const [branches] = useState(useLoaderData());

  return (
    <div>
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl my-5'>Sedes</h1>
      
        {branches?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 md:mx-20 md:my-12">
            {branches.map(branch => <Branch branch={branch} isYourBranch={branch.id == user.branch_id} key={branch.id}/>)}
          </div>
        ) : (
          <div className="flex justify-center items-center my-32">
            <p className='text-primary text-2xl font-bold'>No hay sedes registradas</p>
          </div>
        )}
      </div>
    
  )
}

export default Branches
