<?php
	$file = $_GET[ "file" ];
	$file = "../Tests/".$file;
	
	$data = file_get_contents( $file );
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Editing</title>

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

	            	<li class = "nav-item" >
	            		<input type = "submit" class = "nav-link btn text-white btn-primary mx-5 px-5" value = "Сохранить" />
	            	</li>           	
	            	
	        		<li class = "nav-item">
	        			<a href = "#" class = "nav-link mx-5" >Удалить</a>
	        		</li>

	        		<li class = "nav-item">
	            		<a href = "#" class = "nav-link mx-5" >Назад</a>
	            	</li>
	            </ul>           
	          </div>
	        </nav> 

	        <style>
	        	#textFile{
	        		height: 90%;
	        		position: absolute;
	        		width: 100%;
	        	}
	    	</style>
	             	
        	<textarea class = "form-contents w-100 px-5" id= "textFile" ><?php echo $data; ?></textarea>
        	
        </form>      
	</body>
</html>