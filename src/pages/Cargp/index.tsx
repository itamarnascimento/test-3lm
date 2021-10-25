import { useEffect, useState } from "react";
import { FormsCargo } from "../../components/Forms/FormsCargo";
import { GridCargo } from "../../components/Grid/GridCargo";
import { Header } from '../../components/Header/Header'
import api from "../../services/api";

interface CargoProps {
    id?: string
    descricao: string    
}
interface CargosProps {
    id?: string
    descricao: string    
}
export function Cargo(){
    const [cargos, setCargos] = useState<CargoProps[]>([]);
    const [cargo, setCargo] = useState<CargosProps>({    
        descricao: '',        
    });     

    useEffect(()=>{
        reload()
    },[]);

    function reload () {
        fetch('http://localhost/api_test_3lm/cargo/read.php')
        .then((response)=>{ response.json()
        .then(data =>{
            setCargos(data)            
        })
        })
        .catch(e => console.log("deu Erro"+ e.message))       
    }
    
    function  handleSave() {
        api.post('/cargo/create.php', {...cargo})
        .then(() => {
                alert("Cargo criado com sucesso");
                reload();
                setCargo({                   
                    descricao: '',
                   
                })
            }                  
        ).catch(() => {            
            alert("Não foi possivel criar o cargo")             
        })
    }

    return (
        <>
            <Header title="Cargos" />
            <FormsCargo {...{handleSave, cargo , setCargo}} />
            <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
                <thead>
                    <tr className="text-left border-b-2 border-gray-300">
                        <th className="px-4 py-3">Id</th>
                        <th className="px-4 py-3">Cargo</th>                       
                        <th className="px-4 py-3">Editar</th>                       
                    </tr>
                </thead>                
                <tbody>
                    {
                        cargos.map((data: CargoProps)=>{
                            return (
                                <GridCargo 
                                    key={data.id}
                                    id={data.id}
                                    descricao={data.descricao}
                                />
                            )
                        })
                    }
                </tbody>               
            </table>
        </>
    )
}