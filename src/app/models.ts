
abstract class DataEntity {

  $key: string
  $value: any

  constructor(raw?: any) {
    if (raw != null) {
      this.$key = raw.$key
      this.$value = raw.$value
    }
  }
}

abstract class DescriptionEntity extends DataEntity {

  description: string

  constructor(raw?: any) {
    super(raw)
    this.description = this.$value
  }

}

export class Category extends DescriptionEntity {

}

export class Tag extends DescriptionEntity {

}

export enum AccountKind {
  CREDIT_CARD,
  CURRENT_ACCOUNT,
  SAVING_ACCOUNT
}

export class Account extends DataEntity {
  kind: AccountKind
  dueDate?: Number // for CreditCards only
  description: string

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
