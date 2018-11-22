var csvjson = require('csvjson');
var fs = require('fs');
var options = {
    delimiter : ',' , // optional
};
var file_data = fs.readFileSync('./matches.csv', { encoding : 'utf8'});
var array = csvjson.toObject(file_data, options);

let output={}
for(let x in array){
	if(output[array[x].season]){
		output[array[x].season]++;
	}
	else{
		output[array[x].season]=1;	
	}
}
console.log('--------------------------------------------------------------------')
console.log('---------------------Problem-1 output-------------------------------')
console.log('--------------------------------------------------------------------')
console.log(output)

//Scecond Problem-->matches won of all teams over all the years of IPL.
let output2={2008:{},
			2009:{},
			2010:{},
			2011:{},
			2012:{},
			2013:{},
			2014:{},
			2015:{},
			2016:{},
			2017:{}
}
for(let x in array){
	if(output2[array[x].season][array[x].winner]){
		output2[array[x].season][array[x].winner]++;	
	}
	else{
		if(array[x].winner)
		output2[array[x].season][array[x].winner]=1;
	}
}

console.log('--------------------------------------------------------------------')
console.log('---------------------Problem-2 output-------------------------------')
console.log('--------------------------------------------------------------------')
console.log(output2)

let getMatchIds=function(year){
 		let matchIds=[];
 		let count=0;
 		for(let x in array){
 			if(array[x].season==year){
 				if(count==0){
 				matchIds.push(parseInt(array[x].id))
 				count++;
 				}
 				else count++;
 			}
 		}
 		matchIds.push(matchIds[0]+count-1)
 		//console.log(matchIds)
 		return matchIds;
 }
module.exports={
	getMatchIds:getMatchIds
}