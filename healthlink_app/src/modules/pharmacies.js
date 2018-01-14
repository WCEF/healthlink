import { ORDER_CONFIRMED } from './prescriptions';

const initialState = {
  byId: {
    "1": {
      name: "PharmaCo Inc",
      id: "1",
    },
  },
  allIds: ["1"],
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
