import { DataTypesEnum } from "src/app/constants/enums/dataTypes";
import { TableColumnFilterTypes } from "src/app/constants/enums/table-column-filterTypes"

export interface ITableColumns{
    name: string,
    property: string,
    filter?: boolean,
    globalSearch?: boolean,
    filterType?: TableColumnFilterTypes,
    columnType?: DataTypesEnum,
    enum?: any,
    valueToShow?: Function;
}