<?php
class Cargo{

    // Conexao com banco de dados e nome da tabela
    private $conn;
    private $table_name = "cargo";

    // Propriedade do objeto
    public $id;
    public $descricao;
   

    // Construtor do banco de dados
    public function __construct($db){
        $this->conn = $db;
    }

    // Ler Cargos
    function read(){
        
        $query = "SELECT
                    c.id, c.descricao
                FROM
                    " . $this->table_name . " c
                          
                ORDER BY
                    c.id DESC";


        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
    // create Cargo
    function create(){

        // query to insert record
        $query = "INSERT INTO
                    " . $this->table_name . "                
                    SET descricao=:descricao";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->descricao=htmlspecialchars(strip_tags($this->descricao));

        // bind valor
        $stmt->bindParam(":descricao", $this->descricao);

        // execute query      
        return $stmt->execute();
    }  
    // Atualizar Cargo
    function update(){

       
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    descricao = :descricao                    
                WHERE
                    id = :id";

       
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->descricao=htmlspecialchars(strip_tags($this->descricao));
        $this->id=htmlspecialchars(strip_tags($this->id));
              
        $stmt->bindParam(':descricao', $this->descricao);        
        $stmt->bindParam(':id', $this->id);        
        
        return $stmt->execute();       

    }

    // Deletar Cago
    function delete(){
        
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $this->id=htmlspecialchars(strip_tags($this->id));
        
        $stmt->bindParam(':id', $this->id);   
        
        
        return $stmt->execute();      
    }
}
   
?>
