import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Account, Category, Tag } from './models';
import { Observable } from 'rxjs/Observable';
import { DATASET } from './dataset-module';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Promise, Promise_Instance, Thenable } from 'firebase';

export interface ServiceAPI {

  allTags(): Observable<Array<Tag>>
  remove(tag: Tag): firebase.Promise<void>
  save(tag: Tag): firebase.Promise<void>

}

///// Memory

@Injectable()
export class MemoryAPI implements ServiceAPI {

  private tagsCache : Array<Tag>
  private tags : Subject<Array<Tag>>

  constructor() {
    this.tagsCache = this.extractTags()
    this.tags =  new Subject<Array<Tag>>()
  }


  allTags(): Observable<Array<Tag>> {
    setTimeout(() => {
      this.tags.next(this.tagsCache)
    }, 3000)

    return this.tags
  }

  private extractTags() : Array<Tag> {
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

  save(tag: Tag): firebase.Promise<void> {

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {

        // fake error
        if (tag.$key == 'kill')
          reject(new Error('Crussh! Kill! Destroy !'))
        else {
          // always push... I dont care !
          this.tagsCache.push(tag)
          this.tags.next(this.tagsCache)
          resolve(null)
        }

      }, 5000)
    })
  }

  remove(tag: Tag): firebase.Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        let idx = this.tagsCache.indexOf(tag)
        if (idx >= 0)
          this.tagsCache.splice(idx, 1)

        this.tags.next(this.tagsCache)

        resolve
      }, 3000)
    })

  }
}

//// Firebase

@Injectable()
export class FirebaseAPI implements ServiceAPI {

  constructor(private db: AngularFireDatabase) { }

  allTags(): Observable<Tag[]> {
    return this.db.list('/v2/tags').map(this.mapTagList)
  }

  private mapTagList(rawTags: Array<any>): Array<Tag> {
    return rawTags.map(raw => {
      return new Tag(raw)
    })
  }

  save(tag: Tag): firebase.Promise<void> {
    return this.db.list('/v2/tags').set(tag.$key, tag.description)
  }

  remove(tag: Tag): firebase.Promise<void> {
    return this.db.list('/v2/tags').remove(tag.$key)
  }

}

@Injectable()
export class ServiceAPIStrategy {

  constructor(
    private mem: MemoryAPI,
    private fb: FirebaseAPI
  ){}

  impl(): ServiceAPI {
    return this.mem
  }
}
