import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IFoodDeliveryController } from './food-delivery/controller/food-delivery.controller.interface';
import { IConfigService } from './config/config.service.interface';
import cors from 'cors';
import { JsonDbService } from './database/JsonDbService';
import { DataError } from 'node-json-db';
import { MenuItemDto } from './food-delivery/dto/menu-item.dto';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;
	corsOptions = {
		origin: '*',
		credentials: true,
		optionSuccessStatus: 200,
	};
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.FoodDeliveryController) private foodDeliveryController: IFoodDeliveryController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.JsonDbService) private jsonDbService: JsonDbService,
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

	async initJsonDbData(): Promise<void> {
		try {
			const data = await this.jsonDbService.getDb().getData('/menu');
			this.logger.log('[App] initJsonDbData() successfully loaded initial data: ', data);
		} catch (error) {
			if (error instanceof DataError) {
				if (error.message.includes("Can't find dataPath: /menu. Stopped at menu")) {
					await this.jsonDbService.getDb().push('/menu', this.getInitialData());
					const data = await this.jsonDbService.getDb().getData('/menu');
					this.logger.log('[App] initJsonDbData() successfully created and loaded initial data: ', data);
				}
			} else {
				this.logger.error('[App] initJsonDbData() error: ', error);
			}
		}
	}

	getInitialData(): MenuItemDto[] {
		return [
			{
				img: 'img/tabs/vegy.jpg',
				altimg: 'vegy',
				title: 'Menu "Fitness"',
				descr:
					'"Fitness" menu is a new approach to cooking: more fresh fruit and vegetables. For people who are interested in sports; active and healthy. It is a completely new product with optimal price and high quality!',
				price: 9,
			},
			{
				img: 'img/tabs/post.jpg',
				altimg: 'post',
				title: 'Menu "Lenten"',
				descr:
					'The “Lenten” menu is a careful selection of ingredients: a complete absence of animal products, milk from almonds, oats, coconut or buckwheat, the right amount of proteins from tofu and imported vegetarian steaks.',
				price: 14,
			},
			{
				img: 'img/tabs/elite.jpg',
				altimg: 'elite',
				title: 'Menu “Premium”',
				descr:
					'In the “Premium” menu we use not only beautiful packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - a restaurant menu without going to a restaurant!',
				price: 21,
			},
		];
	}

	public async init(): Promise<void> {
		this.app.use(cors(this.corsOptions));
		this.app.options('*', cors(this.corsOptions));
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		this.server = this.app.listen(this.port);
		await this.initJsonDbData();
		this.logger.log(`Server started on http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
