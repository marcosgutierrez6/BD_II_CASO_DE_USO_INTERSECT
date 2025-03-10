<?php
include_once 'DB.php';
class ManageBD extends DB
{
	public function getQueries()
	{

		$student = $this->connect()->query("
			SELECT * from student
		");

		$queries = array(
			"student" => $student
		);

		return $queries;

	}
}
?>