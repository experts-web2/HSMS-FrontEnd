import { IPagedListRequest } from "./pagedListRequest";
import { IQueryOptionsRequest } from "./queryOptionRequest";

export interface IFetchRequest
{
    pagedListRequest?: IPagedListRequest;
    queryOptionsRequest?: IQueryOptionsRequest;
}