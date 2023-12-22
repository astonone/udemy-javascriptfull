import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IFoodDeliveryController } from './food-delivery/controller/food-delivery.controller.interface';
import { IConfigService } from './config/config.service.interface';
import cors from 'cors';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;
	corsOptions = {
		origin:'*',
		credentials:true,
		optionSuccessStatus:200
	}
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.FoodDeliveryController) private foodDeliveryController: IFoodDeliveryController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(express.json());
	}

	useRoutes(): void {
		this.app.use('/food-delivery', this.foodDeliveryController.router);
	}

	useExceptionFilter(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.app.use(cors(this.corsOptions));
		this.app.options('*', cors(this.corsOptions))
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started on http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
