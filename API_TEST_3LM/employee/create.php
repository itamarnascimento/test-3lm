<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Origin");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
date_default_timezone_set("America/Sao_Paulo");


include_once '../config/database.php';

include_once '../objects/employee.php';

$database = new Database();
$database->db_name="3lm_test";
$db = $database->getConnection();

$employee = new Employee($db);


$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->nome) &&
    !empty($data->sobrenome) &&
    !empty($data->cargo) &&
    !empty($data->dtnascimento) &&
    !empty($data->salario)
){
    
    $employee->nome = $data->nome;
    $employee->sobrenome = $data->sobrenome;
    $employee->cargo = $data->cargo;
    $employee->dataNasc = $data->dtnascimento;
    $employee->salario = $data->salario;

    if($employee->create()){      
        http_response_code(200);        
        echo json_encode(array("message" => "Funcionário criado com sucesso"));
    }else{        
         
        http_response_code(401);
        echo json_encode(array("message" => "Não foi possivel criar o funcionário."));
    }
}else{	
    http_response_code(200);  
    echo json_encode(array("message" => "Não foi possivél criar o produto dados imcompletos."));
}

?>
