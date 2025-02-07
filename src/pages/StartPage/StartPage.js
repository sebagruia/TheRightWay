import React, { Fragment, useState } from 'react';
import './StartPage.css';

import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  const [transitionClass, setTransitionClass] = useState('');
  const [visibility, setVisibility] = useState('');

  const fireTransitionAndVisibility = () => {
    navigate('/lists');
    setTransitionClass('transitionForColFullWidth');
    setVisibility('hidden');
  };

  return (
    <Fragment>
      <div className={`col-full-width ${transitionClass}`}>
        <div className="form">
          <h1>
            <span className="changedStyle">Do things</span> The Right Way
          </h1>
          <div className="form-group-1">
            <div
              className={`newList btn-outline-warning ${visibility}`}
              roll="button"
              onClick={fireTransitionAndVisibility}
            >
              <i className="fas fa-th-list"></i>
              <h5 className="font-weight-light ">Start Planning</h5>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StartPage;
