import React, { useState, Fragment } from 'react';
import './StartPage.css';



const StartPage = () => {
    const [transitionClass, setTransitionClass] = useState('');
    const [visibility, setVisibility] = useState('');


    const fireTransitionAndVisibility = () => {
        setTransitionClass('transitionForColFullWidth');
        setVisibility('hidden');
    }

    return (
        <Fragment>
            <div className={`col-full-width ${transitionClass}`}>
                <div className="form">
                    <h1><span className="changedStyle">Do things</span> The Right Way</h1>
                    <div className="form-group-1">

                        <div className={`newList btn-outline-warning ${visibility}`} roll="button" onClick={fireTransitionAndVisibility}>
                            <i className="fas fa-th-list"></i>
                            <h5 className="font-weight-light ">Start Planning</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}


export default StartPage;