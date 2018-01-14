## HealthLink


### Application Pages
  - Prescriptions List
  - Prescription detail view

### Example Redux State
  - doctors: {
    - byId: {}
    - allIds: []
  }
  - patients: {
    - byId: {}
    - allIds: []
  }
  - pharmacies: {
    - byId: {}
    - allIds: []
  }
  - prescriptions: {
    - byId: {
      - "uuid-1234": {
        - name: "Drug thing"
        - status: "open" <!-- open, ordered, filled -->
        - patient: "<patientId>"
        - pharmacy: "<pharmacyId>"
      }
    }
    - allIds: []
  }
