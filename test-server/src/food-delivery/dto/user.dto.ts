import { IsString } from 'class-validator';

export class UserDto {
	@IsString({ message: 'Name was not passed' })
	name: string;

	@IsString({ message: 'Phone was not passed' })
	phone: string;
}
