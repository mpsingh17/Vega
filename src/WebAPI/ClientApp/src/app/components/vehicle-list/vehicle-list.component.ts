import { Component, OnInit } from '@angular/core';
import { Vehicle, KeyValuePair } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {
    pageSize: 3
  };
  columns = [
    { title: "Id" },
    { title: "Make", key: "make", isSortable: true },
    { title: "Model", key: "model", isSortable: true },
    { title: "Contact Name", key: "contactName", isSortable: true },
    { title: "Contact Email", key: "contactEmail", isSortable: true },
  ];

  constructor(
    private vehicleService: VehicleService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.vehicleService.getMakes()
    .subscribe(m => this.makes = m);

    this.populateVehicles();
  }

  private populateVehicles() {
    let token = this.authService.authorizationHeaderValue;
    this.vehicleService.getVehicles(this.filter, token)
    .subscribe(vl => this.vehicles = vl);
  }

  onFilterChange() {
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }

  sortBy(columnName) {
    this.filter.sortBy = columnName;
    this.filter.isSortAsc = !(this.filter.isSortAsc);
    
    this.populateVehicles();
  }

  onPageChange(page) {
    this.filter.page = page;
    this.populateVehicles();
  }
}
