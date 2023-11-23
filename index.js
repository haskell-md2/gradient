const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const h = canvas.height;
const w = canvas.width;


function getGrad(x,y){
    return [2*x - w/2, y*2 - h/2]; //это, собественно, и есть градиент от функции z = x^2 + y^2.
}

//Функция, рисующая стрелочки. принимает аргументы (x,y) - начала и конца. context можно было бы убрать и заменить на ctx, обявленный выше.
function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 4; //толщина головы стрелки.

    //здесь считается угол, исходя из вектора, полученного через getGrad()
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);

    //уменьшает визуальную длину стрелочки. К точке начала прибавляется длина поделённая на 25. Достаточно не коректное решение.
    tox = fromx + (tox - fromx)/25
    toy = fromy + (toy - fromy)/25

    //Этот блок проверяет, является ли вектор нулевым или нет
    if((tox - fromx)**2 + (toy - fromy)**2 != 0){
        context.beginPath(); //так надо
        
        //линия стрелочки
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);

        //остриё или голова стрелочки.
        context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        context.moveTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        
        context.stroke();//так надо
    }else{
        //Рисует нулевой вектор, то есть точку
        context.beginPath();
        context.fillRect(tox-2.5,toy-2.5,5,5);
        context.fill();
    }
}


//пробегает по всему канвасу, с шагом 25 во всех осях
for(let x = -w/2; x < w/2; x = x+25){
    for(let y = -h/2; y < h/2; y= y+25){
        print(x,y)
        let res = getGrad(x+w/2,y+h/2); // получаем вектор-градиент
        canvas_arrow(ctx,x+w/2,y+h/2,res[0],res[1]); //рисуем стрелочку

        // w/2 и h/2 нужны, чтобы сместить начало координат в центр кавнаса
        
    }
}


//вспомогательная функция, чтобы не писать console.log()
function print(p){
    console.log(p);
}

