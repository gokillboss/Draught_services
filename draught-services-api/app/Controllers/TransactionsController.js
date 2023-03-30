const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');


const allTransactions = async (ctx) => {
  console.log('routes all all Transactions called.');
  return new Promise((resolve, reject) => {
      const query = `
                     SELECT *
                      FROM 
                        transactions
                     WHERE
                        cycleID = ?
                      `;
      dbConnection.query({
          sql: query,
          values: [ctx.params.cycleID]
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



const transactionWithCycleID_count = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                    select count(*) 
                        as numberOfTrans 
                    from 
                        transactions 
                    where 
                        cycleID = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::transactionWithCycleID_count", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in transactionWithCycleID_count.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}





const transactionWithCycleID = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        transactions
                    WHERE 
                        cycleID = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::transactionWithCycleID", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in transactionWithCycleID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}



const transactionWithCycleID_accountID = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        transactions t,
                        accounts a
                    WHERE 
                        t.accountID = a.accountID 
                    AND
                        t.cycleID = ?
                    AND
                        t.accountID = ?
                   
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID, ctx.params.accountID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::transactionWithCycleID_accountID", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in transactionWithCycleID_accountID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}




const transactionWithCycleID_routeID = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        transactions
                    WHERE 
                        cycleID = ?
                    AND
                        routeID = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID, ctx.params.routeID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::transactionWithCycleID_routeID", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in transactionWithCycleID_routeID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}


const transactionWithCycleID_marketID = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        transactions
                    WHERE 
                        cycleID = ?
                    AND
                        marketID = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID, ctx.params.marketID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionController::transactionWithCycleID_marketID", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in transactionWithCycleID_marketID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}



module.exports = {
  allTransactions,
  transactionWithCycleID,
  transactionWithCycleID_accountID,
  transactionWithCycleID_routeID,
  transactionWithCycleID_count,
  transactionWithCycleID_marketID
};