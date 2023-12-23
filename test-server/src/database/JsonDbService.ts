import { inject, injectable } from 'inversify';
import { Config, JsonDB } from 'node-json-db';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class JsonDbService {
	db: JsonDB;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		try {
			this.db = new JsonDB(new Config('food-delivery-storage', true, false, '/'));
			this.logger.log('[JsonDbService] Successfully connected to database');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error('[JsonDbService] Error during connection to database: ' + error.message);
			}
		}
	}

	getDb(): JsonDB {
		return this.db;
	}
}
