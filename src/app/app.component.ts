import { AgmMarker } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { } from "googlemaps";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  agmZoom: any;
  ngOnInit(): void {
    console.log("Hello there");   //printing hello to console
    console.log(this.latlng);     //printing the values from the latlng array
    this.getLatLngCenter(this.latLngInDegr);    //printing the centre from method 1
    this.GetCenterFromDegrees(this.data);       // printing the centre coordinates from method 2
    this.resetMap();
  }

  //start_end_mark = [];

  latlng = [

    [
      51.678418,
      7.809007
    ],
    [
      19.076090,
      72.877426
    ],
    [
      17.387140,
      78.491684
    ]
  ];


  title = 'gmap-project';
  //hamm,germany
  latitude1 = 51.678418;
  longitude1 = 7.809007;
  //hyderabad
  latitude2 = 17.387140;
  longitude2 = 78.491684;
  //mumbai
  latitude3 = 19.076090;
  longitude3 = 72.877426;
  //vishakapatnam
  latitude4 = 17.686815;
  longitude4 = 83.218483;
  //chennai
  latitude5 = 13.067439;
  longitude5 = 80.237617;
  //delhi
  latitude6 = 28.644800;
  longitude6 = 77.216721;
  //jaipur
  latitude7 = 26.922070;
  longitude7 = 75.778885;
  //vijayawada
  latitude8 = 16.515099;
  longitude8 = 80.632095;
  //pune
  latitude9 = 18.516726;
  longitude9 = 73.856255;
  //cologne,germany
  latitude10 = 50.935173;
  longitude10 = 6.953101;
  //Berlin , germany
  latitude11 = 52.520008;
  longitude11 = 13.404954;


  latitude12 = 58.083333;
  longitude12 = 1.1;

  latitude13 = 44.714464;
  longitude13 = -63.60496;

  latitude14 = 51.3988985;
  longitude14 = 64.70496;


  //the centre of mumbai and hamm
  latitude15 = 39.47;
  longitude15 = 46.78;

  //************************************************************************************************
  //first menthod for finding the centre
  /**
 * Get a center latitude,longitude from an array of like geopoints
 *
 * @param array data 2 dimensional array of latitudes and longitudes
 * For Example:
 * $data = array
 * (
 *   0 = > array(45.849382, 76.322333),
 *   1 = > array(45.843543, 75.324143),
 *   2 = > array(45.765744, 76.543223),
 *   3 = > array(45.784234, 74.542335)
 * );
*/

  data = [

    [
      51.678418,
      7.809007
    ],
    [
      19.076090,
      72.877426
    ],
  ];


  GetCenterFromDegrees(data: string | any[]) {
    if (!(data.length > 0)) {
      return false;
    }

    var num_coords = data.length;

    var X = 0.0;
    var Y = 0.0;
    var Z = 0.0;
    let i = 0;
    for (i = 0; i < data.length; i++) {
      var lat = data[i][0] * Math.PI / 180;
      var lon = data[i][1] * Math.PI / 180;

      var a = Math.cos(lat) * Math.cos(lon);
      var b = Math.cos(lat) * Math.sin(lon);
      var c = Math.sin(lat);

      X += a;
      Y += b;
      Z += c;
    }

    X /= num_coords;
    Y /= num_coords;
    Z /= num_coords;

    var lon = Math.atan2(Y, X);
    var hyp = Math.sqrt(X * X + Y * Y);
    var lat = Math.atan2(Z, hyp);

    var newX = (lat * 180 / Math.PI);
    var newY = (lon * 180 / Math.PI);
    console.log(newX, newY);
    return new Array(newX, newY);
  }

  //********************************************************************************

  //Second method for finding the centre

  rad2degr(rad: number) { return rad * 180 / Math.PI; }
  degr2rad(degr: number) { return degr * Math.PI / 180; }

  /**
   * @param latLngInDeg array of arrays with latitude and longtitude
   *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
   *   [longtitude2] ...]
   *
   * @return array with the center latitude longtitude pairs in 
   *   degrees.
   */
  latLngInDegr = [

    [
      51,
      7
    ],
    [
      19,
      72
    ],

  ];


  getLatLngCenter(latLngInDegr: string | any[]) {
    var LATIDX = 0;
    var LNGIDX = 1;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i = 0; i < latLngInDegr.length; i++) {
      var lat = this.degr2rad(latLngInDegr[i][LATIDX]);
      var lng = this.degr2rad(latLngInDegr[i][LNGIDX]);
      // sum of cartesian coordinates
      sumX += Math.cos(lat) * Math.cos(lng);
      sumY += Math.cos(lat) * Math.sin(lng);
      sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);
    console.log(this.rad2degr(lat), this.rad2degr(lng))
    return ([this.rad2degr(lat), this.rad2degr(lng)]);
  }


  //resetting maps centre to the centre value of the coordinates manually
  resetMap() {

    let newCenter = {
      latitude: 39.47209660776305,
      longitude: 46.78922325944267,
    };
    let initZoom = this.agmZoom;
    this.agmZoom = this.agmZoom + 4;
    this.agmZoom = this.agmZoom - initZoom + 0.1;
    //centre should be the centre of both the start and end

    if (this.map) {
      this.map.setCenter(newCenter);
    }
  }


  onChoseLocation(event: any) {
    console.log(event);

  }


}

