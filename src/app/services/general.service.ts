import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class GeneralService {
  url_api = 'http://localhost:64062/api/'; // TODO appsettings
  //url_api = 'http://23.253.173.64:5001/api/';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  /* POST Request */
  service_general_post(url, parametros): Observable<any> {
    this.setHeaders();
    return this.http.post(this.url_api + url, parametros, { headers: this.headers });
  }
  // --------------------------

  /* PUT Request */
  service_general_put(url, parametros): Observable<any> {
    this.setHeaders();
    return this.http.put(this.url_api + url, parametros, { headers: this.headers });
  }
  // --------------------------

  /* POST File Request */
  service_general_post_file(url, parametros): Observable<any> {
    this.setHeadersFile();
    return this.http.post<any>(this.url_api + url, parametros, { headers: this.headers });
  }
  // --------------------------

  /* DELETE Request */
  service_general_delete(url): Observable<any> {
    this.setHeaders();
    return this.http.delete(this.url_api + url, { headers: this.headers });
  }
  // --------------------------

  /* GET Request */
  service_general_get(url): Observable<any> {
    this.setHeaders();
    return this.http.get(this.url_api + url, { headers: this.headers });
  }
  // --------------------------

  setHeaders() {
    const localToken = localStorage.getItem('token');
    // console.log('localToken', localToken);

    // Set headers
    this.headers = new HttpHeaders(
      {
        'content-type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + localToken,
        'Accept': 'application/json'
      }
    );
  }

  isLogin() {
    //let responde: boolean = false;
    this.setHeaders();
    this.http.get(this.url_api + "islogged", { headers: this.headers }).subscribe((response: any) => {
      //console.log(response.success);
    },
      (err) => {
        //console.log(err.status)
        if (err.status == 401) {
          localStorage.removeItem('token');
        }
      }
    );
  }

  getToken() {
    this.isLogin();
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }

  setHeadersFile() {
    // console.log('setHeaders()');

    // Get token from local storage
    const localToken = localStorage.getItem('token');
    // console.log('localToken', localToken);

    // Set headers
    this.headers = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + localToken,
        'Accept': 'application/json'
      }
    );
  }
}
