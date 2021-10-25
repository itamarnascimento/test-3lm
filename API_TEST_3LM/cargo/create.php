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

include_once '../objects/cargo.php';

$database = new Database();
$database->db_name="3lm_test";
$db = $database->getConnection();

$cargo = new Cargo($db);


$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->descricao) 
    
){
    
    $cargo->descricao = $data->descricao;
    

    if($cargo->create()){      
        http_response_code(200);        
        echo json_encode(array("message" => "Cargo criado com sucesso"));
    }else{        
         
        http_response_code(401);
        echo json_encode(array("message" => "Não foi possivel criar o Cargo."));
    }
}else{	
    http_response_code(200);  
    echo json_encode(array("message" => "Não foi possivél criar o Cargo dados imcompletos."));
}

?>
