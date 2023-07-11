import { SortOrder } from "../../constants/enums/SortOrder";

export interface SortRequest 
{
    /**
     * @remarks
     * This is the name of the column that we want to sort on.
     */
    field: string;

    /**
     * @rmarks
     * This is the enum that will consider what is the sort order decending/ascending
     */
    direction: SortOrder;

    /**
     * @rmarks
     * This property tells prority level of the column
     */
    priority: number; 
}