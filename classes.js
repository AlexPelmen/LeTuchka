//Массив с вопросами
var questions = [];
//Путь к файлу с вопросами
var path = "file.txt";
//Номер текущего вопроса
var step = 0;
//TextArea
var textarea = $( "#main_text_area" )[0];

var questions = loadQuestions( path );
questions.sort( compFunc );


//Загружаем все вопросы в массивчик
function loadQuestions(){
    var RES = [];
    $.ajax({
        type: "POST",
        data: "file="+path,
        url: "scripts/load.php",
        async: false,
        success( data ){
            //Буфер для текущего вопроса
            var qBuf = "";
            //Флаг для \n
            var eolflag = false;
            //Номер вопроса
            var numflag = "";

            for( i = 0; i < data.length; i++ ){
                var c = data[i];
                qBuf += c;
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
        }
    })
    return RES;
} 

function compFunc( a, b ){
    return Math.random() - 0.5;
}

class Foos{
    getQuestion(){
        if( step > 44 )
            alert( "Wow, you mazafucker, It's Great!!!" ) ;
        else{
            textarea.value = questions[ step++ ];
        }
    }
    again(){
        questions.sort( compFunc );
        step = 0;
        textarea.value = questions[ step++ ];
        alert( "Common, You must check it!" );
    }
    fuckOff(){
        alert( "Just do it!!!" );
    }
}