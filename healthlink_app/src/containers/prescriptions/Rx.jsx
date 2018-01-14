import React from 'react';
import { connect } from 'react-redux';
import { confirmDelivery } from '../../modules/prescriptions';

import PharmacySelect from '../pharmacies/PharmacySelect';

const Rx = ({ rx, doctor, stepNumber, confirmDelivery }) => (
  <div className={`panel ${stepNumber === 4 ? 'panel-success' : 'panel-default'}`}>
    <div className="panel-heading">
      <h4>{rx.name}<small> - Prescribed by Dr. {doctor.name}</small></h4>
    </div>
    <div className={`panel-body `}>
      <div className="progress">
        <div className={`progress-bar ${stepNumber === 4 ? 'progress-bar-success' : ''}`} role="progressbar" style={{ width: `${stepNumber/4 * 100}%` }}>
          {stepNumber}/4 - {rx.status}
        </div>
        { rx.isOrdering ? <div className="progress-bar progress-bar-warning progress-bar-striped active" role="progressbar" style={{ width: '25%' }}/> : <div className="progress-bar progress-bar-warning progress-bar-striped active" style={{ width: '0%' }}/> }
        { stepNumber === 2 ? <div className="progress-bar-info progress-bar" style={{ width: '25%' }}>Being Filled</div> : <div className="progress-bar progress-bar-info" style={{ width: '0%' }}/>}
        { rx.isConfirmingDelivery ? <div className="progress-bar progress-bar-warning progress-bar-striped active" role="progressbar" style={{ width: '25%' }}/> : <div className="progress-bar progress-bar-warning progress-bar-striped active" style={{ width: '0%' }}/>}
      </div>
      {/* stepNumber === 1 ? <span className="label label-warning">User Action Required</span> : '' */}
      <PharmacySelect rxId={rx.id} stepNumber={stepNumber} />
      <button style={{ display: stepNumber === 3 ? '' : 'none' }} className="btn btn-success" onClick={() => confirmDelivery(rx.id)}>Confirm Delivery</button>
    </div>

  </div>
)

export default connect(
  (state, ownProps) => {
    const rx = state.prescriptions.byId[ownProps.id] || {};
    const steps = { open: 1, ordered: 2, filled: 3, delivered: 4 }
    return {
      rx,
      doctor: state.doctors.byId[rx.doctorId],
      stepNumber: steps[rx.status],
    };
  },
  dispatch => ({ confirmDelivery: (rxId) => dispatch(confirmDelivery(rxId)) })
)(Rx);