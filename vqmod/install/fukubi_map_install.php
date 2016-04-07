<?php 

// Add database
require('../../config.php');
$con = mysql_connect(DB_HOSTNAME,DB_USERNAME,DB_PASSWORD);
mysql_select_db(DB_DATABASE, $con);
$SQL="ALTER TABLE `".DB_PREFIX."manufacturer` ADD `fkb_map` VARCHAR( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
mysql_query($SQL,$con);

die('Create database successfully !');