export enum MedicationDurationEnum {
    Day = 1,
    Week = 2,
    Month = 3,
    Continuously = 4,
    WhenRequired = 5,
    STAT = 6,
    PRN = 7,
  }
export const MedicationDurations: Array<{label: string, value: MedicationDurationEnum}> = [
    { label: 'Day', value: MedicationDurationEnum.Day },
    { label: 'Week', value: MedicationDurationEnum.Week },
    { label: 'Month', value: MedicationDurationEnum.Month },
    { label: 'Continuously', value: MedicationDurationEnum.Continuously },
    { label: 'When Required', value: MedicationDurationEnum.WhenRequired },
    { label: 'STAT', value: MedicationDurationEnum.STAT },
    { label: 'PRN', value: MedicationDurationEnum.PRN },
  ];
  