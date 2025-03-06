<?php
include_once 'DB.php';
class ManageBD extends DB{
  public function getQueries(){

	$intersect = $this->connect()->query("
    SELECT * FROM departamento
");
 
	
	$queries = array (
		"intersect"=>$intersect
	);
	
		return $queries;
	
	}
}
?>