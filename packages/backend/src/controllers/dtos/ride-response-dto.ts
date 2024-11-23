type RideDriverOptions = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
};

type RideEstimateResponseDto = {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: RideDriverOptions[];
  routeResponse: any;
};

type RideConfirmResponseDto = {};

export { RideEstimateResponseDto, RideConfirmResponseDto };
