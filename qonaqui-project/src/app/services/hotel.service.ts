import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ISearchParams } from "../shared/search-params";

@Injectable({
  providedIn: "root",
})
export class HotelService {
  private apiUrl = "http://127.0.0.1:8000/booking/hotels/";
  private coordsSearchUrl = "http://127.0.0.1:8000/booking/search-by-coords/";
  private locationSearchUrl = "http://127.0.0.1:8000/booking/search-hotels/";

  constructor(private http: HttpClient) {}

  getAllHotels(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  searchHotelsByCoords(
    latitude: number,
    longitude: number,
    check_in: string,
    check_out: string
  ): Observable<any> {
    const params = new HttpParams()
      .set("latitude", latitude.toString())
      .set("longitude", longitude.toString())
      .set("check_in", check_in)
      .set("check_out", check_out);

    return this.http.get<any>(this.coordsSearchUrl, { params });
  }

  searchHotels(params: ISearchParams): Observable<any> {
    const httpParams = new HttpParams()
      .set("location", params.location)
      .set("check_in", params.check_in)
      .set("check_out", params.check_out)
      .set("guests", params.guests.toString());

    return this.http.get<any>(this.locationSearchUrl, { params: httpParams });
  }
}
