//entity
//仕様上、変更不可(登録と削除だけ）。これはentityではない？

export type Record = {
  readonly id:number,
  readonly work:number,
  readonly workname:string,
  readonly typeid:number,
  readonly typename:string,
  readonly num:number,
  readonly created_at:string
}
