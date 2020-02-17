//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react';
import {useLocation} from 'react-router-dom'
import OverviewByProduct from './overview-by-product/overview-by-product';
import OverviewByMarket from './overview-by-market/overview-by-market';
const Overview = props => {
  const location = useLocation()
  console.log(location.pathname)
  return (
      location.pathname === "/overview-by-country" ? <OverviewByMarket /> : <OverviewByProduct {...props}/>
  );
}

export default Overview;
