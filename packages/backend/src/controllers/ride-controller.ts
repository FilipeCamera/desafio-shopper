import { Request, Response } from 'express';
import { Client } from '@googlemaps/google-maps-services-js';
import {
  RideEstimateResponseDto,
  RideConfirmResponseDto,
} from './dtos/ride-response-dto';
import { GOOGLE_API_KEY } from '../config/constants';

class RideController {
  async estimate(req: Request, res: Response) {
    try {
      const { customer_id, origin, destination } = req.body;

      const client = new Client({});

      const originGeocode = await client.geocode({
        params: {
          address: origin,
          key: GOOGLE_API_KEY,
        },
      });

      const destinationGeocode = await client.geocode({
        params: {
          address: destination,
          key: GOOGLE_API_KEY,
        },
      });

      const originCoordinate = originGeocode.data.results[0].geometry.location;
      const destinationCoordinate =
        destinationGeocode.data.results[0].geometry.location;

      const distance = await client.distancematrix({
        params: {
          origins: [originCoordinate],
          destinations: [destinationCoordinate],
          key: GOOGLE_API_KEY,
        },
      });

      const result = {
        origin: {
          address: origin,
          coordinates: originCoordinate,
        },
        destination: {
          address: destination,
          coordinates: destinationCoordinate,
        },
        distance: distance.data.rows[0].elements[0].distance,
        duration: distance.data.rows[0].elements[0].duration,
      };
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json();
    }
  }

  async confirm(req: Request, res: Response) {
    return {};
  }
}

const rideController = new RideController();

export default rideController;
