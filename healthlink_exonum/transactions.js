/**Open prescriptions -- 3 column table
	Contains: doctor public key, patient public key, prescription information
Doctor can create a prescription order using their private key and a patient’s public key
Pharmacy can remove a prescription from this list by filling a prescription order
Patient can view all open prescriptions by their public key**/


var Prescription = Exonum.newMessage({
    size: 70,
    network_id: 0,
    protocol_version: 0,
    service_id: 0,
    message_id: 0,
    fields: {
        doctorKey: {type: Exonum.Hash, size: 32, from: 0, to: 32},
        patientKey: {type: Exonum.Hash, size: 32, from: 32, to: 64},
       	ndcID: {type: Exonum.Uint32, size: 4, from: 64, to: 68}, // https://en.wikipedia.org/wiki/National_Drug_Code
        amount: {type: Exonum.Uint16, size: 2, from: 68, to: 70} // 0 to delete
    }
});

var newPrescription = {
    doctorKey: '6752be882314f5bbbc9a6af2ae634fc07038584a4a77510ea5eced45f54dc030',
    patientKey: 'f5864ab6a5a2190666b47c676bcf15a1f2f07703c5bcafb5749aa735ce8b7c36',
    medicine: 1234567890,
    amount: 15
};

var signedPrescription = Exonum.sign(secretKey, newPrescription);


var signature = 'c1db9a5f01ebdff27e02652a9aae5c9a4ac88787587dabceb9f471ae0b8e051b' +
 '9632dfd26922f6abf24ff2d3275028fe286703d25ee7fe6b1711e89af4a7d307';
var publicKey = 'fa7f9ee43aff70c879f80fa7fd15955c18b98c72310b09e7818310325050cf7a';
var result = Exonum.verifySignature(signedPrescription, publicKey, data, User);


var fillPrescription = Exonum.newMessage({
    size: 68,
    network_id: 0,
    protocol_version: 0,
    service_id: 0,
    message_id: 0,
    fields: {
        pharmacyKey: {type: Exonum.Hash, size: 32, from: 0, to: 32},
        patientKey: {type: Exonum.Hash, size: 32, from: 32, to: 64},
       	ndcID: {type: Exonum.Uint32, size: 4, from: 64, to: 68}, // https://en.wikipedia.org/wiki/National_Drug_Code
    }
});


