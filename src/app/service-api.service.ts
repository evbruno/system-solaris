import { Injectable } from '@angular/core';
import { Account, Category, Tag } from './models';
import { Observable } from 'rxjs/Observable';
import { DATASET } from './dataset-module';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Promise, Promise_Instance, Thenable } from 'firebase';

export interface ServiceAPI {

  allTags(): Observable<Array<Tag>>
  //remove(tag: Tag): Promise_Instance<Tag>
  save(key: string, description: string): Thenable<void>

}

///// Memory

@Injectable()
export class MemoryAPI implements ServiceAPI {

  private tags = new Array<Tag>()

  constructor() {
    this.tags = this.extractTags()
  }


  allTags(): Observable<Array<Tag>> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.tags)
      }, 3000);
    })
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

  save(key: string, description: string): Thenable<void> {
    let tag = new Tag
    tag.$key = key
    tag.description = description
    this.tags.push(tag)
    return Promise.resolve(null)
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
        let tag = new Tag
        tag.$key = raw.$key
        tag.description = raw.$value
        return tag
    })
  }

  save(key: string, description: string): Thenable<void> {
    return Promise.resolve(null)
  }

}

@Injectable()
export class ServiceAPIStrategy {

  constructor(
    private mem: MemoryAPI,
    private fb: FirebaseAPI
  ){}

  impl(): ServiceAPI {
    return this.fb
  }
}
