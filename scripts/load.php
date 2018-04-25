<?php
	$file = $_POST[ "file" ];
	$file = "../".$file;

	echo file_get_contents( $file );	 
?>