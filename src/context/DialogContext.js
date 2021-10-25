import { createContext, useContext, useEffect, useState } from 'react'

export const DialogContext = createContext()

export const DialogProvider = ({children}) => {
    const [open, setOpen] = useState(false)
    const [editValues, setEditValues] = useState({});
    const [editCargoValues, setEditCargoValues] = useState({});

    useEffect(() => {
        const funcLocal = window.localStorage.getItem('func')
        if(funcLocal){
          setEditValues(JSON.parse(funcLocal))          
        }
    },[open])

    useEffect(() => {
        const cargoLocal = window.localStorage.getItem('cargo')
        if(cargoLocal){
         setEditCargoValues(JSON.parse(cargoLocal))          
        }
    },[open])
     
     
  
    const handleClose = () => {
        setOpen(false)
        return open
    }
    
    const handleOpen= (func) => {
        setOpen(true)
        window.localStorage.setItem('func', JSON.stringify(func))
    }
    const handleOpenCargo= (func) => {
        setOpen(true)
        window.localStorage.setItem('cargo', JSON.stringify(func))
    }
    return (
        <DialogContext.Provider value={ { open , handleClose , handleOpen, handleOpenCargo, editValues, editCargoValues } } >
            {children}
        </DialogContext.Provider>
    )
}

export const useDialog = () => {
    const dialog = useContext(DialogContext)
    return dialog
}