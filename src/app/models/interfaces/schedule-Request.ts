import { AppointmentStatusEnum } from "src/app/constants/enums/appointment-status";
import { ScheduleTypeEnum } from "src/app/constants/enums/scheduleType";

export interface IScheduleRequest{
    appointmentDate: Date;
    startTime: string;
    endTime: string;
    type: ScheduleTypeEnum;
    status: AppointmentStatusEnum;
    doctorId: string;
    patientId: string;
}