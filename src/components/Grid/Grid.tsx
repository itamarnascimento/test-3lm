import { useState } from "react";
import { useDialog } from "../../context/DialogContext";
import { FormDialog } from "../Dialog/Dialog";
import { format } from 'date-fns'

// import api from '../../services/api'

interface FuncionariosPros {
    id?: string
    name: string,
    surname: string,
    date_birth: string,
    cargo: string,
    wage: string
}
interface FuncionarioProps {
    id?: string
    nome: string
    sobrenome: string
    dtnascimento: string
    cargo: string
    salario: string
}

export function Grid(props: FuncionariosPros) {
    const { id, name, surname, date_birth, cargo, wage } = props
    const dialog = useDialog()
    const [funcionario, setFuncionario] = useState<FuncionarioProps>({
        id: id,
        nome: name,
        sobrenome: surname,
        dtnascimento: date_birth,
        cargo: cargo,
        salario: wage
    }); 
   
    return (
        <> 
            
            <FormDialog
                {...{funcionario, setFuncionario}}                              
            />       
            <tr className="bg-gray-100 border-b border-gray-200">                    
                <td className="px-4 py-3">{id}</td>
                <td className="px-4 py-3">{name}</td>
                <td className="px-4 py-3">{surname}</td>
                <td className="px-4 py-3">{format(new Date(date_birth), 'dd/MM/yyy')}</td>
                <td className="px-4 py-3">{cargo}</td>
                <td className="px-4 py-3">{
                    (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(wage)))
                }</td>
                <td className="px-4 py-3">
                    <button type="button" 
                            onClick={() => dialog.handleOpen(props)}>Editar
                    </button>
                </td>                
            </tr>           
                
        </>
    )
}