


DROP TABLE IF EXISTS `student_json`;
CREATE TABLE IF NOT EXISTS `student_json` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student` json NOT NULL,
  `takes` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tables_out`
--

INSERT INTO `student_json` (`student`, `takes`) VALUES
('{\"student\": {\"fields\": [{\"field\": \"dept_name\", \"values\": [\"Biology\", \"Comp_Sdfghji.\", \"Comp. Sbi.\", \"Comp. Sci.\", \"Comp. Sci.\", \"Elec_ Eng.\", \"Elec. Eng.\", \"History\", \"Music\", \"Physics\", \"Physics\", \"Physics\", \"Yinance\"]}, {\"field\": \"ID\", \"values\": [\"00128\", \"12345\", \"19991\", \"23121\", \"44553\", \"45678\", \"54321\", \"55739\", \"70557\", \"76543\", \"76653\", \"98765\", \"98988\"]}, {\"field\": \"name\", \"values\": [\"Zhang\", \"Shankar\", \"Brandt\", \"Chavez\", \"Peltier\", \"Levy\", \"Williams\", \"Sanchez\", \"Snow\", \"Brown\", \"Aoi\", \"Bourikas\", \"Tanaka\"]}, {\"field\": \"tot_cred\", \"values\": [102, 32, 80, 110, 56, 46, 54, 38, 56, 58, 60, 98, 120]}], \"table_name\": \"student\"}}','{\"takes\": {\"fields\": [{\"field\": \"course_id\", \"values\": [\"BIO-101\", \"BIO-301\", \"CS-101\", \"CS-101\", \"CS-101\", \"CS-101\", \"CS-101\", \"CS-101\", \"CS-101\", \"CS-190\", \"CS-190\", \"CS-315\", \"CS-315\", \"CS-319\", \"CS-319\", \"CS-347\", \"CS-347\", \"EE-181\", \"FIN-201\", \"HIS-351\", \"MU-199\", \"PHY-101\"]}, {\"field\": \"grade\", \"values\": [\"A\", \"A-\", \"C\", \"A\", \"A\", \"A\", \"B\", \"C+\", \"B-\", \"F\", \"B+\", \"B\", \"A-\", \"B+\", \"A-\", \"A\", \"A\", \"C\", \"C-\", \"B\", \"A\", null]}, {\"field\": \"ID\", \"values\": [\"00128\", \"00128\", \"12345\", \"12345\", \"12345\", \"12345\", \"19991\", \"23121\", \"44553\", \"45678\", \"45678\", \"45678\", \"54321\", \"54321\", \"55739\", \"76543\", \"76543\", \"76653\", \"98765\", \"98765\", \"98988\", \"98988\"]}, {\"field\": \"sec_id\", \"values\": [\"1\", \"1\", \"1\", \"1\", \"1\", \"1\", \"1\", \"1\", \"1\", \"2\", \"2\", \"1\", \"1\", \"1\", \"2\", \"1\", \"1\", \"1\", \"1\", \"1\", \"1\", \"1\"]}, {\"field\": \"semester\", \"values\": [\"Summer\", \"Summer\", \"Fall\", \"Fall\", \"Fall\", \"Fall\", \"Fall\", \"Fall\", \"Spring\", \"Spring\", \"Spring\", \"Spring\", \"Spring\", \"Spring\", \"Spring\", \"Fall\", \"Fall\", \"Spring\", \"Spring\", \"Spring\", \"Spring\", \"Fall\"]}, {\"field\": \"year\", \"values\": [2017, 2018, 2017, 2017, 2017, 2017, 2017, 2017, 2018, 2017, 2017, 2018, 2018, 2018, 2018, 2017, 2017, 2017, 2018, 2018, 2018, 2017]}], \"table_name\": \"takes\"}}')

