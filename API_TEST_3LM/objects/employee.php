<?php
class Employee{

    // Conexao com banco de dados e nome da tabela
    private $conn;
    private $table_name = "funcionarios";

    // Propriedade do objeto
    public $id;
    public $nome;
    public $sobrenome;
    public $cargo;
    public $dataNasc;
    public $salario;
    public $created;

    // Construtor do banco de dados
    public function __construct($db){
        $this->conn = $db;
    }

    // Ler Funcionario
    function read(){

        // select all query
        $query = "SELECT
                     f.id, f.nome, f.sobrenome, f.cargo, F.dt_nascimento, f.salario, c.descricao
                FROM
                    " . $this->table_name . " f
                      LEFT JOIN cargo c
                      ON c.id= f.cargo              
                ORDER BY
                    f.id ASC";


        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();        
        return $stmt;
    }
    // Criar Funcionario
    function create(){

        // query to insert record
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    nome=:nome, sobrenome=:sobrenome, cargo=:cargo, dt_nascimento=:datanasc, salario=:salario";

        // prepare query
        $stmt = $this->conn->prepare($query);
        

        // sanitize
        $this->nome=htmlspecialchars(strip_tags($this->nome));
        $this->sobrenome=htmlspecialchars(strip_tags($this->sobrenome));
        $this->cargo=htmlspecialchars(strip_tags($this->cargo));
        $this->dataNasc=htmlspecialchars(strip_tags($this->dataNasc));
        $this->salario=htmlspecialchars(strip_tags($this->salario));
        

        // bind valor
        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":sobrenome", $this->sobrenome);
        $stmt->bindParam(":cargo", $this->cargo);
        $stmt->bindParam(":datanasc", $this->dataNasc);
        $stmt->bindParam(":salario", $this->salario);
        
        // execute query
        return $stmt->execute();

    }
    // Pegar apenas um registro
    function readOne(){
       
        $query = "SELECT
                    *
                FROM
        " . $this->table_name . " p      
                    
                WHERE
                    p.id = ?
                LIMIT
                    0,1";

        // Preparando a query
        $stmt = $this->conn->prepare( $query );

        // trocando o valor da query
        $stmt->bindParam(1, $this->id);

        // executando a query
        $stmt->execute();

        // colocando o resultado em uma variavel para associar
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // setando os valores do objeto
        $this->id = $row['id'];
        $this->cod = $row['cod_prod'];
        $this->name = $row['nome_prod'];
        $this->price = $row['preco_prod'];
        $this->description = $row['desc_prod'];
        
    }

    // Atualizar Funcionario
    function update(){
       
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    nome=:nome, 
                    sobrenome=:sobrenome, 
                    cargo=:cargo, 
                    dt_nascimento=:datanasc, 
                    salario=:salario
                    
                WHERE
                    id = :id ";

       
        $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->nome=htmlspecialchars(strip_tags($this->nome));
        $this->sobrenome=htmlspecialchars(strip_tags($this->sobrenome));
        $this->cargo=htmlspecialchars(strip_tags($this->cargo));
        $this->dataNasc=htmlspecialchars(strip_tags($this->dataNasc));
        $this->salario=htmlspecialchars(strip_tags($this->salario));
        

        // bind valor
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":sobrenome", $this->sobrenome);
        $stmt->bindParam(":cargo", $this->cargo);
        $stmt->bindParam(":datanasc", $this->dataNasc);
        $stmt->bindParam(":salario", $this->salario);

        
        if($stmt->execute()){
            return true;
        }

        return false;
    }

    // Deletenado Funcionario
    function delete(){

        
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

        
        $stmt = $this->conn->prepare($query);

        
        $this->id=htmlspecialchars(strip_tags($this->id));

        
        $stmt->bindParam(1, $this->id);

        
        
        if($stmt->execute()){
            return true;
        }

        return false;
    }
}
   
?>
