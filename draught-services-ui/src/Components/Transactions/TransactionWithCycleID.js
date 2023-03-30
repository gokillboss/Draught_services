import React, { useState, useEffect, Fragment } from 'react';
import API from '../../API_Interface/API_Interface';

export default function TransactionsWithCycleID(props) {
  const [transNum, setTransNum] = useState(0);
  console.log(`Value in transNum is: ${transNum}`)
  useEffect(() => {
    const api = new API();

    async function getTransNum() {
      const response = await api.transactionWithCycleID(364);
      const transNum = response.data[0].numberOfTrans;
      setTransNum(transNum);
    }

    getTransNum();
  }, []);

  return (
    <Fragment>
      <h3>Number of transactions on Cycle 364 is: {transNum}</h3>
    </Fragment>
  );
}
