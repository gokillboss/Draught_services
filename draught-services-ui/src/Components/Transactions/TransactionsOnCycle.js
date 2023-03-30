import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const TransCycleTableAttributes = [

    {
        title: 'Transaction ID',
        attributeDBName: 'transactionID',
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
        title: 'Market ID',
        attributeDBName: 'marketID',
        align: 'left'
    },
    {
        title: 'Transaction Date',
        attributeDBName: 'transactionDate',
        align: 'left'
    }
];



const cycleID = 364;



export default function TransOnCycle(props) {
    const [transCycle, setTransCycle] = useState([]);
    console.log(`in marketTable routes contains is ${JSON.stringify(transCycle)}`)

    useEffect(() => {
        const api = new API();
        async function getTransCycle() {
            const respondJSONString = await api.allTransactionsOnCycle(cycleID);
            console.log(`routes from the DB ${JSON.stringify(respondJSONString)}`);
            setTransCycle(respondJSONString.data);
        }

        getTransCycle();

    },[])


    const TRow = ({cycleObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                TransCycleTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            cycleObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }


    return <Fragment>
    {
        transCycle.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="market table">
                    <TableHead>
                        <TableRow>
                            {
                                TransCycleTableAttributes.map((attr, idx) =>
                                    <TableCell  key={idx}
                                                align={attr.align}>
                                        {attr.title}
                                    </TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            transCycle.map((cycle, idx) => (
                                <TRow cycleObject={cycle} key={idx}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
    }
</Fragment>
}
