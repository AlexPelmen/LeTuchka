<?php
	$tests = scandir( dirname( __DIR__ )."/Tests" );
	foreach( $tests as $t ){
		if( $t == "." || $t == ".." ) continue;
		$p = null;
		$p = mb_strrpos( $t, "." );
		if( ! $p ) continue;
		$name = mb_substr( $t, 0, $p );
		echo "<a href = 'editTest.php?file=$t' class = 'btn btn-secondary w-100 d-block my-3' >$name</a>\n";
	}
?>