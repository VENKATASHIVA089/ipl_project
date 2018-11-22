var fs = require('fs')
var getMatchIds=require('./practice.js').getMatchIds
var deliveries=fs.readFileSync('./deliveries.csv', 'utf8');
var rows=deliveries.split('\n');
let words=[];
for(let row in rows){
	words.push(rows[row].split(','))
}

//Third Problem-->For the year 2016 plot the extra runs conceded per team.
let range=getMatchIds(2016)
let extraRuns={}
for(let row=1;row<words.length;row++){
	if(words[row][0]>=range[0] && words[row][0]<=range[1]){
		if(extraRuns[words[row][3]] && words[row][16])
			extraRuns[words[row][3]]+=parseInt(words[row][16]);
		else{
			if(words[row][3])
				extraRuns[words[row][3]]=parseInt(words[row][16]);
		}
	}
}
console.log('--------------------------------------------------------------------')
console.log('---------------------Problem-3 output-------------------------------')
console.log('--------------------------------------------------------------------')
console.log(extraRuns)

//Fourth Problem-->For the year 2015 plot the top economical bowlers.

let rangeForBowler=getMatchIds(2015)
let bowlerEconomy={}
for(let row=1;row<words.length;row++){
	if(words[row][0]>=rangeForBowler[0] && words[row][0]<=rangeForBowler[1]){
	if(bowlerEconomy[words[row][8]]){
		if(!parseInt(words[row][10]) && !parseInt(words[row][13]))
		bowlerEconomy[words[row][8]]['balls']++;
		bowlerEconomy[words[row][8]]['runs']+=parseInt(words[row][17])
	}
	else{
		let obj={}
		obj['runs']=parseInt(words[row][17]);
		if(!parseInt(words[row][10]) && !parseInt(words[row][13]))
		obj['balls']=1
		else obj['balls']=0
		bowlerEconomy[words[row][8]]=obj;
	}
}
}
let arrayOfEconomies=[]
for(bowler in bowlerEconomy){
	let economy=bowlerEconomy[bowler]['runs']*6/bowlerEconomy[bowler]['balls']
	economy=Math.round(economy*1000)/1000
	arrayOfEconomies.push([bowler,economy])
}
arrayOfEconomies.sort((a,b)=>a[1]-b[1])
console.log('--------------------------------------------------------------------')
console.log('---------------------Problem-4 output-------------------------------')
console.log('--------------------------------------------------------------------')
console.log(arrayOfEconomies.slice(0,10))