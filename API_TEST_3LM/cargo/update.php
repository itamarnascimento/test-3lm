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

    $cargo->id = $data->id;
    $cargo->descricao = $data->descricao;

    if($cargo->update()){    
        http_response_code(200);    
        echo json_encode($data);
        // echo json_encode(array("message" => "Cargo atualizado"));
    }

    else{

        http_response_code(503);    
        echo json_encode($data);
    }
?>
