<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once '../objects/employee.php';


$database = new Database();
$database->db_name="3lm_test";
$db = $database->getConnection();


$employee = new Employee($db);


$data = json_decode(file_get_contents("php://input"));


$employee->id = $data->id;
$employee->nome = $data->nome;
$employee->sobrenome = $data->sobrenome;
$employee->cargo = $data->cargo;
$employee->dataNasc = $data->dtnascimento;
$employee->salario = $data->salario;


if($employee->update()){    
    http_response_code(200);    
    echo json_encode(array("message" => "Funcionario Atualizado"));
}


else{

    // set response code - 503 service unavailable
    http_response_code(503);

    
    // tell the user
    echo json_encode($data);
}
?>
