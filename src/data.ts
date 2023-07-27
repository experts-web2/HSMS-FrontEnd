export class patientData {

    static getAppointments() {
        return { appointments: [] }
    }

    static getMessages() {
        return [
            { sendAt: '12 Days Ago', message: 'Dear Anwar, welcome to MedicaZon Hospital Multan, Thank you for choosing us.' },
            { sendAt: '12 Days Ago', message: 'Dear Zohaib, welcome to MedicaZon Hospital Multan, Thank you for choosing us.' },
            { sendAt: '12 Days Ago', message: 'Dear Abdullah, welcome to MedicaZon Hospital Multan, Thank you for choosing us.' },
            { sendAt: '12 Days Ago', message: 'Dear Waqas, welcome to MedicaZon Hospital Multan, Thank you for choosing us.' },
            { sendAt: '12 Days Ago', message: 'Dear Mohsin, welcome to MedicaZon Hospital Multan, Thank you for choosing us.' },
        ];
    }


    static getLabTest() {
        return [
            { lab: '1', mr: '0001', patient: 'Inam', patientType: 'Rich', name: 'White blood cell (WBC)', price: '700', referal: 'urgent', addedBy: 'zohaib', createdAt: '19/07/2023' },
        ];
    }
    static getTokenData() {
        return [];
    }


    static getPatientTests() {
        return [
            {
                patientId: "a4b96ae6-4101-4fdf-ae8c-b146a34b6aaa",
                name: "Diabetes",
                description: "Diabetes",
                id: "ae2084f3-84dd-4408-9d95-143b8e10cd4f",
            },
            {
                patientId: "a4b96ae6-4101-4fdf-ae8c-b146a34b6aaa",
                name: "Serum Anti Smooth Muscle Abs (ASMA)",
                description: "Wide species reactivity, highly cited and reviewed alpha smooth muscle Actin antibodies.",
                id: "2588cb05-fc8c-4bc8-b68f-2a4d5f70b177",

            },
            {
                patientId: "a4b96ae6-4101-4fdf-ae8c-b146a34b6aaa",
                name: "Urine Sugar",
                description: "Sugar present in urine",
                id: "bed5674c-0bb6-4b57-90c0-4e2920d50bc4",

            },
            {
                patientId: "a4b96ae6-4101-4fdf-ae8c-b146a34b6aaa",
                name: "Skin Scrapping for fungus",
                description: "Scrape the skin using a scalpel (held at a blunt angle) ",
                id: "12a3faeb-b95a-443e-8b8a-51f328b00934",

            },
            {
                patientId: "e964336a-80f1-497d-905a-d5301202136f",
                name: "17-Hydroxy Progesterone (OHP)",
                description: "17-Hydroxy Progesterone (OHP)",
                id: "adcd290f-d868-4bc7-b18b-7a3618871a86",
            },
            {
                patientId: "e964336a-80f1-497d-905a-d5301202136f",
                name: "Red blood cell ",
                description: "RBC",
                id: "b80bade3-29ac-49a8-98fd-7f546436ce51",
            },
            {
                patientId: "e964336a-80f1-497d-905a-d5301202136f",
                name: "White blood cell (WBC)",
                description: "(WBC)",
                id: "5f6e740e-b392-480c-995b-925f6e28ff7b",
            },
            {
                patientId: "e964336a-80f1-497d-905a-d5301202136f",
                name: "5 HIAA (24 Hrs Urine)",
                description: "5 HIAA (24 Hrs Urine)",
                id: "53a4aeb9-aa08-4bd5-b51d-b575d74aed0d",
            },
            {
                patientId: "e964336a-80f1-497d-905a-d5301202136f",
                name: "CBC",
                description: "Complete Blood Count",
                id: "3cbbc6fc-11b9-41bd-9eee-fbab242b6b49",
            }
        ];
    }
}