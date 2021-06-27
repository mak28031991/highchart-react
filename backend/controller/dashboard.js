var CovidStat = require("../model/covidstat");

exports.getStates = function (req, res){
    var uniqueStates = [];
    CovidStat.find({},{}, {}, function(err, stats) {
        stats.forEach(stat =>{
            if(!uniqueStates.includes(stat["Detected State"])){
                uniqueStates.push(stat["Detected State"]);
            }
        });
        
    });
    res.send({
        statusCode: 200,
        statusMessage: "States fetched successfully",
        data:uniqueStates    
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
    if(param.location!="" && param.gender != "" && param.age != "" && param.month!=""){
        //fire the query only when all params are obtained
        CovidStat.find(
            { 
                "Detected State":param.location,
                "Age Bracket": param.age,
                "Gender": param.gender,
                "Date Announced": { $regex:param.month}  
            },
            {}, {}, function(err, stats) {
                
                stats.forEach(stat =>{
                    var currDate = stat['Date Announced'];
                    
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