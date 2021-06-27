var CovidStat = require("../model/covidstat");

exports.getMonthlyCards = function (req, res){
    var now = new Date();
    var dateOfMonth = now.getDate()
    var currMonth = (now.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false})
    var currYear = now.getFullYear()
    var prevMonth = (currMonth-1).toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false});
    var prevYear = currYear;
    if(prevMonth==0){
        prevMonth = 12;
        prevYear = currYear-1;
    } 
    var currMonthActive = 0;
    var prevMonthActive = 0;
    var estimatedThisMonth = 0;
    CovidStat.find({"Date Announced":{$regex:currMonth+"/"+currYear, "Current Status":"Hospitalized"}},{}, {}, function(err, stats) {
        if(stats){
            stats.forEach(stat =>{
                currMonthActive +=1; 
            });
        }
    });
    CovidStat.find(
        {"Date Announced":{$regex:prevMonth+"/"+prevYear}, 
        "Current Status":{$in:["Recovered","Deceased","Hospitalized"]}
        },{}, {}, function(err, stats) {
        if(stats){
            stats.forEach(stat =>{
                prevMonthActive +=1; 
            });
        }
    });
    estimatedThisMonth = (currMonthActive/dateOfMonth)*30;
    console.log(currMonthActive);
    console.log(prevMonthActive);
    console.log(estimatedThisMonth);
    res.send({
        statusCode: 200,
        statusMessage: "States fetched successfully",
        data:[{
            cardTitle:"Month to Date Active Cases",
            cardValue:currMonthActive
          },
          {
            cardTitle:"Last Month Active Cases",
            cardValue:prevMonthActive
          },
          {
            cardTitle:"Estimated Month End Active Cases",
            cardValue:estimatedThisMonth
          }] 
    });
}
/**
 * This api will return the toll summary of the covid statistics
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getTollSummary = function (req, res) {
    let param = req.body;
    var covidStats = {
        "xAxisData":[],
        "seriesData":[]
    };
    var perDateDeceased = new Map();
    var perDateHospitalized = new Map();
    var perDateRecovered = new Map
    var uniqueueDates = [] ;
    var xAxisData = [];
    var deceasedArray = [];
    var hopsitalizedAray = [];
    var recoveredArray = [];
    console.log(param);
    if(param.location!=""  && param.month!=""){
        //fire the query only when all params are obtained
        CovidStat.find(
            { 
                "Detected State":param.location,
                "Date Announced": { $regex:param.month}  
            },
            {}, {}, function(err, stats) {
                stats.forEach(stat =>{
                    var currDate = stat['Date Announced'];
                    var addCurrRow = true;
                    if(param.age != "" && stat["Age Bracket"] != param.age){
                        addCurrRow = false;
                    }
                    if(param.gender != "" && stat["Gender"] != param.gender){
                        addCurrRow = false;
                    }
                    if(addCurrRow){
                        if(!uniqueueDates.includes(currDate)){
                            uniqueueDates.push(currDate);
                        }
                        
                        if(stat["Current Status"] == "Recovered"){
                            if(perDateRecovered.has(currDate)){
                                var valTillNow = perDateRecovered.get(currDate);
                                perDateRecovered.set(currDate,valTillNow+1);
                            }else{
                                perDateRecovered.set(currDate,1);
                            }
                        }else if (stat["Current Status"] == "Hospitalized"){
                            if(perDateHospitalized.has(currDate)){
                                var valTillNow = perDateHospitalized.get(currDate);
                                perDateHospitalized.set(currDate,valTillNow+1);
                            }else{
                                perDateHospitalized.set(currDate,1);
                            }
                        }else{
                            if(perDateDeceased.has(currDate)){
                                var valTillNow = perDateDeceased.get(currDate);
                                perDateDeceased.set(currDate,valTillNow+1);
                            }else{
                                perDateDeceased.set(currDate,1);
                            }
                        }
                    }
                });
                
                uniqueueDates.forEach(date => {
                    
                    xAxisData.push(date);
                    if(perDateDeceased.has(date)){
                        deceasedArray.push(perDateDeceased.get(date));
                    }else{
                        deceasedArray.push(0);
                    }
                    if(perDateHospitalized.has(date)){
                        hopsitalizedAray.push(perDateHospitalized.get(date));
                    }else{
                        hopsitalizedAray.push(0);
                    }
                    if(perDateRecovered.has(date)){
                        recoveredArray.push(perDateRecovered.get(date));
                    }else{
                        recoveredArray.push(0);
                    }
                });
                
                covidStats = {
                    "xAxisData":xAxisData,
                    "seriesData":[
                        {
                            name: "Deceased",
                            data: deceasedArray
                        },
                        {
                            name: "Hospitalized",
                            data: hopsitalizedAray
                        },
                        {
                            name: "Recovered",
                            data: recoveredArray
                        },
                    ]
                };
                res.send({
                    statusCode: 200,
                    statusMessage: "Covid statistics fetched successfully",
                    data:covidStats    
                });

        });

    }else{
        res.send({
            statusCode: 200,
            statusMessage: "Covid statistics fetched successfully",
            data:covidStats    
        });
    }

    
};