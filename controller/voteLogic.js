const options=new Map();
function add_to_options(option){
    options.set(option,0);
    // console.log(options);
}
function get_options(){
    return options;
}
function vote(option){
    options.set(option,options.get(option)+1);
}
function reset_options(){
    options.clear();
}

function get_option_winner(){
    let max=0;
    let winner;
    options.forEach((value,key)=>{
        if(value>max){
            max=value;
            winner=key;
        }
    });
    return winner;
}

export {add_to_options,get_options,vote,reset_options,get_option_winner};
