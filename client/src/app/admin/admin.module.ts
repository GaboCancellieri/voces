import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeAR from '@angular/common/locales/es-AR';

registerLocaleData(localeAR);

import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './login/login.component';
import { NavigationComponent } from './layout/navigation.component';
import { InstitucionalAdminComponent } from './pages/institucional/institucional.component';
import { AreasAdminComponent } from './pages/areas/areas.component';
import { ActividadesAdminComponent } from './pages/actividades/actividades.component';
import { GaleriaAdminComponent } from './pages/galeria/galeria.component';
import { StreamingAdminComponent } from './pages/streaming/streaming.component';
import { ShowDetalleAdminComponent } from './pages/streaming/show-detalle/show-detalle.component';
import { ContactoAdminComponent } from './pages/contacto/contacto.component';

// NGPRIME
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    TabMenuModule,
    ToastModule,
    InputTextareaModule,
    EditorModule,
    PanelModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    CardModule,
    ConfirmDialogModule,
    InputNumberModule,
    CalendarModule,
    TooltipModule,
    DialogModule,
    DropdownModule,
  ],
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    NavigationComponent,
    InstitucionalAdminComponent,
    AreasAdminComponent,
    ActividadesAdminComponent,
    GaleriaAdminComponent,
    StreamingAdminComponent,
    ContactoAdminComponent,
    ShowDetalleAdminComponent,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-AR'}, MessageService, ConfirmationService, ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
