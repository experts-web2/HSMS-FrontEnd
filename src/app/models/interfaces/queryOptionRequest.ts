import { SortRequest } from "./SortRequest";
import { IFiltersRequest } from "./filterRequst";

export interface IQueryOptionsRequest
{
    /**
     * @remarks
     * Holds the filters' list that are going to be applied on query while fetching the records.
     */
    
    filtersRequest?: Array<IFiltersRequest>;

    /**
    * @remarks 
    * Holds the columns name their priority and direction of sorting that are going to be applied on query while fetching the records.
    */
    sortRequest?: Array<SortRequest>;

    /**
    * @remarks 
    * Holds the list of table names whose records are needed to be fetched along with current table's records.
    */
    includes?: Array<string>;

    /**
    * @remarks 
    * Holds the list of the table names whose records are needed to be fetched along with included tables.
    */
    thenIncludes?: Array<string>;
}