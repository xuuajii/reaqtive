import React from 'react';
import { Icon } from '../../lib/index';
import ph_italy from '../../img_placeholder_italy.png';
import ph_world from '../../img_placeholder_world.png';
import ph_contract from '../../img_placeholder_contract.png';
import ph_direct from '../../img_placeholder_direct.png';
import ph_kitchen from '../../img_placeholder_kitchen.png';
import ph_generic from '../../img_placeholder_generic.png';
import format from './format'

const Card = props => {
  const { data } = props;
  const placeholders = {
    ITALIA: ph_italy,
    ESTERO: ph_world,
    CONTRACT: ph_contract,
    DIRETTO: ph_direct,
    PRODOTTO: ph_kitchen,
    '-': ph_generic
  };
  // const formattedNumber = format(1000, '$ 0.00a', 'eu')

  return (
    <div className={`card ${data.category === '-' ? '' : data.category}`}>
      <img src={data.image === '-' ? placeholders[data.category] : data.image } className="card-img-top" alt="" />
      <div className="card-body">
        <h3 className="card-title" title={data.title}>{data.title}</h3>
        <div className="row flex-nowrap text-center" style={{overflowX:'auto'}}>
          {data.data.map((item, i) =>
            <div className="col kpi" key={i}>
              <div className="card-title">{item.label}</div>
              <div className="card-value" style={{ color: item.color || null }}>
                {format(item.value, Math.abs(item.value)>1000?'$ 0.0a':'$ 0a', 'eu')}
              </div>
            </div>
          )}
        </div>
        <button onClick={()=>props.goToDetail('Archinterni Arredamenti S.N.C.')} className={`btn fav ${data.deltaPerc.color === '-' ? '' : data.deltaPerc.color}`}>
          <div className="relative">
            {data.deltaPerc.value.replace('-', '').replace('+', '')}
            <div className="triangle">
              <Icon type={data.deltaPerc.color === 'red' ? 'menuDown' : 'menuUp'} size={24} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Card;
