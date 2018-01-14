# HealthLink

Anonymous, verified, provably valid prescriptions implemented on the Exonum blockchain. Working [Google doc](https://docs.google.com/document/d/1r9Wc8y3d2SiAFCUckxLWpNcms74yFVKEfYg31QCc44k/edit) here.

## AMP_bn.pptx

Hackathon presentation, probably the most accessible introduction to the idea.

## /healthlink_app/

React app mockup for HealthLink, showing the patient view of receiving a prescription, sending a request to a pharmacy, and validating that a prescription is received. Run: 

```
git clone https://github.com/WCEF/healthlink
cd healthlink
npm install
npm start 
```

## /healthlink_exonum/

Work in progress scripts for interacting with exonum. `transactions.js` utilizes Exonum's JavaScript lightweight client to mock up a physician submitting a prescription to a private blockchain, signed with their key. `blockchain.rs` is a preliminary document exploring how the protocol could be set up on an Exonum node.

## Roles
- Doctor
- Patient
- Pharmacy


## Action Flow

1. (Offline) Doctor has appointment with patient, gets Patient’s public key
2. Doctor creates an open prescription for Patient.
3. Patient searches for open prescriptions under his public key
4. Patient enters a pharmacy name and retrieves the pharmacy’s public key
5. Patient creates a prescription order using the pharmacy’s public key
6. Pharmacy attempts to create a filled prescription OR rejects patient’s prescription
7. Open prescription is removed and filled prescription is created. Because creating a filled prescription requires an open prescription and Exonum has ordered execution, only one filled prescription may be created from an open prescription, although a patient may create an arbitrary number of prescription orders.
8. (Offline) Patient goes to the pharmacy and says the codephrase. The pharmacist checks that they haven’t had somebody say the codephrase twice and hands over the physical medication.

(Alternately, the patient would request the pharmacist reverse their order. The pharmacist would check that nobody’s picked up the physical prescription and create an open prescription.)
9. Patient confirms the prescription has been delivered.

