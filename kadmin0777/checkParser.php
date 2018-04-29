<?php
	$file = $_GET[ "file" ];
	echo "<script> var file = 'Tests/$file'; </script>";
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>CheckParser</title>

		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="../bootstrap-4.0.0/css/bootstrap.css" />
		
		<!-- jQuery first, then Tether, then Bootstrap JS. -->
		<script src="../jquery.js" ></script>
		<script src="../bootstrap-4.0.0/js/bootstrap.js"></script>

        <!-- Свои стили -->
        <link rel="stylesheet" href="../style.css" />
	</head>
	<body>
		<form class = "form" action = "confirmEditing.php" method = "post" >
	        <nav class="navbar navbar-expand-lg navbar-light bg-light">
	          <a class="navbar-brand" href="">Adminushko</a>
	          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	            <span class="navbar-toggler-icon"></span>
	          </button>

	          <div class="collapse navbar-collapse" id="navbarSupportedContent">
	            <ul class="navbar-nav mr-auto">
	        		<li class = "nav-item">
	            		<a href = "editTest.php?file=<?php echo $_GET[ 'file' ]; ?>" class = "nav-link mx-5" >Назад</a>
	            	</li>
	            </ul>           
	          </div>
	        </nav> 

	        <style>
	        	.TextQuestion{
	        		color: #44f;
	        	}

	        	.TextVariant1{
					color: #d50;
	        	}

	        	.TextVariant2{
	        		color: #e00;
	        	}

	        	.TextVariantRight1{
	        		color: #0d5;
	        	}

	        	.TextVariantRight2{
	        		color: #0e0;
	        	}
	    	</style>

	    	<!-- В этот DIV будет выводиться текст-->
	    	<div class = "container bg-light mt-5 p-3" id = "coloredTextDiv" >	    		
	    	</div> 

	    	<script src = "classes.js" ></script>    	    
	</body>
</html>