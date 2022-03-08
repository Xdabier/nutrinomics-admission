import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
	declarations: [HomePageComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}
