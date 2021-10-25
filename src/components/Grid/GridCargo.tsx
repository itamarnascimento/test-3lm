import { useState } from "react";
import { useDialog } from "../../context/DialogContext";
import { FormDialogCargo } from "../Dialog/DialogCargo";


interface CargosProps {
    id?: string
    descricao: string    
}
interface CargoProps {
    id?: string
    descricao: string    
}
export function GridCargo(props: CargosProps) {
    const { id, descricao } = props
    const dialog = useDialog()

    const [cargo, setCargo] = useState<CargoProps>({
        id: id,
        descricao: descricao,       
    }); 
   
    return (
        <> 
            
            <FormDialogCargo
                {...{cargo, setCargo}}                              
            />       
            <tr className="bg-gray-100 border-b border-gray-200">                    
                <td className="px-4 py-3">{id}</td>
                <td className="px-4 py-3">{descricao}</td>                
                <td className="px-4 py-3">
                    <button type="button" 
                            onClick={() => dialog.handleOpenCargo(props)}>Editar
                    </button>
                </td>                
            </tr>           
                
        </>
    )
}