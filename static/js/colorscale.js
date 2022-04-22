function colorScale(t){
    if (t > -130 && t <= -94){
        t = '#2c48b8'
    }
    else if (t > -94 && t <= -38){
        t = '#429bd6'
    }
    else if (t > -38 && t <= 16){
        t = '#6bbcd1'
    }
    else if (t > 16 && t <= 72){
        t = '#9ad0db'
    }
    else if (t > 72 && t <= 127){
        t = '#bddbd5'
    }
    else if (t > 127 && t <= 183){
        t = '#fff2ce'
    }
    else if (t > 183 && t <= 238){
        t = '#f3b938'
    }
    else if (t > 238 && t <= 294){
        t = '#fd9415'
    }
    else if (t > 294 && t <= 350){
        t = '#d95700'
    }
    else if (t > 350 && t <= 415){
        t = '#962101'
    }
    else{
        t = '#591400'
    }
    // else if (t > 183 && t <= 211){
    //     t = '#0a7d44'
    // }
    // else if (t > 211 && t <= 238){
    //     t = ''
    // }
    // else if (t > 238 && t <= 266){
    //     t = '#dcd7a2'
    // }
    // else if (t > 266 && t <= 294){
    //     t = ''
    // }
    // else if (t > 294 && t <= 322){
    //     t = '#d66324'
    // }
    // else if (t > 322 && t <= 350){
    //     t = ''
    // }
    // else if (t > 350 && t <= 377){
    //     t = '#f63122'
    // }
    // else if (t > 377 && t <= 405){
    //     t = ''
    // }
    // else if (t > 405 && t <= 433){
    //     t = '#150601'
    // }
    // else {
    //     t = ''
    console.log(t)
    
    return t;
}