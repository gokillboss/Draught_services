import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const AccountTableAttributes = [
    {
        title: 'Account Name',
        attributeDBName: 'accountName',
        align: 'left'
    },
    {
        title: 'Account ID',
        attributeDBName: 'accountID',
        align: 'left'
    },
    {
        title: 'Route ID',
        attributeDBName: 'routeID',
        align: 'left'
    },
    {
        title: 'Date Created',
        attributeDBName: 'dateCreated',
        align: 'left'
    }
];




export default function Account(props) {
    const [account, setAccount] = useState([]);
    console.log(`in marketTable routes contains is ${JSON.stringify(account)}`)

    useEffect(() => {
        const api = new API();
        async function getAccount() {
            const accountJSONString = await api.allAccounts();
            console.log(`account from the DB ${JSON.stringify(accountJSONString)}`);
            setAccount(accountJSONString.data);
        }

        getAccount();

    },[])


    const TRow = ({accountObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                AccountTableAttributes.map((attr, idx) =>
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
        account.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="account table">
                    <TableHead>
                        <TableRow>
                            {
                                AccountTableAttributes.map((attr, idx) =>
                                    <TableCell  key={idx}
                                                align={attr.align}>
                                                {attr.title}
                                    </TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            account.map((account, idx) => (
                                <TRow accountObject={account} key={idx}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
    }
</Fragment>
}
