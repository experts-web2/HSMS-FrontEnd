import * as moment from "moment";

export const xAxis = {
    week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    year: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    month: (month: number = moment().get('month'), year: number = moment().get('year')) => {
        let startDate = moment().set('month', month).set('year', year).startOf('month');
        let endDate = startDate.clone().endOf('month').endOf('day');
        let dates: Array<string> = [];
        let incrementalDate = startDate.clone();

        while (incrementalDate.isBefore(endDate)) {
            dates.push(incrementalDate.format('MMM/DD/yyyy'))
            incrementalDate.add(1, 'day');
        }

        return dates;
    },
    custom: (startDate: Date, endDate: Date) => {
        let initialDate = moment(startDate).startOf('day');
        let lastDate = moment(endDate).endOf('day');
        let dates: Array<string> = [];
        let incrementalDate = initialDate.clone();

        while (incrementalDate.isBefore(lastDate)) {
            dates.push(incrementalDate.format('MMM/DD/yyyy'))
            incrementalDate.add(1, 'day');
        }

        return dates;
    }
};