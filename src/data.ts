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
            { lab: '1', mr: '0001',patient:'Inam',patientType:'Rich',name:'White blood cell (WBC)',price:'700',referal:'urgent',addedBy:'zohaib',createdAt:'19/07/2023' },
        ];
    }
    static getTokenData() {
        return [];
    }

}