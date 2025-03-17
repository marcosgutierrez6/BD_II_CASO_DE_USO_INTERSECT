<?php
include_once 'DB.php';
class ManageBD extends DB
{
	public function getQueries()
	{

		$courses = $this->connect()->query("
			SELECT * FROM course;
		");

		$takes = $this->connect()->query("
			SELECT * FROM takes;
		");

		$queries = array(
			"course" => $courses,
			"takes" => $takes
		);

		return $queries;

	}
}
?>