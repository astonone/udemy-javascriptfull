import { BaseController } from '../../common/controller/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import { IFoodDeliveryController } from './food-delivery.controller.interface';
import { UserDto } from '../dto/user.dto';
import { ValidateMiddleware } from '../../common/middleware/validate.middleware';
import { IConfigService } from '../../config/config.service.interface';
import { FoodDeliveryService } from '../service/food-delivery.service';
import { MenuItemDto } from '../dto/menu-item.dto';

@injectable()
export class FoodDeliveryController extends BaseController implements IFoodDeliveryController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.FoodDeliveryService) private foodDeliveryService: FoodDeliveryService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/contact-us',
				method: 'post',
				func: this.contactUs,
				middlewares: [new ValidateMiddleware(UserDto)],
			},
			{
				path: '/menu',
				method: 'get',
				func: this.menu,
			},
		]);
	}

	async contactUs(req: Request, res: Response, next: NextFunction): Promise<void> {
		//await new Promise((resolve) => setTimeout(resolve, 3000));
		const userRequest: UserDto = req.body;
		await this.foodDeliveryService.request(userRequest);
		this.ok(res, { message: 'success' });
	}

	async menu(req: Request, res: Response, next: NextFunction): Promise<void> {
		const menu: MenuItemDto[] = await this.foodDeliveryService.getMenu();
		this.ok(res, menu);
	}
}
