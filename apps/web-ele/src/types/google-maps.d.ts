declare global {
  interface Window {
    google?: {
      maps?: {
        Map?: any;
        Marker?: any;
        LatLng?: any;
        MapTypeId?: any;
        places?: {
          Autocomplete?: any;
        };
        Size?: any;
        Point?: any;
        InfoWindow?: any;
      };
    };
  }
}

export {}; 
