import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
      },
      error => {
        reject(error);
      });
    });
  }

  getRandomPoint(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        // 200 mts en grados = 0,238
        const mts = 0.00238;
        let dLat = Math.random() * (mts * 2) - mts;
        let dLng = Math.random() * (mts * 2) - mts;
        resolve({lng: resp.coords.longitude + dLng, lat: resp.coords.latitude + dLat});
      },
      error => {
        reject(error);
      });
    });
  }

}
