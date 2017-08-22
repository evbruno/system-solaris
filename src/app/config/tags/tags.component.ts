import { Component, OnInit } from '@angular/core';
import { Account, Category, Tag } from '../../models';
import { ServiceAPIStrategy } from '../../service-api.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import 'rxjs/Rx';

@Component({
  selector: 'config-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  errorMsg: string
  successMsg: string

  tags: Observable<Tag[]>
  tagsAreLoading = false

  constructor(private api: ServiceAPIStrategy) {
    this.tags = this.api.impl().allTags()

    setTimeout(() => {
      this.api.impl().save('xxx', 'yyy')
    }, 6000)

    this.tags.subscribe(_ => {
      this.tagsAreLoading = false
    })

    // private db: AngularFireDatabase

    // this.tagsFB = db.list('/v2/tags')

    //     this.tagsFB
    //       .map(this.mapTagList)
    //       .subscribe(
    //         (list: Array<Tag>) => {
    //           console.log(list)
    //           //pusher.next(list)
    //           this.tagsFBErrorMsg = null
    //         },
    //         (err: any) => {
    //           console.log(`Error accessing firebase : ${err}`)
    //           this.tagsFBErrorMsg = err
    //         }
    //       )

    //     this.tagsFB
    //       .flatMap(this.mapp)
    //       .subscribe(
    //         (list:any) => {
    //           console.log(list)
    //         }
    //       )
  }

  ngOnInit() {

  }

  tagFormModel: TagFormModel = new TagFormModel()
  isEditingTagFormModel: boolean = false

  tagFormSubmitAction() {
    console.log(`tag form action : ${this.tagFormModel.key}`)
    this.successMsg = null
    this.errorMsg = null

    // const tags = this.db.list('/v2/tags')

    // tags.set(this.tagFormModel.key, this.tagFormModel.description)
    //   .then(r => {
    //     console.log(`saving ${r}`)
    //     this.tagsFBSuccessMsg = 'Saved!'
    //     this.isEditingTagFormModel = false
    //     this.tagFormModel = new TagFormModel()
    //   }).catch(e => {
    //     console.log(`error ${e}`)
    //     this.tagsFBErrorMsg = `error saving ${e}`
    //   })
  }

  tagFormCancelAction() {
    this.successMsg = null
    this.errorMsg = null
    this.tagFormModel = new TagFormModel()
    this.isEditingTagFormModel = false
  }

  tagFormSelectRow(row: Tag) {
    this.isEditingTagFormModel = true
    console.log(`row selected: ${row}`)
    this.tagFormModel = new TagFormModel(row.$key, row.description)
  }

  tagFormDeleteRow(row: Tag) {
    console.log(`row selected for deletion: ${row}`)
    this.successMsg = null
    this.errorMsg = null

  //   const tags = this.db.list('/v2/tags')
  //   tags.remove(row.$key)
  //     .then(r => {
  //       console.log(`removing ${r}`)
  //       this.tagsFBSuccessMsg = 'Removed!'
  //       this.isEditingTagFormModel = false
  //     }).catch(e => {
  //       console.log(`error ${e}`)
  //       this.tagsFBErrorMsg = `error removing ${e}`
  //     })
  // }
  }
}

export class TagFormModel {

  constructor(
    public key?: string,
    public description?: string
  ){}

}
