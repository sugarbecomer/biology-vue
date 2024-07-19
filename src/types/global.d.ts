declare type LocaleType = "zh-CN" | "en";

declare type TableType<T> = {
  loading: boolean;
  data: T[];
  update(data: T): void;
  delete(id: any): void;
};

declare enum MODAL_OPEN_TYPE {
  ADD = 1,
  UPDATE = 2,
  DETAIL = 3,
}
