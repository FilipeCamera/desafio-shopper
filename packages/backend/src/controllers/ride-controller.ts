import { Request, Response } from 'express';
import {
  RideEstimateResponseDto,
  RideConfirmResponseDto,
} from './dtos/ride-response-dto';

class RideController {
  async estimate(req: Request, res: Response) {
    return {};
  }

  async confirm(req: Request, res: Response) {
    return {};
  }
}

const rideController = new RideController();

export default rideController;
