const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');


const allMarket = async (ctx) => {
  console.log('routes market called.');
  return new Promise((resolve, reject) => {
      const query = `
                     SELECT *
                      FROM 
                          markets                
                      `;
      dbConnection.query({
          sql: query,
      }, (error, tuples) => {
          if (error) {
              console.log("Connection error in RoutesController::allRoutes", error);
              return reject(error);
          }
          ctx.body = tuples;
          ctx.status = 200;
          return resolve();
      });
  }).catch(err => {
      console.log("Database connection error in allRoutes.", err);
      // The UI side will have to look for the value of status and
      // if it is not 200, act appropriately.
      ctx.body = [];
      ctx.status = 500;
  });
}


module.exports = {allMarket}