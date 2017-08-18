import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsFormComponent } from './tags-form/tags-form.component';
import { FormsModule } from '@angular/forms';
import { TagsListCfgComponent } from './tags-list-cfg/tags-list-cfg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TagsFormComponent,
    TagsListCfgComponent
  ],
  exports: [
    TagsFormComponent,
    TagsListCfgComponent
  ],
})
export class TagsModule { }
