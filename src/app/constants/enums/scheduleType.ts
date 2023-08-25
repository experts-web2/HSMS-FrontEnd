import { IDropDown } from "src/app/models/interfaces/Dropdown";

export enum ScheduleTypeEnum{
    Appointment,
    FollowUp,
    CheckUp,
}

export const ScheduleTypesDropDown: Array<{label: string, value: ScheduleTypeEnum}> = [
    {
        label: 'Appointment',
        value: ScheduleTypeEnum.Appointment
    },
    {
        label: 'FollowUp',
        value: ScheduleTypeEnum.FollowUp
    },
    {
        label: 'CheckUp',
        value: ScheduleTypeEnum.CheckUp
    },
]