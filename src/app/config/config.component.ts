import { DATASET } from './../dataset-module';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Account, Category, Tag } from '../models';
import { ServiceAPIStrategy } from '../service-api.service';
import 'rxjs/Rx';

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

  constructor() {

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

}
