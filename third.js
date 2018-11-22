var fs = require('fs')
var XLSX=require('xlsx')
var wb=XLSX.readFile('./matches.xlsx')
let array=XLSX.utils.sheet_to_json(wb.Sheets.Sheet1)
//console.log('Executed before file reading');

//---------------------------------------------------------------READ-matches.csv_FILE-------------------//

//var match=fs.readFileSync('./deliveries.csv', 'utf8');

//var arr=match.split('\n');//------------------------READ-deliveries.csv_FILE----------------//

var deliveries=fs.readFileSync('./deliveries.csv', 'utf8');

var rows=deliveries.split('\n');
let words=[];
for(let row in rows){
	words.push(rows[row].split(','))
}
let getMatchIds=function(year){
 		let matchIds=[];
 		let count=0;
 		for(let x in array){
 			if(array[x].season==year){
 				if(count==0){
 				matchIds.push(array[x].id)
 				count++;
 				}
 				else count++;
 			}
 		}
 		matchIds.push(matchIds[0]+count-1)
 		return matchIds;
 }
let range=getMatchIds(2016)
console.log(range)
//console.log(words[0][3],words[0][16])
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

console.log(extraRuns)
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
	arrayOfEconomies.push([bowler,economy])
}
arrayOfEconomies.sort((a,b)=>a[1]-b[1])
console.log(arrayOfEconomies.slice(0,10))