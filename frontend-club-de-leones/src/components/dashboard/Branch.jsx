
import { Fieldset } from 'primereact/fieldset';

function Branch({branch, isYourBranch = false}) {

    const legendTemplate = (
        <div className="flex align-items-center gap-2 px-2">
            <i className="pi pi-building-columns text-primary"></i>
            <span className='text-primary font-bold'>{branch.name} {isYourBranch && '(Tu sede)'}</span>
        </div>
    );

    return (
        <Fieldset legend={legendTemplate} className={`p-4 shadow-md bg-gradient-to-r ${isYourBranch ? 'from-primary to-primary-dark text-white' : 'from-white to-gray-100 text-primary'}`}>
            <div className="flex flex-col">
                <div className="text-lg font-bold flex items-center gap-2">
                    <i className="pi pi-map-marker font-bold"></i> 
                    <p>{branch.location}</p>
                </div>
                <div className="text-lg font-bold flex items-center gap-2">
                    <i className="pi pi-phone font-bold"></i> 
                    <p>{branch.phone_number}</p>
                </div>
            </div>
        </Fieldset>
    )
}

export default Branch
