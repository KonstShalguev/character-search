import React, {useEffect, useState} from 'react';

import 'antd/dist/antd.css';
import {Pagination} from 'antd';
import {Select} from 'antd';
import {Input} from 'antd';

import {NotFound} from './components/Not-found/Not-found';
import {Popup} from './components/Popup/Popup';
import {Card} from './components/Card/Card';
import API from './services/API'

const {Option} = Select;

const App = () => {
  const [cardsArr, setCardsArr] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState(false);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const [popupActive, setPopupActive] = useState(false);

  const [genderSelect, setGenderSelect] = useState('default');
  const [statusSelect, setStatusSelect] = useState('default');
  const [nameValue, setNameValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [speciesValue, setSpeciesValue] = useState('');

  useEffect(() => {
    API('character')
      .then(res => {
        if (res !== undefined) {
          setPagesNumber(+res.data.info.pages);
          setCardsArr([...res.data.results]);
        }
      })
  }, []);

  useEffect(() => {
    let url = '';
    if (genderSelect !== 'default') {
      url = url + `gender=${genderSelect}&`;
    }
    if (statusSelect !== 'default') {
      url = url + `status=${statusSelect}&`;
    }
    if (nameValue !== '') {
      url = url + `name=${nameValue}&`;
    }
    if (typeValue !== '') {
      url = url + `type=${typeValue}&`;
    }
    if (speciesValue !== '') {
      url = url + `species=${speciesValue}&`;
    }
    setCurrentFilter(url);

    API(`character?${url}`)
      .then(res => {
        if (res !== undefined) {
          setNotFoundFlag(false);
          setCardsArr([...res.data.results]);
          setPagesNumber(+res.data.info.pages);
        }
        if (res === undefined) {
          setNotFoundFlag(true);
        }
      })
  }, [genderSelect, statusSelect, nameValue, typeValue, speciesValue]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    API(`character/?page=${page}&${currentFilter ? `${currentFilter}` : ''}`)
      .then(res => {
        if (res !== undefined) {
          setCardsArr([...res.data.results]);
        }
      })
  }

  const handleChangeGender = (value) => {
    setCurrentPage(1);
    setGenderSelect(value);
  }

  const handleChangeStatus = (value) => {
    setCurrentPage(1);
    setStatusSelect(value);
  }

  return (
    <>
      <div className={'filter'}>
        <Input placeholder='Name'
               value={nameValue}
               onChange={(e) => setNameValue(e.target.value)}
        />
        <Input placeholder='Type'
               value={typeValue}
               onChange={(e) => setTypeValue(e.target.value)}
        />
        <Input placeholder='Species'
               value={speciesValue}
               onChange={(e) => setSpeciesValue(e.target.value)}
        />
        <Select defaultValue={genderSelect} onChange={handleChangeGender}>
          <Option value="default">Gender</Option>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="genderless">genderless</Option>
          <Option value="unknown">unknown</Option>
        </Select>
        <Select defaultValue={statusSelect} onChange={handleChangeStatus}>
          <Option value="default">Status</Option>
          <Option value="alive">alive</Option>
          <Option value="dead">dead</Option>
          <Option value="unknown">unknown</Option>
        </Select>
      </div>
      {
        !notFoundFlag &&
        <div className={'cards'}>
          {
            cardsArr.map(item =>
              <Card key={item.id}
                    data={item}
                    setActive={(value) => setPopupActive(value)}
                    setData={(value) => setCardData(value)}
              />
            )
          }
        </div>
      }
      {
        (!notFoundFlag && pagesNumber > 1) &&
        <div className={'pagination'}>
          <Pagination current={currentPage}
                      defaultPageSize={1}
                      total={pagesNumber}
                      onChange={(page) => handleChangePage(page)}
          />
        </div>
      }
      {
        cardData &&
        <Popup active={popupActive}
               data={cardData}
               setActive={(value) => setPopupActive(value)}
        />
      }
      {notFoundFlag && <NotFound/>}
    </>
  );
}

export default App;
