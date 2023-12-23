import { IFoodDeliveryService } from './food-delivery.service.interface';
import { MenuItemDto } from '../dto/menu-item.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { JsonDbService } from '../../database/JsonDbService';
import { UserDto } from '../dto/user.dto';

@injectable()
export class FoodDeliveryService implements IFoodDeliveryService {
	constructor(@inject(TYPES.JsonDbService) private jsonDbService: JsonDbService) {}
	getMenu(): Promise<MenuItemDto[]> {
		return this.jsonDbService.getDb().getData('/menu');
	}

	request(userRequest: UserDto): Promise<void> {
		return this.jsonDbService.getDb().push('/requests[]', userRequest, true);
	}
}
