//Обработка текста теста
class ColorParser{
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

                    qBuf = qBuf.substr( col, qBuf.length );
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

	//Парсит конкретный вопрос выделяя оттуда
	//Варианты ответов и собственно вопрос
	variants( q ){
	    //Флаг для правильного варианта ответа
	    var rightFlag = false;
	    //Буфер для варианта
	    var vBuf = "";
	    //Флаг для \n
	    var eolflag = false;
	    //Номер варианта
	    var varflag = "";
	    //Меняем цвет варианта ответа с помощью этой переменой
	    var curCol = false; 
	    //Флаг вопроса
	    var questionFlag = true;

	    for( var i = 0; i < q.length; i++ ){
	        var c = q[i];	//Текущий символ
	        var last = q.length - 1;	//последний символ

	        //Индикатор правильного
	        if( c == "+" )
	            rightFlag = true;
	        else{
	            vBuf += c;
	        }

	        //Если последний символ
	        if( i == last ){	        	
	            //Определяем класс
            	if( questionFlag ){
            		questionFlag = false;
            		var cl = 'TextQuestion';
            	}
            	else{
            		if( rightFlag )
            			var cl = 'TextVariantRight';
            		else
            			var cl = 'TextVariant';
            		cl += (curCol + 1); //Цифра в конце названия класса
            	}
            	
            	coloredText += "<span class = '" + cl + "' >" + vBuf + "</span><br/>";

	        }
	        //Если \n символ
	        if( c == "\n" ){
	        	vBuf += "<br/>"; 
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
	            	//Определяем класс
	            	if( questionFlag ){
	            		questionFlag = false;
	            		var cl = 'TextQuestion';
	            	}
	            	else{
	            		if( rightFlag )
	            			var cl = 'TextVariantRight';
	            		else
	            			var cl = 'TextVariant';
	            		cl += (curCol + 1); //Цифра в конце названия класса
	            	}
	            	
	            	coloredText += "<span class = '" + cl + "' >" + vBuf.substr( 0, vBuf.length - 7 ) + "</span>";
	            	
	            	if( curCol ) 
	            		curCol = false;
	            	else
	            		curCol = true;	                

	                vBuf = vBuf.substr( vBuf.length - 8, vBuf.length ); //То, что обрезали
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
	}
}

//Текст с цветами
var coloredText = "";
var parser = new ColorParser;

//Получаем содержимое файла
$.ajax({
	data: "file=" + file,
	async: true,
	type: "POST",
	url: "../scripts/load.php",
	success: ( data )=>{

		var qArr = parser.questions( data );
		qArr.forEach( ( q )=>{
			parser.variants( q );
		});
		//Вывод раскрашенного текста
		$( "#coloredTextDiv" )[0].innerHTML = coloredText;
	}
})