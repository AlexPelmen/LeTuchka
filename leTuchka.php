<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>LeTuchka</title>

		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="bootstrap-4.0.0/css/bootstrap.css" />
		
		<!-- jQuery first, then Tether, then Bootstrap JS. -->
		<script src="jquery.js" ></script>
		<script src="bootstrap-4.0.0/js/bootstrap.js"></script>

        <!-- Свои стили -->
        <link rel="stylesheet" href="style.css" />
	</head>
	<body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="">LeTuchka</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick = "command.again();" >Again</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick = "command.fuckOff();" >Fuck off, I'm tired</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick = "command.next();" >Next</a>
                </li>
            </ul>           
          </div>
        </nav>

        <button class = "btn btn-primary w-25 mt-5 mx-auto d-block" id = "confirmBtn" onclick = "command.confirm();" >Ответить</button>
        <div class = "container" id = "wrapper" >
            <div class = "container h30" >
                <textarea class = "form-control row" id = "question" readonly></textarea>
            </div>
            <div class = "container" id = "variants" >
            </div>           
        </div>      
	</body>
</html>


<!-- Окно для вывода результата -->
<div class = "container card text-center" id = "resultWindow" >
    <h2 class = "text-primary">Результаты</h2>
    <hr/>
    <p>Ты ответил правильно <span id = "resultRightAnswers" ></span></p>
    <p class = "text-primary" >Твой статус: <span id = "resultStatus"></span></p>
    <hr/>
    <p>Хочешь еще разок?</p>
    <button class = "btn btn-primary d-block w-50 mx-auto" onclick = "command.again()" >Канеш)</button>
</div> 

<?php 
    echo "<script>var path = 'Tests/{$_GET[ "file" ]}'</script>";
?>

<script src = "nicknames.js" ></script>
<script src = "classes.js" ></script>