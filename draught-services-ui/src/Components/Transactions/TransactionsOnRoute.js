import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const TransRouteTableAttributes = [

    {
        title: 'Route ID',
        attributeDBName: 'routeID',
        align: 'left'
    },
    {
        title: 'Account ID',
        attributeDBName: 'accountID',
        align: 'left'
    },
    {
        title: 'Transaction ID',
        attributeDBName: 'transactionID',
        align: 'left'
    },
   
    {
        title: 'Product ID',
        attributeDBName: 'productID',
        align: 'left'
    }
 
];


const routeID = 130029;
const cycleID = 364;



export default function TransWithRoute(props) {
    const [transRoute, setTransRoute] = useState([]);
    console.log(`in marketTable routes contains is ${JSON.stringify(transRoute)}`)

    useEffect(() => {
        const api = new API();
        async function getTransRoute() {
            const respond = await api.transactionWithCycleID_Rout(cycleID,routeID);
            console.log(`routes from the DB ${JSON.stringify(respond)}`);
            setTransRoute(respond.data);
        }

        getTransRoute();

    },[])


    const TRow = ({routeObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                TransRouteTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            routeObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }


    return <Fragment>
    {
        transRoute.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="route table">
                    <TableHead>
                        <TableRow>
                            {
                                TransRouteTableAttributes.map((attr, idx) =>
                                    <TableCell  key={idx}
                                                align={attr.align}>
                                        {attr.title}
                                    </TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            transRoute.map((route, idx) => (
                                <TRow routeObject={route} key={idx}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
    }
</Fragment>
}
