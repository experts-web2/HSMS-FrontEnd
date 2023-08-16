import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { TreeSelectModule } from 'primeng/treeselect';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { PanelModule } from 'primeng/panel';
import { AutoFocusModule } from 'primeng/autofocus';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { FileUploadModule } from 'primeng/fileupload';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MessageModule,
    MessagesModule,
    ToastModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    CheckboxModule,
    DialogModule,
    TableModule,
    MenuModule,
    MenubarModule,
    MegaMenuModule,
    TabMenuModule,
    TabViewModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    PaginatorModule,
    ButtonModule,
    TreeSelectModule,
    CalendarModule,
    AutoCompleteModule,
    PanelMenuModule,
    MultiSelectModule,
    TagModule,
    ProgressBarModule,
    PanelModule,
    AutoFocusModule,
    ProgressSpinnerModule,
    FileUploadModule,
    AccordionModule
  ],
  providers: [MessageService],
})
export class PrimeNgModule implements OnInit {
  constructor(private primeNgConfig: PrimeNGConfig) {}
  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }
}
