const initialState = {
  byId: {
    "1": {
      name: "William Johnson",
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
