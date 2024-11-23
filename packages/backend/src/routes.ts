import { NextFunction, Request, Response, Router } from 'express';
import { ValidationError, Validator } from 'express-json-validator-middleware';
import rideController from './controllers/ride-controller';
import { rideRequestEstimateSchemaDto } from './controllers/dtos/ride-request-dto';

const { validate } = new Validator({});

const rideRoute = Router();

rideRoute.post(
  '/ride/estimate',
  validate({ body: rideRequestEstimateSchemaDto }),
  (req: Request, res: Response) => {
    rideController.estimate(req, res);
  },
);

rideRoute.use(
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
      res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: error.validationErrors.body?.map(
          (error) => error.message,
        ),
      });
      next();
    } else {
      next(error);
    }
  },
);

export default rideRoute;
