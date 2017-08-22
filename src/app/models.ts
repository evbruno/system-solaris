
export abstract class DataEntity {
  public $key: string
  public description: string
}

export class Category extends DataEntity {

}

export class Tag extends DataEntity {

}

export enum AccountKind {
  CREDIT_CARD,
  CURRENT_ACCOUNT,
  SAVING_ACCOUNT
}

export class Account extends DataEntity {
  public kind: AccountKind
  public dueDate?: Number // for CreditCards only

  static fromJson(json: any): Account {
    let a = new Account()

    a.$key = json.$key
    a.description = json.description
    a.dueDate = json.dueDate
    a.kind = this.extractKind(json.kind)

    return a
  }

  static extractKind(kind: string): AccountKind {
    if (kind == 'current-account') return AccountKind.CURRENT_ACCOUNT
    if (kind == 'saving-account') return AccountKind.SAVING_ACCOUNT
    if (kind == 'credit-card') return AccountKind.CREDIT_CARD

    throw new Error()
  }

  kindDescription(): string {
    if (this.kind === AccountKind.CURRENT_ACCOUNT) return "current-account"
    if (this.kind === AccountKind.SAVING_ACCOUNT) return "saving-account"
    if (this.kind === AccountKind.CREDIT_CARD) return "credit-card"

    throw new Error()
  }
}

export class Transaction extends DataEntity {
  value: Number
  dueDate?: Number
  target: Account
  selfRenew: boolean = false
  credit: boolean = false
}
