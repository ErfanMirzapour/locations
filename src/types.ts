export interface Coordination {
   lat: number;
   lng: number;
}

export interface Location {
   id?: number;
   coords: Coordination;
   name: string;
}
