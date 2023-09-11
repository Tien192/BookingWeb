import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientJsonpModule } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { NgxPaginationModule } from "ngx-pagination";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SidebarComponent } from "./layout/sidebar.component";
import { SidebarMenuComponent } from "./layout/sidebar-menu.component";
import { SidebarUserPanelComponent } from "./layout/sidebar-user-panel.component";
import { SidebarLogoComponent } from "./layout/sidebar-logo.component";
import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { SharedModule } from "@shared/shared.module";
import { HomeComponent } from "@app/home/home.component";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from "primeng/tabview";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { CheckboxModule } from "primeng/checkbox";
import { AnimateModule } from "primeng/animate";
import { ToastModule } from "primeng/toast";
import { RatingModule } from "primeng/rating";
import { SliderModule } from "primeng/slider";
import { TableModule } from "primeng/table";
import { PaginatorModule } from "primeng/paginator";
import { ChartModule } from "primeng/chart";
import { GMapModule } from "primeng/gmap";
import { InputTextareaModule } from "primeng/inputtextarea";

// tenants
import { TenantsComponent } from "@app/tenants/tenants.component";
import { CreateTenantDialogComponent } from "./tenants/create-tenant/create-tenant-dialog.component";
import { EditTenantDialogComponent } from "./tenants/edit-tenant/edit-tenant-dialog.component";
// roles
import { RolesComponent } from "@app/roles/roles.component";
import { CreateRoleDialogComponent } from "./roles/create-role/create-role-dialog.component";
import { EditRoleDialogComponent } from "./roles/edit-role/edit-role-dialog.component";
// users
import { UsersComponent } from "@app/users/users.component";
import { CreateUserDialogComponent } from "@app/users/create-user/create-user-dialog.component";
import { EditUserDialogComponent } from "@app/users/edit-user/edit-user-dialog.component";
import { ChangePasswordComponent } from "./users/change-password/change-password.component";
import { ResetPasswordDialogComponent } from "./users/reset-password/reset-password.component";
// layout
import { HeaderComponent } from "./layout/header.component";
import { HeaderLeftNavbarComponent } from "./layout/header-left-navbar.component";
import { HeaderLanguageMenuComponent } from "./layout/header-language-menu.component";
import { HeaderUserMenuComponent } from "./layout/header-user-menu.component";
import { FooterComponent } from "./layout/footer.component";
import { TrangchuComponent } from "./trangchu/trangchu.component";
import { KhachsanListComponent } from "./khachsan/khachsan-list/khachsan-list.component";
import { DiadiemComponent } from "./diadiem/diadiem.component";
import { LuutruComponent } from "./luutru/luutru.component";
import { SliderloaichonghiComponent } from "./luutru/slider/sliderloaichonghi/sliderloaichonghi.component";
import { SliderdiadiemComponent } from "./luutru/slider/sliderdiadiem/sliderdiadiem.component";
import { ChonghinoibatComponent } from "./luutru/chonghinoibat/chonghinoibat.component";
import { SliderchonghinoibatComponent } from "./luutru/slider/sliderchonghinoibat/sliderchonghinoibat.component";
import { LienheComponent } from "./luutru/lienhe/lienhe.component";
import { RadioButtonModule } from "primeng/radiobutton";
import { KhachsanDetailComponent } from "./khachsan/khachsan-detail/khachsan-detail.component";
import { KhachsanStartComponent } from "./khachsan/khachsan-start/khachsan-start.component";
import { ThongtinlienheComponent } from "./formthongtinlienhe/thongtinlienhe/thongtinlienhe.component";
import { ThongtinlienheStartComponent } from "./formthongtinlienhe/thongtinlienhe-start/thongtinlienhe-start.component";
import {
  ChinhSachChungServiceProxy,
  LienHeServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { XacnhandatComponent } from "./formthongtinlienhe/xacnhandat/xacnhandat.component";
import { MessageService } from "primeng/api";
import { TimerComponent } from "./luutru/timer/timer.component";
import { MapComponent } from "./sharedcomponent/map/map.component";
import { FormtaokhachsanComponent } from "./admin/formtaokhachsan/formtaokhachsan.component";
import { HotrokhachhangComponent } from "./sharedcomponent/chatboxlive/hotrokhachhang/hotrokhachhang.component";
import { HotrokhachhangStartComponent } from "./sharedcomponent/chatboxlive/hotrokhachhang-start/hotrokhachhang-start.component";
import { FloatingbuttonComponent } from "./luutru/floatingbutton/floatingbutton.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrangchuComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarMenuComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    TrangchuComponent,
    KhachsanListComponent,
    DiadiemComponent,
    LuutruComponent,
    SliderloaichonghiComponent,
    SliderdiadiemComponent,
    ChonghinoibatComponent,
    SliderchonghinoibatComponent,
    LienheComponent,
    KhachsanDetailComponent,
    KhachsanStartComponent,
    ThongtinlienheComponent,
    ThongtinlienheStartComponent,
    XacnhandatComponent,
    TimerComponent,
    MapComponent,
    FormtaokhachsanComponent,
    HotrokhachhangComponent,
    HotrokhachhangStartComponent,
    FloatingbuttonComponent,
  ],
  // AgmCoreModule.forRoot({
  //   apiKey: 'AIzaSyA3jd636bBrRo6a8IZ5LnHtKpjE1aFnmQM'
  // })
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    ButtonModule,
    TabViewModule,
    AutoCompleteModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    AnimateModule,
    ToastModule,
    RatingModule,
    RadioButtonModule,
    SliderModule,
    TableModule,
    PaginatorModule,
    ChartModule,
    GMapModule,
    InputTextareaModule,
    // PaginatorModule,
  ],
  providers: [
    LienHeServiceProxy,
    ChinhSachChungServiceProxy,
    DatePipe,
    MessageService,
  ],
})
export class AppModule {}
