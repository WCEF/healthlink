export const orderPrescription = (rxId, pharmacyId) => {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, 3000, { rxId, pharmacyId });
  });
}

export const postDeliveryConfirmation = (rxId) => {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, 1500, { rxId });
  });
}
