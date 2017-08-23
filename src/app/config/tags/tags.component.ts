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
  isFormSubmiting = false

  updateAt: Date

  constructor(private api: ServiceAPIStrategy) {
    this.tags = this.api.impl().allTags()
    this.tags.subscribe(_x => {
      this.tagsAreLoading = false
      this.updateAt = new Date()
    })
  }

  ngOnInit() {

  }

  tagFormModel: TagFormModel = new TagFormModel()
  isEditingTagFormModel: boolean = false

  tagFormSubmitAction() {
    console.log(`tag form action : ${this.tagFormModel}`)
    this.successMsg = null
    this.errorMsg = null
    this.isFormSubmiting = true

    let tag = new Tag()
    tag.$key = this.tagFormModel.key
    tag.description = this.tagFormModel.description

    this.api.impl().save(tag)
      .then(r => {
        console.log(`saving ${r}`)
        this.successMsg = 'Saved!'
        this.isEditingTagFormModel = false
        this.isFormSubmiting = false
        this.tagFormModel = new TagFormModel()
      }).catch(e => {
        console.log(`error ${e}`)
        this.errorMsg = `error saving ${e}`
        this.isFormSubmiting = false
      })
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
    this.tagFormModel = new TagFormModel(row.$key, row.description as string)
  }

  tagFormDeleteRow(row: Tag) {
    console.log(`row selected for deletion: ${row}`)
    this.successMsg = null
    this.errorMsg = null
    this.isFormSubmiting = true

    this.api.impl().remove(row)
      .then(r => {
        console.log(`removing ${r}`)
        this.successMsg = 'Removed!'
        this.isEditingTagFormModel = false
        this.isFormSubmiting = false
      }).catch(e => {
        console.log(`error ${e}`)
        this.errorMsg = `error removing ${e}`
        this.isFormSubmiting = false
      })
  }
}

export class TagFormModel {

  constructor(
    public key?: string,
    public description?: string
  ){}

}
