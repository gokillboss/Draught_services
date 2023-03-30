import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const marketsTableAttributes = [
    {
        title: 'Market Name',
        attributeDBName: 'marketName',
        align: 'left'
    },
    {
        title: 'Market ID',
        attributeDBName: 'marketID',
        align: 'left'
    },
    {
        title: 'City',
        attributeDBName: 'city',
        align: 'left'
    },
    {
        title: 'Date Created',
        attributeDBName: 'dateCreated',
        align: 'left'
    }
];




export default function Markets(props) {
    const [market, setMarket] = useState([]);
    console.log(`in marketTable routes contains is ${JSON.stringify(market)}`)

    useEffect(() => {
        const api = new API();
        async function getMarket() {
            const routesJSONString = await api.allMarket();
            console.log(`routes from the DB ${JSON.stringify(routesJSONString)}`);
            setMarket(routesJSONString.data);
        }

        getMarket();

    },[])


    const TRow = ({marketObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                marketsTableAttributes.map((attr, idx) =>
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
        market.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="market table">
                    <TableHead>
                        <TableRow>
                            {
                                marketsTableAttributes.map((attr, idx) =>
                                    <TableCell  key={idx}
                                                align={attr.align}>
                                        {attr.title}
                                    </TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            market.map((market, idx) => (
                                <TRow marketObject={market} key={idx}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
    }
</Fragment>
}
