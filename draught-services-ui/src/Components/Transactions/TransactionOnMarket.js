import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const TransMarketTableAttributes = [
    {
        title: 'Market ID',
        attributeDBName: 'marketID',
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
    }
];


const marketID = 110015;
const cycleID = 364;



export default function TransWithMarket(props) {
    const [transMarket, setTransMarket] = useState([]);
    console.log(`in marketTable routes contains is ${JSON.stringify(transMarket)}`)

    useEffect(() => {
        const api = new API();
        async function getTransMarket() {
            const respond = await api.transactionWithCycleID_Market(cycleID,marketID);
            console.log(`routes from the DB ${JSON.stringify(respond)}`);
            setTransMarket(respond.data);
        }

        getTransMarket();

    },[])


    const TRow = ({marketObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                TransMarketTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            marketObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }


    return <Fragment>
    {
        transMarket.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="market table">
                    <TableHead>
                        <TableRow>
                            {
                                TransMarketTableAttributes.map((attr, idx) =>
                                    <TableCell  key={idx}
                                                align={attr.align}>
                                        {attr.title}
                                    </TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            transMarket.map((market, idx) => (
                                <TRow marketObject={market} key={idx}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
    }
</Fragment>
}
