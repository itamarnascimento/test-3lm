import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDialog } from '../../context/DialogContext'
import api from "../../services/api";

interface CargoProps {
  id?: string
  descricao: string    
}

interface Props {  
  setCargo: React.Dispatch<React.SetStateAction<CargoProps>>
  cargo: CargoProps
}

export  function FormDialogCargo(props:Props ) {
  const { cargo, setCargo } = props;
  const dialog = useDialog()
  const { id, descricao, } = dialog.editCargoValues
 

   const handleEditCargo = () => {
    api.post('/cargo/update.php', {
          id: id,
          descricao: cargo.descricao,
         
        })
    .then(() => {
        alert("Cargo Alterado com sucesso")           
        }                  
    ).catch(() => {            
        alert("Não foi possivel alterar o Cargo")             
        })   
    dialog.handleClose()
   };

  const handleDeleteCargo = () => {
    api.post('/cargo/delete.php', {id: id})
    .then(() => {
            alert("Cargo deletado com sucesso")           
        }                  
    ).catch(() => {            
        alert("Não foi possivel deleta o cargo")             
        })   
    dialog.handleClose()
  };

  return (
    <>
      <Dialog
        open={dialog.open}
        onClose={dialog.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            name="id"
            label="id"
            defaultValue={id}            
            type="text"
            fullWidth
            onChange={(e) => setCargo(prev => ({...prev, id: e.target.value}))}
            
          />
          <TextField            
            margin="dense"
            id="descricao"
            name="descricao"
            label="Descricao"
            defaultValue={descricao}            
            type="text"
            fullWidth
            onChange={(e) => setCargo(prev => ({...prev, descricao: e.target.value}))}            
          />          
        </DialogContent>
        <DialogActions>
          <Button onClick={dialog.handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleDeleteCargo}>
            Excluir
          </Button>
          <Button color="primary" onClick={handleEditCargo}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}