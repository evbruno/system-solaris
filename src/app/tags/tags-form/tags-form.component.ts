import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'tags-form',
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.css']
})
export class TagsFormComponent implements OnInit {

  tagsFBErrorMsg: string
  tagsFBSuccessMsg: string

  tagFormModel: TagFormModel = new TagFormModel()
  isEditingTagFormModel: boolean = false

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  tagFormSubmitAction() {
    console.log(`tag form action : ${this.tagFormModel.key}`)
    this.tagsFBSuccessMsg = null
    this.tagsFBErrorMsg = null

    const tags = this.db.list('/v2/tags')

    tags.set(this.tagFormModel.key, this.tagFormModel.description)
      .then(r => {
        console.log(`saving ${r}`)
        this.tagsFBSuccessMsg = 'Saved!'
        this.isEditingTagFormModel = false
        this.tagFormModel = new TagFormModel()
      }).catch(e => {
        console.log(`error ${e}`)
        this.tagsFBErrorMsg = `error saving ${e}`
      })
  }

  tagFormCancelAction() {
    this.tagsFBSuccessMsg = null
    this.tagsFBErrorMsg = null
    this.tagFormModel = new TagFormModel()
    this.isEditingTagFormModel = false
  }

}

export class TagFormModel {
  constructor(
    public key?: string,
    public description?: string
  ) { }
}
