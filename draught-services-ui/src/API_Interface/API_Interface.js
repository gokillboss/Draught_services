import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(user_id) {
        return axiosAgent.get(`login/${user_id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }

    async allRoutes() {
        return axiosAgent.get(`routes/all-routes`);
    }

    async routesWithID(routeID) {
        return axiosAgent.get(`routes/${routeID}`);
    }

    async allMarket() {
        return axiosAgent.get(`market/all-market`);
    }

    async transactionWithCycleID(cycleID) {
        return axiosAgent.get(`transactions/${cycleID}`);
    }

    async transactionWithCycleID_Account(cycleID, AccountID){
        return axiosAgent.get(`transactions/${cycleID}/${AccountID}/one-account`)
    }

    async transactionWithCycleID_Rout(cycleID,RoutID){
        return axiosAgent.get(`transactions/${cycleID}/${RoutID}/trans-for-route`)
    }

    async transactionWithCycleID_Market(cycleID,MarketID){
        return axiosAgent.get(`transactions/${cycleID}/${MarketID}/trans-for-market`)
    }

    async allTransactionsOnCycle(cycleID){
        return axiosAgent.get(`transactions/${cycleID}/all-transactions`)
    }

    async allAccounts(){
        return axiosAgent.get(`accounts/all-accounts`)
    }


    async allEmployees(){
        return axiosAgent.get(`employees/all-employees`)
    }

}