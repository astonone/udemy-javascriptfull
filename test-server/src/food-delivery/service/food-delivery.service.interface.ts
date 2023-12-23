import { MenuItemDto } from '../dto/menu-item.dto';
import { UserDto } from '../dto/user.dto';

export interface IFoodDeliveryService {
	request: (userRequest: UserDto) => Promise<void>;
	getMenu: () => Promise<MenuItemDto[]>;
}
