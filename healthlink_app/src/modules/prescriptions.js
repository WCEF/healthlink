import { combineReducers } from 'redux'

import { orderPrescription, postDeliveryConfirmation } from '../api/api';

export const SET_FILTER = 'prescription/SET_FILTER';
export const ORDERING_PRESCRIPTION = 'prescription/ORDERING_PRESCRIPTION';
export const ORDER_CONFIRMED = 'prescription/ORDER_CONFIRMED';
export const CONFIRMING_DELIVERY = 'prescription/CONFIRMING_DELIVERY';
export const DELIVERY_CONFIRMED = 'prescription/DELIVERY_CONFIRMED';

const byId = {
  "1": {
    name: "Synthroid (levothyroxine sodium) tablets",
    id: "1",
    status: "open",  // open, ordered, filled, delivered
    patientId: "1",
    doctorId: "1",
    pharmacyId: null,
    isOrdering: false,
  },
  "2": {
    name: "2nd Drug thing",
    id: "2",
    status: "ordered",
    patientId: "1",
    doctorId: "1",
    pharmacyId: null,
    isOrdering: false,
  },
  "3": {
    name: "Anti Cough Juice",
    id: "3",
    status: "open",
    patientId: "1",
    doctorId: "1",
    pharmacyId: null,
    isOrdering: false,
  },
  "4": {
    name: "Adderall",
    id: "4",
    status: "filled",
    patientId: "1",
    doctorId: "1",
    pharmacyId: null,
    isOrdering: false,
  },
}

const filterReducer = (state = null, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}

const allIdsReducer = (state = ["1", "2", "3", "4"], action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const byIdReducer = (state = byId, action) => {
  switch (action.type) {
    case ORDERING_PRESCRIPTION:
      return { ...state, [action.rxId]: Object.assign({}, state[action.rxId], { isOrdering: true }) }
    case CONFIRMING_DELIVERY:
      return { ...state, [action.rxId]: Object.assign({}, state[action.rxId], { isConfirmingDelivery: true }) }
    case ORDER_CONFIRMED:
      return { ...state, [action.rxId]: Object.assign({}, state[action.rxId], { isOrdering: false, status: 'ordered', pharmacyId: action.pharmacyId }) }
    case DELIVERY_CONFIRMED:
      return { ...state, [action.rxId]: Object.assign({}, state[action.rxId], { isConfirmingDelivery: false, status: 'delivered' }) }
    default:
      return state;
  }
}

export default combineReducers({
  byId: byIdReducer,
  allIds: allIdsReducer,
  filter: filterReducer
})

export const getFilteredIds = (state) => {
  if (state.prescriptions.filter === null) {
    return state.prescriptions.allIds;
  }
  return state.prescriptions.allIds.filter(id => state.prescriptions.byId[id].status === state.prescriptions.filter);
}

export const setFilter = (filter) => {
  return { type: SET_FILTER, filter };
}

export const orderingPresription = (rxId) => {
  return { type: ORDERING_PRESCRIPTION, rxId };
}
export const confirmingDelivery = (rxId) => {
  return { type: CONFIRMING_DELIVERY, rxId };
}

export const orderConfirmed = ({rxId, pharmacyId}) => {
  return { type: ORDER_CONFIRMED, rxId, pharmacyId };
}
export const deliveryConfirmed = ({rxId}) => {
  return { type: DELIVERY_CONFIRMED, rxId };
}

export const selectPharmacy = (rxId, pharmacyId) => (dispatch) => {
  console.log("selecting pharmacy");
  dispatch(orderingPresription(rxId))
  orderPrescription(rxId, pharmacyId).then(resp => dispatch(orderConfirmed(resp)))
}

export const confirmDelivery = (rxId) => (dispatch) => {
  dispatch(confirmingDelivery(rxId))
  postDeliveryConfirmation(rxId).then(resp => dispatch(deliveryConfirmed(resp)))
}
