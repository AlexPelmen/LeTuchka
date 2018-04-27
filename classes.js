//Класс для загрузки данных и работы с приложением
class Application{
	constructor(){
		//Количество неверных ответов
		this.wrongAnswers = 0;
		//Количество верных ответов
    	this.rightAnswers = 0;
    	//Количество жизней
    	this.lifes = 5;
    	//Массив с вопросами
    	this.questions = [];
    	//Номер текущего вопроса
    	this.step = 0;
    	//Текущий вопрос
    	this.currentQuestion = null;
    	//Ответы, отмеченные пользователем
    	this.answered = [];
	}
	loading(){
		//Загружаем из файла текст теста
	    $.ajax({
	        type: "POST",
	        data: "file="+path,
	        url: "scripts/load.php",
	        async: false,
	        success( data ){
	        	var texts = parser.questions( data );
	        	texts.forEach(( t )=>{
	        		app.questions.push( parser.variants( t ) );
	        	})
	        	this.currentQuestion = app.questions[0];
	        }
	    })
	}
	getNextQuestion(){
		//Переключаемся на следующий вопрос
		if( this.step < this.questions.length - 1 )
			this.currentQuestion = this.questions[ ++this.step ];
	}
	shuffle(){
		//Перетасовывает вопросы
		this.questions.sort( rand );
		this.currentQuestion = this.questions[ 0 ];
	}
	reset(){
		//Сброс
		this.step = 0;
		this.rightAnswers = 0;
		this.wrongAnswers = 0;
	}
}

//Обработка текста теста
class Parser{
	//Парсит вопросы из исходного текста
	//Не разделяет варианты ответов и вопросы между собой
	questions( data ){
		//Вопросы
		var RES = [];
		//Буфер для текущего вопроса
        var qBuf = "";
        //Флаг для \n
        var eolflag = false;
        //Номер вопроса
        var numflag = "";
        //Последний символ
        var last = data.length - 1;

        for( var i = 0; i < data.length; i++ ){
            var c = data[i]; //текущий символ
            qBuf += c;
            //Если обрабатываем последний символ
            if( i == last ){
                var col = qBuf.length;                       
                RES.push( qBuf.substr( 0, col ) );
                break;
            }
            if( ! eolflag ){
                //Если не было \n, но мы его встретили
                if( c == "\n" ){
                    eolflag = true;
                    continue;
                }
            }
            else{
                //был \n и мы встретили цифру
                if( c == +c ){
                    numflag += c;
                    continue;
                }
                //Если мы нашли начало нового вопроса
                else if( c == "." && eolflag && numflag ){                        
                    var col = qBuf.length - numflag.length - 1;                       
                    RES.push( qBuf.substr( 0, col ) ); 

                    qBuf = "";
                    var eolflag = false;
                    var numflag = ""; 
                }
                //Если это не начало нового вопроса       
                else{                                        
                    eolflag = false;
                    numflag = ""; 
                }
            }
        }
        return RES;
	}

	//Парсит конкретный вопрос выделяя от туда
	//Варианты ответов и собственно вопрос
	variants( q ){
		//Первый элемент - сам вопрос
		//потом варианты ответа 
		var variants = [];
		//Маска правильных ответов
	    var right = [];
	    //Флаг для правильного варианта ответа
	    var rightFlag = false;
	    //Буфер для варианта
	    var vBuf = "";
	    //Флаг для \n
	    var eolflag = false;
	    //Номер варианта
	    var varflag = "";

	    for( var i = 0; i < q.length; i++ ){
	        var c = q[i];	//Текущий символ
	        var last = q.length - 1;	//последний символ

	        //Индикатор правильного
	        if( c == "+" )
	            rightFlag = true;
	        else
	            vBuf += c;

	        //Если последний символ
	        if( i == last ){

	            if( rightFlag )
	                right.push( true );
	            else
	                right.push( false );

	            variants.push( vBuf.substr( 0, vBuf.length ) );
	            break; 
	        }
	        //Если \n символ
	        if( c == "\n" ){
	            eolflag = true;
	            continue;
	        }
	        else{
	            //Если был \n и с не цифра
	            if( eolflag && c != +c && ! varflag ){
	                varflag = "c";
	                continue;
	            }
	            //Если мы нашли начало варианта ответа
	            else if( c == ")" && eolflag && varflag  ){
	                variants.push( vBuf.substr( 0, vBuf.length - 3 ) );
	                if( rightFlag )
	                    right.push( true );
	                else
	                    right.push( false );

	                vBuf = "";
	                eolflag = false;
	                varflag = "";
	                rightFlag = false;
	                continue;
	            }
	            else{
	                //Если ни то, ни другое
	                eolflag = false;
	                varflag = "";
	            }
	        }
	    }
	    return {variants, right};
	}
}

