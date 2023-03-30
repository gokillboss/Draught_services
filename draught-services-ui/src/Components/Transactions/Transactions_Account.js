import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const TransAccountTableAttributes = [
    {
        title: 'Account Name',
        attributeDBName: 'accountName',
        align: 'left'
    },
    {
        title: 'Transaction ID',
        attributeDBName: 'transactionID',
        align: 'left'
    },
    {
        title: 'Route ID',
        attributeDBName: 'routeID',
        align: 'left'
    },
    {
        title: 'Product ID',
        attributeDBName: 'productID',
        align: 'left'
    },
    {
        title: 'Date Created',
        attributeDBName: 'dateCreated',
        align: 'left'
    }
];


const accountID = 100061;
const cycleID = 364;



export default function TransWithAccount(props) {
    const [transAccount, setTransAccount] = useState([]);
    console.log(`in marketTable routes contains is ${JSON.stringify(transAccount)}`)

    useEffect(() => {
        const api = new API();
        async function getTransAccount() {
            const routesJSONString = await api.transactionWithCycleID_Account(cycleID,accountID);
            console.log(`routes from the DB ${JSON.stringify(routesJSONString)}`);
            setTransAccount(routesJSONString.data);
        }

        getTransAccount();

    },[])


    const TRow = ({accountObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                TransAccountTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            accountObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }


    return <Fragment>
    {
        transAccount.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="market table">
                    <TableHead>
                        <TableRow>
                            {
                                TransAccountTableAttributes.map((attr, idx) =>
                                    <TableCell  key={idx}
                                                align={attr.align}>
                                        {attr.title}
                                    </TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            transAccount.map((account, idx) => (
                                <TRow accountObject={account} key={idx}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
    }
</Fragment>
}
