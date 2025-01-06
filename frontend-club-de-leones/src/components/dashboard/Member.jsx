
import { Avatar } from "primereact/avatar"
import { Tag } from "primereact/tag"
import { Button } from "primereact/button"

function Member({myMember, type, setDeleteDialog, setId, setShowDialog, setIsEdit, setTitle}) {
   
    const memberTitle = type == 3 ? 'Alumno' : type == 2 ? 'Miembro' : 'Entrenador'
    let member = myMember
    let relationTitle = ''
    if(type != 2) relationTitle = myMember.title
    if(type == 3) member = myMember.user
    else if(type == 1) member = myMember.trainer

    return (
        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4">
            <Avatar label={member.name.charAt(0)} size="xlarge" shape="circle" className="my-2" />
            <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-bold  my-2">{member.name} {member.paternal_last_name} {member.maternal_last_name}</h2>
            <p className="text-center text-xl lg:text-2xl font-bold text-primary my-2">{memberTitle}</p>
            <Tag className="text-center text-xl lg:text-2xl font-bold my-2 " style={{background: 'linear-gradient(-225deg,#3a6b99 0%,#23609a 48%,#175794 100%)'}}>{type == 2 ? member.type : relationTitle}</Tag>
            <p className="text-center text-lg lg:text-xl my-2">Correo: <span className='font-bold'>{member.email}</span></p>
            <p className="text-center text-lg lg:text-xl my-2">Teléfono: <span className='font-bold'>{member.phone_number.slice(0, 2)}-{member.phone_number.slice(2, 6)}-{member.phone_number.slice(6)}</span></p>
            <p className="text-center text-lg lg:text-xl my-2">Fecha de Nacimiento: <span className='font-bold'>{member.birthdate}</span></p>
            <p className="text-center text-lg lg:text-xl my-2">Sexo: <span className='font-bold'>{member.sex_name}</span></p>
            {type == 3 && (
                <div className="flex justify-between items-center w-full">
                    <Button onClick={() => {setDeleteDialog(true), setId(member.id)}} className="p-button-text bg-red-600 hover:bg-red-800 border-none block m-auto" ><i className="pi pi-trash"></i></Button>
                    <Button onClick={() => {setShowDialog(true), setId(member.id), setIsEdit(true), setTitle(relationTitle)}} className="p-button-text bg-primary hover:bg-primary-dark border-none block m-auto" ><i className="pi pi-pencil"></i></Button>
                </div>
            )}
        </div>
    )
}

export default Member
