import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDialog } from '../../context/DialogContext'
import api from "../../services/api";

interface FuncionarioProps {
  id?: string
  nome: string
  sobrenome: string
  dtnascimento: string
  cargo: string
  salario: string
}

interface Props {  
  setFuncionario: React.Dispatch<React.SetStateAction<FuncionarioProps>>
  funcionario: FuncionarioProps
}

export  function FormDialog(props:Props ) {
  const { funcionario, setFuncionario } = props; 
  const dialog = useDialog()
  const { id, name, surname, date_birth, wage, cargo } = dialog.editValues 
  
   const handleEditFunc = () => {
    api.post('/employee/update.php', {
          id: funcionario.id,
          nome: funcionario.nome,
          sobrenome: funcionario.sobrenome,
          dtnascimento: funcionario.dtnascimento,
          cargo: funcionario.cargo,
          salario:funcionario.salario
        })
    .then(() => {
        alert("Funcionário Alterado com sucesso")           
        }                  
    ).catch(() => {            
        alert("Não foi possivel alterar o funcionário")             
        })   
    dialog.handleClose()
   };

  const handleDeleteFunn = () => {
    api.post('/employee/delete.php', {id: id})
    .then(() => {
            alert("Funcionário deletado com sucesso")           
        }                  
    ).catch(() => {            
        alert("Não foi possivel deleta o funcionário")             
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
            onChange={(e) => setFuncionario(prev => ({...prev, id: e.target.value}))}
            
          />
          <TextField            
            margin="dense"
            id="nome"
            name="nome"
            label="Nome"
            defaultValue={name}            
            type="text"
            fullWidth
            onChange={(e) => setFuncionario(prev => ({...prev, nome: e.target.value}))}
            
          />
          <TextField            
            margin="dense"
            id="sobrenome"
            label="Sobrenome"
            name="sobrenome"
            defaultValue={surname}              
            type="text"
            fullWidth
            onChange={(e) => setFuncionario(prev => ({...prev, sobrenome: e.target.value}))}          
          />
          <TextField            
            margin="dense"
            id="dtnascimento"
            name="dtnascimento"
            label="Data de Nascimento"
            defaultValue={date_birth}          
            type="date"
            fullWidth
            onChange={(e) => setFuncionario(prev => ({...prev, dtnascimento: e.target.value}))}
          
          />  
          <TextField            
            margin="dense"
            id="cargo"
            label="cargo"
            name="cargo"
            defaultValue={cargo}          
            type="text"
            fullWidth
            onChange={(e) => setFuncionario(prev => ({...prev, cargo: e.target.value}))}          
          />
          <TextField            
            margin="dense"
            id="salario"
            label="Salario"
            name="salario"
            defaultValue={wage}          
            type="text"
            fullWidth
            onChange={(e) => setFuncionario(prev => ({...prev, salario: e.target.value}))}          
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={dialog.handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleDeleteFunn}>
            Excluir
          </Button>
          <Button color="primary" onClick={handleEditFunc}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}