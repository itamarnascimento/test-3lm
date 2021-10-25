import { Route, Switch } from "react-router-dom";

import { Cargo} from '../pages/Cargp/index'
import { Home } from '../pages/Funcionario/index'

const Routes = () => {
    return(
      
            <Switch>
            <Route component = { Home }  path="/" exact />
            <Route component = { Cargo }  path="/cargo" />            
            </Switch> 
        
    )
 }
 
 export default Routes;