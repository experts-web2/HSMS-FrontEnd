export interface IPagedListRequest
{
    /**
     * @rmarks
     * This prperty will decide at which page you are
     */
    pageNo: number;

    /**
     * @rmarks
     * This property decides how many records you want to bring 
     */
    pageSize: number;
}