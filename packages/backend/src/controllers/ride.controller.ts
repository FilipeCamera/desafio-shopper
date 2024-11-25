import { Request, Response } from 'express';
import { Client } from '@googlemaps/google-maps-services-js';
import {
  RideEstimateResponseDto,
  RideConfirmResponseDto,
  RideDriverOptions,
} from './dtos/ride.response.dto';
import DriverService from '../services/driver.service';
import { GOOGLE_API_KEY } from '../config/constants';
import TripHistoryService from '../services/trip-history.service';
import TripHistory from '../entities/trip-history';
import Customer from '../entities/customer';
import CustomerService from '../services/customer.service';

class RideController {
  private readonly driverService;
  private readonly tripHistoryService;
  private readonly customerService;

  constructor() {
    this.driverService = new DriverService();
    this.tripHistoryService = new TripHistoryService();
    this.customerService = new CustomerService();
  }
  async estimate(req: Request, res: Response) {
    try {
      const { customer_id, origin, destination } = req.body;

      const client = new Client({});

      const customer = await this.customerService.find(customer_id);

      if (!customer) {
        return res
          .status(404)
          .json({
            error_code: 'CUSTOMER_NOT_FOUND',
            error_description: 'Customer not found',
          });
      }

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

      const distanceMatrix = await client.distancematrix({
        params: {
          origins: [originCoordinate],
          destinations: [destinationCoordinate],
          key: GOOGLE_API_KEY,
        },
      });

      const distance = distanceMatrix.data.rows[0].elements[0].distance;

      const drivers = await this.driverService.calculateValues(
        distance.value / 1000,
      );

      let optionsDrivers: RideDriverOptions[] = [];

      if (drivers !== null && drivers!.length > 0) {
        optionsDrivers = drivers.map((driver) => ({
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.car,
          review: {
            rating: driver.rate,
            comment: driver.rateDescription,
          },
          value: driver.value,
        }));
      }

      const result: RideEstimateResponseDto = {
        origin: {
          latitude: originCoordinate.lat,
          longitude: originCoordinate.lng,
        },
        destination: {
          latitude: destinationCoordinate.lat,
          longitude: destinationCoordinate.lng,
        },
        duration: distanceMatrix.data.rows[0].elements[0].duration.text,
        distance: distance.value / 1000,
        options: optionsDrivers,
        routeResponse: {},
      };
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json();
    }
  }

  async confirm(req: Request, res: Response) {
    try {
      const {
        customer_id,
        origin,
        destination,
        distance,
        duration,
        driver: driverBody,
        value,
      } = req.body;

      const customer = await this.customerService.find(customer_id);

      if (!customer) {
        return res.status(404).json({
          error_code: 'CUSTOMER_NOT_FOUND',
          error_description: 'Customer not found',
        });
      }

      const driver = await this.driverService.findDriver(driverBody.id);

      if (!driver)
        return res.status(404).json({
          error_code: 'DRIVER_NOT_FOUND',
          error_description: 'Driver not found',
        });

      if (distance < driver.minimumKm) {
        return res.status(406).json({
          error_code: 'INVALID_DISTANCE',
          error_description: 'Invalid mileage for driver',
        });
      }

      const tripHistory = TripHistory.create({
        customer,
        origin,
        destination,
        distance,
        duration,
        date: Date.now().toString(),
        driver,
        value,
      });

      const tripHistoryCreated =
        await this.tripHistoryService.create(tripHistory);

      if (!tripHistoryCreated) {
        return res.status(500).json();
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json();
    }
  }

  async history(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { driver_id } = req.query;

      const tripHistories = await this.tripHistoryService.find(
        Number(id),
        Number(driver_id),
      );

      if (!tripHistories || tripHistories.length === 0) {
        return res.status(404).json({
          error_code: 'NO_RIDES_FOUND',
          error_description: 'Rides not found',
        });
      }

      const result = {
        customer_id: id,
        rides: tripHistories,
      };
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  }
}

const rideController = new RideController();

export default rideController;
