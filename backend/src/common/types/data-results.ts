export interface ListResultMeta {
  totalCount: number;
  currentPageCount: number;
}

export interface ListResult<DataType> {
  data: DataType[];
  meta: ListResultMeta;
}
