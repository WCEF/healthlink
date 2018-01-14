import React from 'react';
import { connect } from 'react-redux';
// import { Route, Link } from 'react-router-dom'
import { setFilter, getFilteredIds } from '../../modules/prescriptions';

import Rx from './Rx';

import './Rx.css';

const RxList = ({ rxIds, dispatch }) => (
  <div className="rxList">
    <header>
      <h3>Prescriptions</h3>
      <ul className="nav nav-tabs">
        <li role="presentation"><a href="#" onClick={() => dispatch(setFilter(null))}>All</a></li>
        <li role="presentation"><a href="#" onClick={() => dispatch(setFilter('open'))}>Open</a></li>
        <li role="presentation"><a href="#" onClick={() => dispatch(setFilter('ordered'))}>Ordered</a></li>
        <li role="presentation"><a href="#" onClick={() => dispatch(setFilter('filled'))}>Filled</a></li>
        <li role="presentation"><a href="#" onClick={() => dispatch(setFilter('delivered'))}>Delivered</a></li>
      </ul>
    </header>

    {
      rxIds.map(id => <Rx id={id} key={id} />)
    }
  </div>
)

export default connect(
  state => ({ rxIds: getFilteredIds(state) }),
)(RxList);
