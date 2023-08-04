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
    
    static getBrands() {

        return [
                {
                    id: "1",
                    name: "GlaxoSimth Kline"
                },
                {
                    id: "2",
                    name: "Getz Pharma"
                },
                {
                    id: "3",
                    name: "Abbott Laboratories"
                },
                {
                    id: "4",
                    name: "Sami Pharma"
                },
                {
                    id: "5",
                    name: "Halton Pharma"
                },
                {
                    id: "6",
                    name: "Searle"
                },
                {
                    id: "7",
                    name: "Ferozsons"
                },
                {
                    id: "8",
                    name: "Pfizer"
                },
                {
                    id: "9",
                    name: "Bayer"
                },
                {
                    id: "10",
                    name: "Macter pharma"
                },
                {
                    id: "11",
                    name: "Martin Dow"
                },
                {
                    id: "12",
                    name: "Novartis"
                },
                {
                    id: "13",
                    name: "Sanofi"
                },
                {
                    id: "14",
                    name: "Bosch pharma"
                },
                {
                    id: "15",
                    name: "Merck & Co"
                },
                {
                    id: "16",
                    name: "Eli Lilly"
                },
                {
                    id: "17",
                    name: "Indus Pharma"
                },
                {
                    id: "18",
                    name: "Horizon Healthcare"
                },
                {
                    id: "19",
                    name: "Platinum Pharma"
                },
                {
                    id: "20",
                    name: "Reckitt Benckiser"
                },
            
        ];
    }
}