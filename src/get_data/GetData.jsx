import React, { useEffect, useState } from 'react';
import axios from "axios";
var qs = require('qs');
function GetRequestHooks() {
  const [userList, setUserList] = useState([]);
 
  useEffect(() => {
   var data = qs.stringify({
      'wallet_address': '0xB50E0B4bdD373F1CD56c11D1784bF8C522dE5301' 
    });
    var config = {
      method: 'post',
      url: 'http://localhost:3001/wallets',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);
 
  return (
    <div className="container-fluid p-3">
      <h5 className="d-inline-block">GET request using axios with React Hooks - <a href="https://www.cluemediator.com" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h5>
    
 
    </div>
  );
}
 
// export default App;

export { GetRequestHooks };