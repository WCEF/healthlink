import React from 'react';
import { connect } from 'react-redux';

import { selectPharmacy } from '../../modules/prescriptions';

import './pharmacy.css';

const PharmacySelect = ({
  rxId,
  pharmacies,
  pharmacyId,
  handleSubmit,
  handleChange,
}) => (
  <form onSubmit={handleSubmit} className="form-inline pharmacy">
    <select onChange={handleChange} className="form-control" value={pharmacyId}>
      <option value="" selected disabled>Select a Pharmacy</option>
      {
        pharmacies.map(p => <option value={p.id} key={p.id}>{p.name}</option>)
      }
    </select>
    <button className="btn btn-success" type="submit" disabled={!pharmacyId} onClick={handleSubmit}>
      Order
    </button>
  </form>
)

class PharmacySelectContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      pharmacyId: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    console.log(e.target.value);
    this.setState({ pharmacyId: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(selectPharmacy(this.props.rxId, this.state.pharmacyId))
  }

  render() {
    if (this.props.stepNumber === 1) {
      return (
        <PharmacySelect
          rxId={this.props.rxId}
          pharmacies={this.props.pharmacies}
          pharmacyId={this.state.pharmacyId}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }
    return <div/>;
  }
}

export default connect(
  state => ({ pharmacies: state.pharmacies.allIds.map(id => state.pharmacies.byId[id]) })
)(PharmacySelectContainer);
