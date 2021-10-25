import { Button } from "../Button/Button";

interface CargoProps {
    id?: string
    descricao: string    
}

interface Props {  
    handleSave: () => void
    setCargo: React.Dispatch<React.SetStateAction<CargoProps>>
    cargo: CargoProps
}
export function FormsCargo (props:Props) {
    const { handleSave, setCargo, cargo } = props;
  
    return (
        <>
            <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <form>        
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="nome">
                                    nome
                                </label>
                                <input type="text" 
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  
                                    name= "nome"
                                    onChange={(e) => setCargo(prev => ({...prev, descricao: e.target.value}))}
                                    value={cargo.descricao}
                                    required
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