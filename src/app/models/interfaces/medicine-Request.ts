import { MedicineType } from "src/app/constants/enums/Medicine-Type-Enum";
import { PotencyUnits } from "src/app/constants/enums/potency-units";


export interface IMedicinerequest{
    name: string,
    potency: number,
    salt: string,
    price: number,
    medicineType: MedicineType,
    potencyUnits: PotencyUnits      
}