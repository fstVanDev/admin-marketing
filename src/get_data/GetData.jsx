import React, { useState, useEffect } from 'react';
import axios from 'axios';
var qs = require('qs');

function GetRequestHooks() {
   const [totalReactPackages, setTotalReactPackages] = useState(null);

   useEffect(() => {
      // GET request using axios inside useEffect React hook
      // axios.get('https://wallettreatment.herokuapp.com/wallets')
      //    .then(response => setTotalReactPackages(response.data));

      const data = {
         'wallet_address': '0xB50E0B4bdD373F1CD56c11D1784bF8C522dE5309'
      };
      const url = 'https://wallettreatment.herokuapp.com/wallets'
      const options = {
         method: 'GET',
         headers: { 'content-type': 'application/x-www-form-urlencoded' },
         data: qs.stringify(data),
         url,
      };
      axios(options).then(response => setTotalReactPackages(JSON.stringify((response.data))));

      // empty dependency array means this effect will only run once (like componentDidMount in classes)
   }, []);

   return (
      <div className="card text-center m-3">
         <h5 className="card-header">GET Request with React Hooks</h5>
         <div className="card-body">
            Total react packages: {totalReactPackages}
         </div>
      </div>
   );
}

export { GetRequestHooks };