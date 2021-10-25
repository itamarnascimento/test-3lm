<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once '../objects/cargo.php';


$database = new Database();
$database->db_name="3lm_test";
$db = $database->getConnection();

$cargo = new Cargo($db);

$data = json_decode(file_get_contents("php://input"));

// definir a propriedade ID do registro para 
// $product->id = isset($_GET['id']) ? $_GET['id'] : die();

$cargo->id = $data->id;

var_dump($cargo->id);

if($cargo->delete()){ 
    http_response_code(200);
    echo json_encode(array("message" => "Cargo deletado."));
}

else{
    http_response_code(503);    
    echo json_encode(array("message" => "Não foi possivel excluir o Cargo.."));
    // echo json_encode(array("message" => "Não foi possivel excluir o Cargo.."));;
}
?>
