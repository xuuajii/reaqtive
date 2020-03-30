//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react';
import {Switch, useLocation} from 'react-router-dom'
import OverviewByProduct from './overview-by-product/overview-by-product';
import OverviewByMarket from './overview-by-market/overview-by-market';
const Overview = props => {
  const location = useLocation()
  return (
    location.pathname === "/overview-by-country" ? <OverviewByMarket {...props}/> : <OverviewByProduct {...props}/>
  );
}

export default Overview;
