import React from 'react';
import './Popup.scss';

export const Popup = ({active, setActive, data}) => {
  return (
    <div className={active ? 'popup popup--active' : 'popup'}>
      <div className={'popup__content'}
           onClick={e => e.stopPropagation()}>
        <img className={'popup__close'}
             src={'/images/close.svg'}
             alt={'close-button'}
             onClick={() => setActive(false)}
        />
        <h3 className={'popup__title'}>
          {data.name}
        </h3>
        <div className={'popup__text-content'}>
          <p>Species: {data.species ? data.species : 'unknown'}</p>
          <p>Status: {data.status ? data.status : 'unknown'}</p>
          <p>Origin: {data.origin.name ? data.origin.name : 'unknown'}</p>
          <p>Type: {data.type ? data.type : 'unknown'}</p>
          <p>Location: {data.location.name ? data.location.name : 'unknown'}</p>
        </div>
      </div>
    </div>
  )
}
