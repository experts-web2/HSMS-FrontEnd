export class patientData {

    static getAppointments() {
        return { appointments: [{ name: '', time: 'There Are No Tokens For Today', doctor: '' }] }
    }

    static getMessages() {
        return [
            { sendAt: '12 Days Ago', message: 'Dear Anwar, welcome to MedicaZon Hospital Multan, Thank you for choosing us.' },
            { sendAt: '12 Days Ago', message: 'Dear Zohaib, welcome to MedicaZon Hospital Multan, Thank you for choosing us.' },
            { sendAt: '12 Days Ago', message: 'Dear Abdullah, welcome to MedicaZon Hospital Multan, Thank you for choosing us.' },
            { sendAt: '12 Days Ago', message: 'Dear Waqas, welcome to MedicaZon Hospital Multan, Thank you for choosing us.' },
            { sendAt: '12 Days Ago', message: 'Dear Mohsin, welcome to MedicaZon Hospital Multan, Thank you for choosing us.' },
            { sendAt: '', message: 'There Are No Tokens For Today' },
        ];
    }

    static getTokenData() {
        return [{ token: '', patient: 'There Are No Tokens For Today', doctor: '' }];
    }

}