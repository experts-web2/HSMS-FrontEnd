import { Component, OnInit, OnChanges } from '@angular/core';
import { FiltersMatchModes } from 'src/app/constants/enums/FilterMatchModes';
import { FiltersOperators } from 'src/app/constants/enums/FilterOperators';
import { StringComparison } from 'src/app/constants/enums/StringComparison';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IMedicine } from 'src/app/models/interfaces/Medicine';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { MedicineBrandService, MedicineService } from 'src/app/services';

@Component({
  selector: 'app-pharmacy-reporting',
  templateUrl: './pharmacy-reporting.component.html',
  styleUrls: ['./pharmacy-reporting.component.scss']
})
export class PharmacyReportingComponent implements OnInit {
  rangeDates!: Date[];
  records: any [] = [];
  medicineList!: Array<IMedicine>;
  brandsList!: Array<IDropDown>;
  brandsListToShow!: Array<IDropDown>;
  reportTypes: Array<{typeName: string, typeId: number}> = [
    {typeName: 'Purchase', typeId: 1},
    {typeName: 'Sale', typeId: 2},
    {typeName: 'Stock', typeId: 3},
    {typeName: 'Expired', typeId: 4},
    {typeName: 'Unexpired', typeId: 5}
  ];

  tableColumns: Array<ITableColumns> = [
    {name: 'Medicine Name', property: 'name'},
    {name: 'Date', property: 'date'},
    {name: 'Qty', property: 'quantity'},
    {name: 'Medicine Name', property: 'name'},
    {name: 'Medicine Name', property: 'name'},
    {name: 'Medicine Name', property: 'name'},
    {name: 'Medicine Name', property: 'name'},
  ]

  filter: {startDate?: Date, endDate?: Date, filterType?: number, brandId?: string, medicineId?: string} = {}

  constructor(private readonly medicineBrandServic: MedicineBrandService, private readonly medicineService: MedicineService){

  }

  ngOnInit(): void {
    this.getBrands();
  }

  getMedicine(queryString: string){
    let query: IFetchRequest ={
      pagedListRequest: {
        pageNo: 1,
        pageSize: 100
      },
      queryOptionsRequest:{
        filtersRequest:[
          {
            field: 'Name',
            matchMode: FiltersMatchModes.Contains,
            operator: FiltersOperators.And,
            value: queryString
          }
        ]
      }
    } 

    this.medicineService.getMedicine(query).subscribe({
      next: (x) => {
        console.log(x);
        this.medicineList = x.data
      }
    })
  }

  getBrands(){
    this.medicineBrandServic.getBrandsDropDown().subscribe({
      next:(x)=> {
        console.log(x);
        
        this.brandsList = x;
        this.brandsListToShow = x;
        
      }
    })
  }

  onStartDateSelect(event: any){
    let filterStartDate;
     console.log(typeof(event));
     
    console.log(event);
    
  }

  onSearchBrands(event: any){
    console.log(event.query);
    this.brandsListToShow = this.brandsList.filter(x => x.name.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()));
    
  }

  onMedicineSelection(medicineId: string){
    console.log(medicineId);
    
  }

  onSearchMedicine(event: any){
    console.log(event.query);
    if(event.query.length > 2){
      this.getMedicine(event.query)
    }
    
  }
  onEndDateSelect(event: any){
    console.log(event); 
    
  }
}
