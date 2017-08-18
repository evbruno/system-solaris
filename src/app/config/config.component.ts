import { DATASET } from './../dataset.module';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/Rx';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  categories: Observable<Array<Category>>
  categoriesAreLoading = true

  accounts: Observable<Account[]>
  accountsAreLoading = true

  tags: Observable<Tag[]>
  tagsAreLoading = true

  constructor(private db: AngularFireDatabase) {
    // this.tagsFB = db.list('/v2/tags')

    // // let pusher: any
    // // this.tagsSUB = new Observable(obs => {
    // //   pusher = obs
    // // })

    // this.tagsSUB = Observable.from([])

    // this.tagsFB
    //   .map(this.mapTagList)
    //   .subscribe(
    //     (list: Array<Tag>) => {
    //       console.log(list)
    //       //pusher.next(list)
    //       //this.tagsFBErrorMsg = null
    //     },
    //     (err: any) => {
    //       console.log(`Error accessing firebase : ${err}`)
    //       //this.tagsFBErrorMsg = err
    //     }
    //   )

    // this.tagsFB
    //   .flatMap(this.mapp)
    //   .subscribe(
    //     (list:any) => {
    //       console.log(list)
    //     }
    //   )
  }

  // mapp(x) {
  //   console.log(x)
  //   return x
  // }

  // mapTagList(rawTags: Array<any>) {
  //   return rawTags.map(raw => {
  //       let tag = new Tag
  //       tag.$key = raw.$key
  //       tag.description = raw.$value
  //       return tag
  //   })
  // }
  chegouMsg(evt) {
    console.log(evt)
  }

  ngOnInit() {
    this.categoriesAreLoading = true
    this.categories = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.populateCategories());
        this.categoriesAreLoading = false
      }, 1000);
    })

    this.accountsAreLoading = true
    this.accounts = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.populateAccounts());
        this.accountsAreLoading = false
      }, 4000);
    })

    this.tagsAreLoading = true
    this.tags = new Observable(observer => {
      setTimeout(() => {
        observer.next([]);
        this.tagsAreLoading = false

        setTimeout(() => {
          this.populateTagAgain(observer)
        }, 3000);

      }, 2000);
    })
  }

  populateTagAgain(observer: Subscriber<Tag[]>) {
    this.tagsAreLoading = true
    setTimeout(() => {
      let tags = this.populateTags()
      observer.next(tags);
      this.tagsAreLoading = false
    }, 3000);
  }

  populateCategories(): Category[] {
    let cats = DATASET.categories
    let ret = new Array<Category>()

    for (var key in cats) {
      if (cats.hasOwnProperty(key)) {
        let c = new Category
        c.$key = key
        c.description = cats[key]
        ret.push(c)
      }
    }

    return ret
  }

  populateAccounts(): Account[] {
    let accs = DATASET.accounts
    let ret = new Array<Account>()

    for (var key in accs) {
      if (accs.hasOwnProperty(key)) {
        let json = accs[key]
        json.$key = key

        ret.push(Account.fromJson(json))
      }
    }

    return ret
  }

  populateTags(): Tag[] {
    let tags = DATASET.tags
    let ret = new Array<Tag>()

    for (var key in tags) {
      if (tags.hasOwnProperty(key)) {
        let tag = new Tag
        tag.$key = key
        tag.description = tags[key]
        ret.push(tag)
      }
    }

    return ret
  }

}

//FIXME exctract MODULES

export abstract class DataEntity {
  $key: string
  description: string
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
  kind: AccountKind
  dueDate?: Number // for CreditCards only

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
