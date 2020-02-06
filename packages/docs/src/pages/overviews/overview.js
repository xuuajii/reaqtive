import React from 'react';
import OverviewByProduct from './overview-by-product/overview-by-product';
import OverviewByMarket from './overview-by-market/overview-by-market';
const Overview = props => {
    return (
        props.mainDimension === "country" ? <OverviewByMarket /> : <OverviewByProduct />
    );
}

export default Overview;