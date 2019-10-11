import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
  const [state, setState] = useState({
    list: []
  });

  useEffect(() => {
    // fetch('https://nextar.flip.id/frontend-test', {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => {
    //     return res;
    //   })
    //   .then(item => {
    //     console.log(item);
    //   });
  }, [state]);

  return (
    <div className="App">
      <div className="input-wrapper">
        <FontAwesomeIcon className="faicon" icon={faSearch} />
        <input type="text" placeholder="Cari nama" />
      </div>

      <div className="client-list">
        <div className="green-line"></div>
        <div className="list-content">
          <div className="content-left">
            <h3>BNI BRI</h3>
            <p>SALAMAH</p>
            <p>Rp 250000 &#9679; 5 Agustus 2019</p>
          </div>
          <button className="btn-status">Berhasil</button>
        </div>
      </div>
    </div>
  );
}

export default App;
