import React from 'react';
import './Card.scss';

export const Card  = ({data, setActive, setData}) => {
  const openPopup = () => {
    setData(data);
    setActive(true);
  }
  return (
    <div className={'card'} onClick={openPopup}>
      <img src={data.image} alt={data.name}/>
      <h2>{data.name ? data.name : 'unknown'}</h2>
    </div>
  );
}
