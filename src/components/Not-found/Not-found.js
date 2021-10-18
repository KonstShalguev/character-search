import React from 'react';
import './Not-found.scss';

export const NotFound = () => {
  return (
    <div className={'not-found'}>
      <div className={'not-found__img'}>
      </div>
      <h2 className={'not-found__title'}>
        Ничего не найдено
      </h2>
      <p className={'not-found__text'}>
        К&nbsp;сожалению по&nbsp;вашему запросу
        ничего не&nbsp;найдено.
      </p>
    </div>
  );
}
