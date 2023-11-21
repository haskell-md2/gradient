const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const h = canvas.height;
const w = canvas.width;


function getGrad(x,y){
    return [2*x - w/2, y*2 - h/2];
}

function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 4; 


    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);

    tox = fromx + (tox - fromx)/25
    toy = fromy + (toy - fromy)/25

    if((tox - fromx)**2 + (toy - fromy)**2 != 0){
        context.beginPath();
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        context.moveTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        context.stroke();
    }else{
        context.beginPath();
        context.fillRect(tox-2.5,toy-2.5,5,5);
        context.fill();
    }
}



for(let x = -w/2; x < w/2; x = x+25){
    for(let y = -h/2; y < h/2; y= y+25){
        print(x,y)
        let res = getGrad(x+w/2,y+h/2);
        canvas_arrow(ctx,x+w/2,y+h/2,res[0],res[1]);
    }
}



function print(p){
    console.log(p);
}

