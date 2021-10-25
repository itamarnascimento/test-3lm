interface ButtonProps {
    title: string;   
    onClick: () => void; 
}

export function Button(props:ButtonProps){
    return (         
        <button className="p-2 pl-5 pr-5 bg-green-500 text-gray-100 text-lg rounded-lg focus:border-4 border-green-300"
                type="button"
               {...props}
        >
            {props.title}
        </button>    
    )    
}