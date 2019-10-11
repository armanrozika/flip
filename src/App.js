import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
  const [state, setState] = useState({
    list: [],
    months: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'December'
    ],
    search: ''
  });

  useEffect(() => {
    fetch('https://armanrozika.github.io/page/comments.json', {
      method: 'GET'
    })
      .then(res => {
        return res.json();
      })
      .then(item => {
        const formatter = new Intl.NumberFormat('en-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        });

        const setList = item.map(list => {
          const toRp = formatter.format(list.amount).replace('IDR', 'Rp');
          const dd = new Date(list.completed_at);
          const readYear = dd.getFullYear();
          const readDate = dd.getDate();
          const readMonth = dd.getMonth();

          return {
            ...list,
            amount: toRp.replace(/,/gi, '.'),
            date: readDate,
            month: readMonth,
            year: readYear
          };
        });

        setState({ ...state, list: setList });
      });
  }, []);

  const handleonChange = e => {
    const itemList = document.querySelectorAll('.client-list');
    for (let i = 0; i < itemList.length; i++) {
      if (
        itemList[i].dataset.name
          .toUpperCase()
          .indexOf(e.target.value.toUpperCase()) > -1
      ) {
        itemList[i].style.display = '';
      } else {
        itemList[i].style.display = 'none';
      }
    }
    setState({ ...state, search: e.target.value });
  };

  return (
    <div className="App">
      <div className="input-wrapper">
        <FontAwesomeIcon className="faicon" icon={faSearch} />
        <input
          type="text"
          placeholder="Cari nama"
          value={state.search}
          onChange={handleonChange}
        />
      </div>

      {state.list.map(item => {
        return (
          <div
            key={item.id}
            className="client-list"
            data-name={item.beneficiary_name}
          >
            <div className="green-line"></div>
            <div className="list-content">
              <div className="content-left">
                <h3>
                  {item.sender_bank.toUpperCase()}
                  <span>
                    {' '}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                  {item.beneficiary_bank.toUpperCase()}
                </h3>
                <p>{item.beneficiary_name}</p>
                <p>
                  {item.amount} &#9679;{' '}
                  {`${item.date} ${state.months[item.month]}  ${item.year}`}
                </p>
              </div>
              <button className="btn-status">Berhasil</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
