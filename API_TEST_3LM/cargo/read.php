<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// conexão do banco de dados
// inclui banco de dados e arquivos de objeto
include_once '../config/database.php';
include_once '../objects/cargo.php';

// instantiate database and product object
$database = new Database();
$database->db_name="3lm_test";
$db = $database->getConnection();

// iniciando o objeto
$cargo = new Cargo($db);

// lendo os cargo
// query cargo
$stmt = $cargo->read();
$num = $stmt->rowCount();

// verifique se mais de 0 registro encontrado
if($num>0){

    // Array de cargo
    $cargo_arr=array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extraindo linha
        // mudando de $row['name'] para
        // apenas $name 
        extract($row);

        $cargo_item=array(
            "id" => $id,           
            "descricao" => $descricao,            
        );

        array_push($cargo_arr, $cargo_item);
    }

    // setando a resposta com codigo  - 200 OK
    http_response_code(200);
  
    // mostrando os cargo no fomarto json
    echo json_encode($cargo_arr);
}// caso nao encontrar cargo
else{

    // etando a resposta com codigo - 404 Not found
    http_response_code(404);
    echo json_encode(array($cargo_arr));

    // informando ao usuário que nenhum produto foi encontrado
    // echo json_encode(
    //     array("message" => "Nenhum produto encontrado.")
    // );
}
