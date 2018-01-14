

encoding_struct! {
    struct OpenPrescriptions {
        const SIZE = 70;

        doctorKey: {type: Exonum.Hash, size: 32, from: 0, to: 32},
        patientKey: {type: Exonum.Hash, size: 32, from: 32, to: 64},
       	ndcID: {type: Exonum.Uint32, size: 4, from: 64, to: 68}, // https://en.wikipedia.org/wiki/National_Drug_Code
        amount: {type: Exonum.Uint64, size: 8, from: 68, to: 76} // 0 to delete

        field doctor_key:            &PublicKey  [00 => 32]
        field patient_key:           &PublicKey  [32 => 64]
        field ndcID:                 &Uint32     [64 => 68]
        field amount:                &Uint16     [68 => 70]
    }
}


impl OpenPrescriptions {
    pub fn updatePrescription(self, amount: u16) -> Self {
        Self::new(self.doctor_key(), self.patient_key(), self.ndcID, amount)
    }

    pub fn fillPrescription(self, amount: u16) -> Self {
        Self::new(self.doctor_key(), self.patient_key(), self.ndcID, 0)
    }
}

pub struct PrescriptionSchema<'a> {
    view: &'a mut Fork,
}

message! {
    struct TxCreatePrescription {
        const TYPE = SERVICE_ID;
        const ID = TX_CREATE_WALLET_ID;
        const SIZE = 40;

        field pub_key:     &PublicKey  [00 => 32]
        field name:        &str        [32 => 40]
    }
}

impl PrescriptionsAPI {
    fn get_prescription(&self, req: &mut Request) -> IronResult<Response> {
        let path = req.url.path();
        let wallet_key = path.last().unwrap();
        let public_key = PublicKey::from_hex(wallet_key)
            .map_err(ApiError::FromHex)?;

        let wallet = {
            let mut view = self.blockchain.fork();
            let mut schema = PrescriptionSchema { view: &mut view };
            schema.wallet(&public_key)
        };

        if let Some(wallet) = wallet {
            self.ok_response(&serde_json::to_value(wallet).unwrap())
        } else {
            self.not_found_response(
                &serde_json::to_value("Wallet not found").unwrap(),
            )
        }
    }
}
