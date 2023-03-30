import Accounts from '../Components/Accounts/Accounts';
import Routes from '../Components/Routes/Routes';
import Markets from '../Components/Markets/Markets';
import Transactions from '../Components/Transactions/Transactions';
import Summary from '../Components/SummaryPage/Summary';
import TransWithAccount from '../Components/Transactions/Transactions_Account';


const presentationComponents = (props) => {
    return [
        {
            title: 'Summary',
            component: <Summary/>
        },
        {
            title: 'Markets',
            component: <Markets/>
        },
        {
            title: 'Routes',
            component: <Routes/>
        },
        {
            title: 'Accounts',
            component: <Accounts/>
        },
        {
            title: 'Employees',
            component: <Accounts/>
        },
        {
            title: 'Transactions',
            component: <Transactions />
        },
  
    ];
};


const containerComponents = (props) => {
    return [
        {
            title: 'Transactions By Account',
            component: <TransWithAccount />
        },
        {
            title: 'Market',
            component: <Markets />
        },
        {
            title: 'Route',
            component: <Markets/>
        }

    ];
};

export {presentationComponents, containerComponents};
