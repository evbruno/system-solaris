import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'tags-list',
  templateUrl: './tags-list-cfg.component.html',
  styleUrls: ['./tags-list-cfg.component.css']
})
export class TagsListCfgComponent implements OnInit {

  @Output() tagsSuccessMsgEvt: EventEmitter<any> = new EventEmitter()
  @Output() tagsErrorMsgEvt: EventEmitter<any> = new EventEmitter()

  tagsFB: FirebaseListObservable<any[]>

  tagsSUB: Observable<Tag[]>


  constructor(private db: AngularFireDatabase) {
    this.tagsFB = db.list('/v2/tags')

    // let pusher: any
    // this.tagsSUB = new Observable(obs => {
    //   pusher = obs
    // })

    this.tagsSUB = Observable.from([])

    this.tagsFB
      .map(this.mapTagList)
      .subscribe(
        (list: Array<Tag>) => {
          console.log(list)
          //pusher.next(list)
          //this.tagsFBErrorMsg = null
        },
        (err: any) => {
          console.log(`Error accessing firebase : ${err}`)
          //this.tagsFBErrorMsg = err
        }
      )

    this.tagsFB
      .flatMap(this.mapp)
      .subscribe(
        (list:any) => {
          console.log(list)
        }
      )
  }

  ngOnInit() {
  }

  tagFormSelectRow(row) {
    // this.isEditingTagFormModel = true
    console.log(`row selected: ${row}`)
    // this.tagFormModel = new TagFormModel(row.$key, row.$value)

    //this.tagsErrorMsgEvt.emit(`Selected ${row.$key}`)
  }

  tagFormDeleteRow(row) {
    console.log(`row selected for deletion: ${row}`)
    // this.tagsFBSuccessMsg = null
    // this.tagsFBErrorMsg = null

    // const tags = this.db.list('/v2/tags')
    // tags.remove(row.$key)
    //   .then(r => {
    //     console.log(`removing ${r}`)
    //     this.tagsFBSuccessMsg = 'Removed!'
    //     this.isEditingTagFormModel = false
    //   }).catch(e => {
    //     console.log(`error ${e}`)
    //     this.tagsFBErrorMsg = `error removing ${e}`
    //   })
    this.tagsErrorMsgEvt.emit(`Deleted ${row.$key}`)
  }

  mapp(x) {
    console.log(x)
    return x
  }

  mapTagList(rawTags: Array<any>) {
    return rawTags.map(raw => {
        let tag = new Tag
        tag.$key = raw.$key
        tag.description = raw.$value
        return tag
    })
  }

}

export abstract class DataEntity {
  $key: string
  description: string
}

export class Tag extends DataEntity {
}
