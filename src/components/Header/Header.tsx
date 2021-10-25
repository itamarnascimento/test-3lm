import { Link } from 'react-router-dom'

interface HeaderPros {
    title: string
}

export function Header(props:HeaderPros){
    return (
       <>
            <div className="flex flex-wrap place-items-center">
                <section className="relative mx-auto">                
                    <nav className="flex justify-between bg-gray-900 text-white w-screen">
                        <div className="px-5 xl:px-12 py-6 flex w-full items-center">                                                       
                            {props.title}                          
                            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                                <Link to="/"> <li>Funcionario</li> </Link>
                                <Link to="/cargo" ><li>Cargo</li>  </Link>           
                            </ul>               
                        </div>                
                    </nav>                    
                </section>
            </div>
       </>
    )
}