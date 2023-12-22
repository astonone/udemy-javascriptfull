import { NextFunction, Request, Response, Router } from 'express';

export interface IFoodDeliveryController {
	readonly router: Router;
	contactUs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
