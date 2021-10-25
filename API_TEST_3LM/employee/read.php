<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// conexão do banco de dados
// inclui banco de dados e arquivos de objeto
include_once '../config/database.php';
include_once '../objects/employee.php';

// instantiate database and product object
$database = new Database();
$database->db_name="3lm_test";
$db = $database->getConnection();

// iniciando o objeto
$employee = new Employee($db);

// lendo os produtos
// query produtos
$stmt = $employee->read();
$num = $stmt->rowCount();

// verifique se mais de 0 registro encontrado
if($num>0){

    // Array de produtos
    $employee_arr=array();
    
  
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extraindo linha
        // mudando de $row['name'] para
        // apenas $name 
        extract($row);

        $employee_item=array(
            "id" => $id,           
            "name" => $nome,
            "surname" =>$sobrenome,
            "date_birth" =>$dt_nascimento,
            "cargo" => $descricao,
            "wage" => $salario
            
        );

        array_push($employee_arr, $employee_item);
    }

    // setando a resposta com codigo  - 200 OK
    http_response_code(200);
  
    // mostrando os produtos no fomarto json
    echo json_encode($employee_arr);
}// caso nao encontrar produtos
else{

    // etando a resposta com codigo - 404 Not found
    http_response_code(404);
    echo json_encode(array($employee_arr));

    // informando ao usuário que nenhum produto foi encontrado
    // echo json_encode(
    //     array("message" => "Nenhum produto encontrado.")
    // );
}
