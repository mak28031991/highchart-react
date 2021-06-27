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
### Backend & Front End
   * Start the backend and front end server
   ```shell script
   npm install
   npm start
   ```
## Dashboard Usage
   * Dashboard can be accessed at `http://localhost:3000/dashboard`.
   * For first time access email and password will be prompted.
   * Use email as `test@opslyft.com` and password as `test123`.

### Resources
   * [Authentication using local storage](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications)
   * [Importing csv to mongodb](https://docs.mongodb.com/database-tools/mongoimport/)
   * [HighChart - Chart Library](https://www.highcharts.com/demo)
   * [HighChart - Sandbox](https://codesandbox.io/s/highcharts-react-simple-chart-forked-2bee6)



