import { useEffect, useState } from "react";
import { Forms } from "../../components/Forms/Forms";
import { Grid } from "../../components/Grid/Grid";
import { Header } from "../../components/Header/Header";
import { useDialog } from "../../context/DialogContext";
import api from '../../services/api'

interface FuncionariosPros {
    id?:string   
    name: string,
    surname: string,
    date_birth: string,
    cargo: string,
    wage: string
}

interface FuncionarioProps {   
    nome: string
    sobrenome: string
    dtnascimento: string
    cargo: string
    salario: string
}

interface CargoProps {
    id: string
    descricao: string    
}
export function Home (){
    const dialog = useDialog()
    const [funcionarios, setFuncionarios] = useState<FuncionariosPros[]>([]);
    const [funcionario, setFuncionario] = useState<FuncionarioProps>({       
        nome: '',
        sobrenome: '',
        dtnascimento: '',
        cargo: '',
        salario: ''
    }); 
    
    const [cargo, setCargo] = useState<CargoProps>({
        id: '',
        descricao: '',        
    }); 
    
    useEffect(()=>{
        reload()
    },[dialog.open]);

    function reload () {
        fetch('http://localhost/api_test_3lm/employee/read.php')
        .then((response)=>{ response.json()
        .then(data =>{
            setFuncionarios(data)            
        })
        })
        .catch(e => console.log("deu Erro"+ e.message))

      
       
    }

    function  handleSave() {
        api.post('/employee/create.php', {...funcionario})
        .then(() => {
                alert("Funcionário criado com sucesso");
                reload();
                setFuncionario({                   
                    nome: '',
                    sobrenome: '',
                    dtnascimento: '',
                    cargo: '',
                    salario: ''
                })
            }                  
        ).catch(() => {            
            alert("Não foi possivel criar o funcionário")             
        })
    }

    return (
        <>
        <Header title="Funcionários" />
        <Forms {...{handleSave, funcionario, setFuncionario, cargo , setCargo}} />
            <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
                <thead>
                    <tr className="text-left border-b-2 border-gray-300">
                        <th className="px-4 py-3">Id</th>
                        <th className="px-4 py-3">Nome</th>
                        <th className="px-4 py-3">Sobrenome</th>
                        <th className="px-4 py-3">Data Nascimento</th>
                        <th className="px-4 py-3">Cargo</th>
                        <th className="px-4 py-3">Salário</th>
                        <th className="px-4 py-3">Editar</th>                       
                    </tr>
                </thead>                
                <tbody>
                   
                    {   
                        funcionarios.map((data: FuncionariosPros) =>{                            
                            return (                                    
                                <Grid 
                                key={data.id}                                
                                id={data.id}                                
                                name={data.name}
                                surname={data.surname}
                                date_birth={data.date_birth}
                                cargo={data.cargo}
                                wage={data.wage}
                            />    
                            )
                                
                        })
                    }
                </tbody>               
            </table>
        
        </>
    )
}