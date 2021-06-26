# Covid Tracker App
## Setup Instructions
### Database 
    * Download the CovidData.zip
    * Extract the zip to a directory CovidData
    * Move to the CovidData directory in terminal using below command
    ``` shell script
    cd CovidData
    ```
    * Run the below script to ingest the data from csv files to mongo database with name `coviddb` in collection `covidstats`.
    ``` shell script
    for i in *.csv; do mongoimport -d coviddb -c covidstats --type csv --file $i --headerline ; done
    ```
### Backend Setup



