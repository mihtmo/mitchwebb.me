function heatcolorScale(t){
    if (t > 0 && t <= 15){
        t = '#2c48b8'
    }
    else if (t > 15 && t <= 25){
        t = '#429bd6'
    }
    else if (t > 25 && t <= 32){
        t = '#6bbcd1'
    }
    else if (t > 32 && t <= 45){
        t = '#9ad0db'
    }
    else if (t > 45 && t <= 62){
        t = '#bddbd5'
    }
    else if (t > 62 && t <= 73.5){
        t = '#fff2ce'
    }
    else if (t > 73.5 && t <= 81){
        t = '#f3b938'
    }
    else if (t > 81 && t <= 88){
        t = '#fd9415'
    }
    else if (t > 88 && t <= 94){
        t = '#d95700'
    }
    else if (t > 94 && t <= 100){
        t = '#962101'
    }
    else{
        t = '#480300'
    }
    
    return t;
}

function raincolorScale(r, m){
    c = (r/m);
    return c;
}

function rainmmConvert(p, m){
    mm = Math.round((p * m) * 25.4);
    rainmm = `${mm}mm`;
    return rainmm;
}

function viscolorScale(v){
    v = Math.abs((v/10)-1);
    return v;
}