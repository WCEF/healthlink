pub struct PrescriptionSchema<'a> {
    view: &'a mut Fork,
}



message! {
    struct TxCreatePrescriptionList {
        const TYPE = SERVICE_ID;
        const ID = TX_CREATE_WALLET_ID;
        const SIZE = 40;

        field patient_pub_key:    &PublicKey  [00 => 32]
        field patient_name:       &str        [32 => 40]
    }
}

impl Transaction for TxCreatePrescriptionList {
    fn verify(&self) -> bool {
        self.verify_signature(self.pub_key())
    }

    fn execute(&self, view: &mut Fork) {
        let mut schema = CurrencySchema { view };
        if schema.wallet(self.pub_key()).is_none() {
            let wallet = Wallet::new(self.pub_key(),
                                     self.name(),
                                     INIT_BALANCE);
            println!("Create the wallet: {:?}", wallet);
            schema.wallets().put(self.pub_key(), wallet)
        }
    }
}



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
    pub fn updatePrescription(self, doctor_key: &PublicKey, patient_key: &PublicKey, ndcID: u32, amount: u16) -> Self {
        let balance = self.balance() + amount;
        Self::new(self.pub_key(), self.name(), balance)
    }

    pub fn decrease(self, amount: u64) -> Self {
        let balance = self.balance() - amount;
        Self::new(self.pub_key(), self.name(), balance)
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
