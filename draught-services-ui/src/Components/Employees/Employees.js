import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const EmployeesTableAttributes = [
    {
        title: 'Employee Name',
        attributeDBName: 'employeeName',
        align: 'left'
    },
    {
        title: 'Employee ID',
        attributeDBName: 'employeeID',
        align: 'left'
    },
    {
        title: 'Route ID',
        attributeDBName: 'routeID',
        align: 'left'
    },
    {
        title: 'Status',
        attributeDBName: 'status',
        align: 'left'
    }
];




export default function Employees(props) {
    const [employee, setEmployee] = useState([]);
    console.log(`in marketTable routes contains is ${JSON.stringify(employee)}`)

    useEffect(() => {
        const api = new API();
        async function getEmployee() {
            const respond = await api.allEmployees();
            console.log(`account from the DB ${JSON.stringify(respond)}`);
            setEmployee(respond.data);
        }

        getEmployee();

    },[])


    const TRow = ({accountObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                EmployeesTableAttributes.map((attr, idx) =>
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
        employee.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="account table">
                    <TableHead>
                        <TableRow>
                            {
                                EmployeesTableAttributes.map((attr, idx) =>
                                    <TableCell  key={idx}
                                                align={attr.align}>
                                                {attr.title}
                                    </TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            employee.map((employee, idx) => (
                                <TRow accountObject={employee} key={idx}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
    }
</Fragment>
}
