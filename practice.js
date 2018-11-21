var XLSX=require('xlsx')
var wb=XLSX.readFile('./Book1.xlsx')
var ws=wb.Sheets.Sheet1
let obj=XLSX.utils.sheet_to_json(wb.Sheets.Sheet1)
let output={}
for(let x in obj){
	if(output[obj[x].season]){
		output[obj[x].season]++;
	}
	else{
		output[obj[x].season]=1;	
	}
}
console.log(output)
let output2={}
for(let x in obj){
	if(output2[obj[x].winner]){
		output2[obj[x].winner]++;
	}
	else{
		output2[obj[x].winner]=1;	
	}
}
delete output2.undefined
console.log(output2)