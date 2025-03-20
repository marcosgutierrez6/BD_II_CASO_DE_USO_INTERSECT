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

		$mongodbObjetcs = $this->connect()->query("
			SELECT * FROM mongodb_objects
		");

		$queries = array(
			"course" => $courses,
			"takes" => $takes,
			"json" => $mongodbObjetcs
		);

		return $queries;

	}
}
?>