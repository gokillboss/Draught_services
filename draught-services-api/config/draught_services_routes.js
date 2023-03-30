const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');


/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/

// Login router configuration.

const LoginController = require('../app/Controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("draught_services_routes.js: login-route error:", err));

// Routes router configuration.

const RoutesController = require('../app/Controllers/RoutesController.js');
const routesRouter = require('koa-router')({
    prefix: '/routes'
});

routesRouter.use(VerifyJWT);
routesRouter.get('/all-routes', Authorize('admin'), RoutesController.allRoutes, err => console.log(`allRoutes ran into an error: ${err}`));
routesRouter.get('/:routeID/', Authorize('admin'), RoutesController.routeWithRouteID);


//Market router configuration
const MarketControlller = require('../app/Controllers/MarketsController.js')
const marketRouter = require('koa-router')({
    prefix: '/market'
})
marketRouter.use(VerifyJWT)
marketRouter.get('/all-market', Authorize('admin'), MarketControlller.allMarket, err => console.log(`allMarket ran into an error: ${err}`))

//Tranaction router configuration
const TranactionController = require('../app/Controllers/TransactionsController')
const transactionsRouter = require('koa-router')({
    prefix: '/transactions'
})

transactionsRouter.use(VerifyJWT)
transactionsRouter.get('/:cycleID/all-transactions', Authorize('admin'), TranactionController.allTransactions);
transactionsRouter.get('/:cycleID', Authorize('admin'), TranactionController.transactionWithCycleID_count);
transactionsRouter.get('/:cycleID/all-routes', Authorize('admin'), TranactionController.transactionWithCycleID);
transactionsRouter.get('/:cycleID/:accountID/one-account',Authorize('admin'), TranactionController.transactionWithCycleID_accountID);
transactionsRouter.get('/:cycleID/:routeID/trans-for-route',Authorize('admin'), TranactionController.transactionWithCycleID_routeID);
transactionsRouter.get('/:cycleID/:marketID/trans-for-market',Authorize('admin'), TranactionController.transactionWithCycleID_marketID);



const AccountsController = require('../app/Controllers/AccountsController');
const accountsRouter = require('koa-router')({
    prefix: '/accounts'
})

accountsRouter.use(VerifyJWT)
accountsRouter.get('/all-accounts', Authorize('admin'), AccountsController.allAccount, err => console.log(`allAccount ran into an error: ${err}`))



const EmployeesController = require('../app/Controllers/EmployeesControler');
const employeesRouter = require('koa-router')({
    prefix: '/employees'
})

employeesRouter.use(VerifyJWT)
employeesRouter.get('/all-employees', Authorize('admin'), EmployeesController.allEmployees, err => console.log(`allEmployees ran into an error: ${err}`))



/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    routesRouter.routes(),
    marketRouter.routes(),
    transactionsRouter.routes(),
    accountsRouter.routes(),
    employeesRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
