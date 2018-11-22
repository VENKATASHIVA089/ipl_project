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