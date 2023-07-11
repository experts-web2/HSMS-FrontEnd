import { FiltersMatchModes } from "../../constants/enums/FilterMatchModes";
import { FiltersOperators } from "../../constants/enums/FilterOperators";
import { StringComparison } from "../../constants/enums/StringComparison";

export interface IFiltersRequest 
{   
    /**
     * @rmarks
     * Holds the name of the column filter is going to be applied on.
     */
    field: string;

    /**
     * @rmarks
     * Holds the mode of the filter equal, not equal, less than or greater than etc.
     */
    matchMode?: FiltersMatchModes; 

    /**
     * @rmarks
     * Holds the operator of the filter and or.
     */
    operator?: FiltersOperators;

    /**
     * @rmarks
     * Holds the value against the filter is going to be applied.
     */
    value: any;

    /**
     * @rmarks
     * Holds the comparison value whether case is needed to be ignored or not.
     */
    stringComparison?: StringComparison 
}