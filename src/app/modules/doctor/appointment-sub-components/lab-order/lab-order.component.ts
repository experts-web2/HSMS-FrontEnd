import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab-order',
  templateUrl: './lab-order.component.html',
  styleUrls: ['./lab-order.component.scss']
})
export class LabOrderComponent implements OnInit {
  tabs:any[] = [
    {
      id:"1",
      name:"Blood"
    },
    {
      id:"2",
      name:"Asitic FLuid"
    },
    {
      id:"3",
      name:"Scrap"
    },
    {
      id:"4",
      name:"Serum"
    },
    {
      id:"5",
      name:"Haematology"
    },
    {
      id:"6",
      name:"Montoux"
    },
    {
      id:"7",
      name:"CSF"
    },
    {
      id:"8",
      name:"Tissue"
    },
  ];

  testsList: any[] = [
    {
      categoryId:'1',
      tests:[
        {
          id: '3',
          name: 'Absolute Eosinophil Count'
        },
        {
          id: '17',
          name: 'Absolute Eosinphil Count'
        },
        {
          id: '21',
          name: 'AFB Stain (BLood)'
        },
        {
          id: '22',
          name: 'Agranulocyte Count'
        },
        {
          id: '2',
          name: 'APTT (Controll) (Blood)'
        },
      ]
    },
    {
      categoryId:'2',
      tests:[
        {
          id: '3',
          name: 'Absolute Eosinophil Count a'
        },
        {
          id: '17',
          name: 'Absolute Eosinphil Count a'
        },
        {
          id: '21',
          name: 'AFB Stain (BLood) a'
        },
        {
          id: '22',
          name: 'Agranulocyte Count a'
        },
        {
          id: '2',
          name: 'APTT (Controll) (Blood) a'
        },
      ]
    },
    {
      categoryId:'3',
      tests:[
        {
          id: '3',
          name: 'Absolute Eosinophil Count v'
        },
        {
          id: '17',
          name: 'Absolute Eosinphil Count v'
        },
        {
          id: '21',
          name: 'AFB Stain (BLood) v'
        },
        {
          id: '22',
          name: 'Agranulocyte Count v'
        },
        {
          id: '2',
          name: 'APTT (Controll) (Blood) v'
        },
      ]
    },
    {
      categoryId:'4',
      tests:[
        {
          id: '3',
          name: 'Absolute Eosinophil Count h'
        },
        {
          id: '17',
          name: 'Absolute Eosinphil Count h'
        },
        {
          id: '21', 
          name: 'AFB Stain (BLood) h'
        },
        {
          id: '22',
          name: 'Agranulocyte Count h'
        },
        {
          id: '2',
          name: 'APTT (Controll) (Blood) h'
        },
      ]
    },
    {
      categoryId:'5',
      tests:[
        {
          id: '3',
          name: 'Absolute Eosinophil Count y'
        },
        {
          id: '17',
          name: 'Absolute Eosinphil Count y'
        },
        {
          id: '21',
          name: 'AFB Stain (BLood) y'
        },
        {
          id: '22',
          name: 'Agranulocyte Count y'
        },
        {
          id: '2',
          name: 'APTT (Controll) (Blood) y'
        },
      ]
    },
  ];
  tabsToView: any[] = [];
  testsListToShow: any[] = [];

  constructor(){

  }

  ngOnInit(): void {
    this.transformForview();
  }

  transformForview(){
    this.tabsToView = this.tabs.map(x => {return {...x, active: false}});
    this.tabsToView[0].active = true;
    this.getVisibleTests(this.tabsToView[0].id);
  }

  active(id: string){
    this.tabsToView.map(x => {
      x.active = false
      if(x.id === id) x.active = true;
    });
    this.getVisibleTests(id);
  }
  
  getVisibleTests(categoryId : string){
    this.testsListToShow = this.testsList.find(x => x.categoryId === categoryId).tests;
  }

}

interface ILabtestCategories{
  id:string;
  name: string;  
}
