// eslint-disable-next-line
import React, {useState, useEffect, Fragment} from 'react';
// eslint-disable-next-line
import API from '../../API_Interface/API_Interface';
// eslint-disable-next-line
import Markets from '../Markets/Markets';
import TransactionsWithCycleID from './TransactionWithCycleID';
import TransOnCycle from './TransactionsOnCycle';



export default function Transactions(props) {
    return (
    <Fragment>
        <TransactionsWithCycleID/>
        <TransOnCycle/>
    </Fragment>
     
    )
}
