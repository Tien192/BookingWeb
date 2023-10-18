import { Injectable } from "@angular/core";
import {
  ClientBookRoomOutputDto,
  GetInfoRoomToBookOutputDto,
  InfoBookingDto,
  PhongSearchinhFilterDto,
} from "../../shared/service-proxies/service-proxies";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BookingInfoService {
  //get, set thông tin tìm kiếm đặt phòng
  private inforBookingDtoSubject = new BehaviorSubject<
    PhongSearchinhFilterDto[]
  >([]);

  setBookingInfo(info: PhongSearchinhFilterDto[]): void {
    this.inforBookingDtoSubject.next(info);
  }
  getBookingInfo(): Observable<PhongSearchinhFilterDto[]> {
    return this.inforBookingDtoSubject.asObservable();
  }

  //get, set thông tin tìm kiếm đặt phòng
  private infoSearchingDtoSubject = new BehaviorSubject<InfoBookingDto>(
    undefined
  );

  setSearchBookingInfo(info: InfoBookingDto): void {
    this.infoSearchingDtoSubject.next(info);
  }
  getSearchBookingInfo(): Observable<InfoBookingDto> {
    return this.infoSearchingDtoSubject.asObservable();
  }

  // get, set thông tin người đặt
  private inforClientDtoSubject = new BehaviorSubject<ClientBookRoomOutputDto>(
    undefined
  );
  setClientInfo(info: ClientBookRoomOutputDto): void {
    this.inforClientDtoSubject.next(info);
  }
  getClientInfo(): Observable<ClientBookRoomOutputDto> {
    return this.inforClientDtoSubject.asObservable();
  }

  //get, set thông tin phòng được đặt
  private inforRoomDtoSubject = new BehaviorSubject<GetInfoRoomToBookOutputDto>(
    undefined
  );
  setRoomInfo(info: GetInfoRoomToBookOutputDto): void {
    this.inforRoomDtoSubject.next(info);
  }
  getRoomInfo(): Observable<GetInfoRoomToBookOutputDto> {
    return this.inforRoomDtoSubject.asObservable();
  }
}