//Функция для перетасовки массива
var rand = ( a, b ) => { return Math.random() - 0.5; }


//Команды пользователя
class Commands{
	//Следующий вопрос
    next(){
        if( app.step < app.questions.length - 1 ){
            app.getNextQuestion();
            graph.outputCurrentQuestion();
        }
        else
        	alert( "Wow, you mazafucker, It's Great!!!\n Right: " + app.rightAnswers + "\n Wrong: " + app.wrongAnswers ) ;            
    }
    //Заново
    again(){
    	app.reset();
        app.shuffle();      
        graph.outputCurrentQuestion();
        alert( "Come on! You must check it!" );
    }
    //Я устал( рудимент )
    fuckOff(){
        alert( "Just do it!!!" );
    }
    //Какой-либо ответ
    answer( a ){
        var mask = app.currentQuestion.right;
        var ans_div = $( "#answer" + a )[0];
        graph.cssRemoveClass( ans_div, "bg-primary" );
        //Если ответ правильный
        if( mask[ a ] ){
            graph.cssAddClass( ans_div, "bg-success" );
            app.rightAnswers++;
        }
        else{
        	//или не правильный
            graph.cssAddClass( ans_div, "bg-danger" );
            app.wrongAnswers++;
        }
    }
}

//Класс для вывода данных
class Graph{
	constructor(){
		//Div для вопросов 
		this.question_div = $( "#question" )[0];
		//Div для вариантов ответа
		this.variants_div = $( "#variants" )[0];
	}

	//Выводит текущий вопрос
	outputCurrentQuestion(){
		//Варианты ответа
	    var qVars = app.currentQuestion.variants;
	    //Текст вопроса
	    var question = qVars[ 0 ];

	    this.setQuestion( question );

	    this.clearVariants();
	    for( var i = 1; i < qVars.length; i++ )  //с единицы, потому что в 0 лежит вопрос           
	        this.addVariant( i, qVars[i] );    
	}

	//Удаляет css-класс
	cssRemoveClass( obj, cl ){
		obj.classList.remove( cl );
	}

	//Присваивает css-класс, если его нет
	cssAddClass( obj, cl ){
		if( ! obj.classList.contains( cl ) )
			obj.classList.add( cl );
	}
	//Устанавливает текст вопроса
	setQuestion( text ){
		 this.question_div.innerHTML = text;
	}
	//Устанавливает вариант ответа (один)
	addVariant( i, text ){
		this.variants_div.innerHTML += "<div id = 'answer" + i + "' class = 'Variant bg-primary rounded text-white w-100 my-2 p-3' onclick = 'command.answer(" + i + ")' >" + text + "</div>\n";
	}
	//Очищает div вариантов
	clearVariants(){
		this.variants_div.innerHTML = "";
	}
}

//Путь к файлу с вопросами
var path = "file.txt";

//loading
var app = new Application;
var graph = new Graph;
var command = new Commands;
var parser = new Parser;

app.loading( path );
app.shuffle();
graph.outputCurrentQuestion();