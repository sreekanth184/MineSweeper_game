let ranks = [
    {
    players: ["playerD"],
    attempts: 1
    },
    {
    players: ["playerB"],
    attempts: 3
    },
    {
    players: ["playerA","playerC"],
    attempts: 5
    },
]

let input = {
username: "xyz",
noOfAttempts: 3 
}


function userData(ranks,input){
        let update=false;
        ranks.forEach(ele => {
            if(ele.attempts==input.noOfAttempts){
                ele.players.push(input.username);
                update=true;
            }
        });
        if(!update){
            ranks.push({
            players : [input.username],
            attempts: input.noOfAttempts})
        };  

    ranks.sort((a, b) => a.attempts - b.attempts);
    
    }

userData(ranks,input)
console.log(ranks)
