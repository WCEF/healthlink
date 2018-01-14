import { ORDER_CONFIRMED } from './prescriptions';

const initialState = {
  byId: {
    "1": {
      name: "PharmaCo Inc",
      id: "1",
    },
    "2": {
      name: "Drugs R Us",
      id: "2",
    },
  },
  allIds: ["1", "2"],
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
