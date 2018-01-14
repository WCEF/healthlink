Current document link: [https://docs.google.com/document/d/1r9Wc8y3d2SiAFCUckxLWpNcms74yFVKEfYg31QCc44k/edit?usp=sharing](https://www.google.com/url?q=https://docs.google.com/document/d/1r9Wc8y3d2SiAFCUckxLWpNcms74yFVKEfYg31QCc44k/edit?usp%3Dsharing&sa=D&ust=1515931733667000&usg=AFQjCNGQlaty5uuGie8PTzTjbmG-069O0w)

Roles

        Admin

        Patient

        Doctor

        Pharmacy

Data Structures:

Licensed Doctors \-\- MapIndex (key/value pair)

[\[a\]](#cmnt1)

        Key = doctor’s public key

        Value = doctor’s name

Admin can edit the list

Doctors can use their private key to remove themselves from the list

Everyone can access the list

Licensed Pharmacies \-\- MapIndex (key/value pair)

Key = pharmacy’s public key

Value = pharmacy’s name

Admin can edit the list

Pharmacies can use their private key to remove themselves from the list

Everyone can access the list

Open prescriptions \-\- 4 column table

Contains: doctor public key, patient public key, NDC ID, amount

Doctor can create a prescription order using their private key and a patient’s public key

Pharmacy can remove a prescription from this list by filling a prescription order

Pharmacy can create an open prescription in a single transaction that requires and removes a filled prescription.

Patient can view all open prescriptions by their public key

Prescription Orders \-\- 6 column table

Contains: doctor public key, patient public key, pharmacy public key, prescription information, reference to open prescription, codephrase

Patient can create a prescription order using an open prescription, their private key, and a pharmacy’s public key

Pharmacy can remove a prescription order in a single transaction that also creates a filled prescription

Pharmacy can remove a prescription order using their private key

Patient can remove a prescription order using their private key

Filled Prescriptions \-\- 5 column table

        Contains: patient public key, doctor public key, pharmacy public key, prescription information, codephrase

Pharmacy can create a filled prescription by using their private key, a prescription order, and an open prescription. This transaction requires an open prescription and removes the open prescription.

Pharmacy can remove a filled prescription to create an open prescription

Patient can remove a filled prescription to create a delivered prescription.

Everyone can view by pharmacy public key, doctor public key, or patient public key

Delivered Prescriptions \-\- 4 column table

        Contains: patient public key, doctor public key, pharmacy public key, prescription information

Patient can create a delivered prescription by using their private key and a filled prescription. This requires and removes the filled prescription.

Action Flow

1:        (Offline) Doctor has appointment with patient, gets Patient’s public key

2:        Doctor creates an open prescription for Patient.

3:        Patient searches for open prescriptions under his public key

4:        Patient enters a pharmacy name and retrieves the pharmacy’s public key

5:        Patient creates a prescription order using the pharmacy’s public key

6:        Pharmacy attempts to create a filled prescription OR rejects patient’s prescription

7:        Open prescription is removed and filled prescription is created. Because creating a filled prescription requires an open prescription and Exonum has ordered execution, only one filled prescription may be created from an open prescription, although a patient may create an arbitrary number of prescription orders.

7:        (Offline) Patient goes to the pharmacy and says the codephrase. The pharmacist checks that they haven’t had somebody say the codephrase twice and hands over the physical medication.

7.5:        Alternately, the patient would request the pharmacist reverse their order. The pharmacist would check that nobody’s picked up the physical prescription and create an open prescription.

8:        Patient confirms the prescription has been delivered.

Problems we’re solving:

*   Decentralized coordination of prescriptions over corporations, states, nations
*   Identifying pill mills, bad interactions, and double-filling prescriptions
*   Maintains confidentiality of patient medications

How are these solved?

-Doctors’ prescriptions are public knowledge, so any auditor can see if a doctor is over-prescribing, say, opioids. Note that “Doctor” doesn’t necessarily refer to an individual--it could be a clinic or hospital with a single admin.

-Pharmacies’ orders are also public knowledge. A crooked employee can’t create fake orders, and an auditor with knowledge of how many controlled substances a pharmacy is supposed to receive can check for discrepancies.

-Double fills are algorithmically impossible.

-A doctor’s private key can be stolen, just like a prescription pad, but unlike a prescription pad a doctor who notices fake transactions can immediately revoke access.

-Patient anonymity is preserved. You can walk into a pharmacy, say a codephrase, and get your pills.

Integration with WELL

-It’s easy to link any/all of these transactions to WELL tokens.

-For example, filling an order could trigger a transaction of WELL tokens from the patient to a trusted third party. Order confirmation would release those tokens to the pharmacy.

-This would allow for cashless, verified, anonymous prescriptions. Now you can get drugs

[\[a\]](#cmnt_ref1)we know making licensed doctors public key-identity associations public is problematic, can get around by using group keys so that they are only known by a trusted third party but not public (https://pdfs.semanticscholar.org/da00/62f655246cd0dcdee560b1c6b1c85dc79684.pdf)
