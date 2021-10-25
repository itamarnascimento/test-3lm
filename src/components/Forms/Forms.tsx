import { useEffect, useState } from "react";
import { Button } from "../Button/Button";

interface FuncionarioProps {   
    nome: string
    sobrenome:string
    dtnascimento: string
    cargo: string
    salario: string
}

interface CargoProps {
    id: string
    descricao: string    
}

interface Props {
    handleSave: () => void
    setFuncionario: React.Dispatch<React.SetStateAction<FuncionarioProps>>
    funcionario: FuncionarioProps
    setCargo: React.Dispatch<React.SetStateAction<CargoProps>>
    cargo: CargoProps
}
export function Forms (props:Props) {
    const { handleSave, funcionario, setFuncionario } = props;
    const [cargos, setCargos] = useState<CargoProps[]>([]);

    useEffect(()=>{
        fetch('http://localhost/api_test_3lm/cargo/read.php')
        .then((response)=>{ response.json()
        .then(data =>{
            setCargos(data)            
        })
        })
        .catch(e => console.log("deu Erro"+ e.message))
    },[])
    return (
        <>
            <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <form>        
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                    nome
                                </label>
                                <input type="text" 
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  
                                    name= "nome"
                                    onChange={(e) => setFuncionario(prev => ({...prev, nome: e.target.value}))}
                                    value={funcionario.nome}
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Sobrenome
                                </label>
                                <input type="text" 
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                                    name= "sobrenome"
                                    onChange={(e) => setFuncionario(prev => ({...prev, sobrenome: e.target.value}))}
                                    value={funcionario.sobrenome}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Data Nascimento
                                </label>
                                <input type="date" 
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  
                                    name= "dtnascimento"
                                    onChange={(e) => setFuncionario(prev => ({...prev, dtnascimento: e.target.value}))}
                                    value={funcionario.dtnascimento}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Cargo
                                </label>
                                <select 
                                    name="cargo" 
                                    id="cargo"
                                    onChange={(e) => setFuncionario(prev => ({...prev, cargo: e.target.value}))}
                                    value = {funcionario.cargo}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                                    >
                                        {
                                            cargos.map((data)=>{
                                                return (
                                                    <option value={data.id} key={data.id}>{data.descricao}</option>
                                                )
                                            })
                                        }
                                </select>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Salário
                                </label>
                                <input type="text" 
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                                    name= "salario"
                                    onChange={(e) => setFuncionario(prev => ({...prev, salario: e.target.value}))}
                                    value={funcionario.salario}
                                />
                            </div>
                        </div>
                    </div>
                    <Button title=" Salvar" onClick={handleSave}/>
                </form>
            </div>
        </>
    )
}