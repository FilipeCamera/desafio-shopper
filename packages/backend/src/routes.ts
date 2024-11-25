import { NextFunction, Request, Response, Router } from 'express';
import { ValidationError, Validator } from 'express-json-validator-middleware';
import rideController from './controllers/ride.controller';
import {
  rideRequestConfirmSchemaDto,
  rideRequestEstimateSchemaDto,
} from './controllers/dtos/ride.request.dto';
import { customerCreateSchemaDto } from './controllers/dtos/customer.request.dto';
import customerController from './controllers/customer.controller';

const { validate } = new Validator({});

const rideRoute = Router();
const customerRoute = Router();

rideRoute.post(
  '/ride/estimate',
  validate({ body: rideRequestEstimateSchemaDto }),
  (req: Request, res: Response) => {
    rideController.estimate(req, res);
  },
);

rideRoute.post(
  '/ride/confirm',
  validate({ body: rideRequestConfirmSchemaDto }),
  (req: Request, res: Response) => {
    rideController.confirm(req, res);
  },
);

rideRoute.get('/ride/:id', validate({}), (req: Request, res: Response) => {
  rideController.history(req, res);
});

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

customerRoute.post(
  '/customer/create',
  validate({ body: customerCreateSchemaDto }),
  (req: Request, res: Response) => {
    customerController.create(req, res);
  },
);

customerRoute.use(
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

export { rideRoute, customerRoute };
