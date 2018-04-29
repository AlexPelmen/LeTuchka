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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="">Adminushko</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">          
          </div>
        </nav> 

    	<div class = "container" >
	        <form class = "mt-5 p-5 bg-light rounded" action = "doDelete.php" method = "post" >	
        		<h1 class = "text-center mb-5 text-secondary" >Че, серьезно удалить хочешь?</h1>
        		<div  class = "row" >
        			<div class = "col-6" >
        				<input type = "submit"  class = "btn btn-primary d-block mx-auto text-white mx-auto w-100" value = "Ага)" />
        			</div>
        			<div class = "col-6" >
        				<a onclick = "history.back();"  id = "backBtn" class = "btn btn-primary d-block mx-auto text-white mx-auto w-100">Назад</a>
        			</div>
        		</div>
        		<input type = "hidden" name = "file" value = "<?php echo $_GET[ 'file' ]; ?>" />
	        </form>
    	</div>    
	</body>
</html>