import { AppDataSource } from '../../../data-source';
import { User } from '../../../entity/User';
import { Address } from '../../../entity/Address';
import { validateOrReject } from 'class-validator';

const userRepository = AppDataSource.getRepository(User);
const addressRepository = AppDataSource.getRepository(Address);

interface UserCredentials {
  email: string;
  phoneNumber: string;
  password: string;
  city: string;
  street: string;
  buildingNumber: string;
}

async function createNewUser(requestBody: UserCredentials) {
  const { email, phoneNumber, password, city, street, buildingNumber } = requestBody;

  const userAddressId = await addressRepository
    .createQueryBuilder('address')
    .leftJoinAndSelect('address.city', 'city')
    .leftJoinAndSelect('address.street', 'street')
    .select('address.id')
    .where(
      'city.name = :cityName AND street.name = :streetName AND address.buildingNumber = :buildingNumber',
      { cityName: city, streetName: street, buildingNumber: buildingNumber },
    )
    .getOne();

  const newUser = new User();

  const newUserAddress = await addressRepository.findOneBy({ id: userAddressId.id });

  newUser.email = email;
  newUser.phoneNumber = phoneNumber;
  newUser.password = password;
  newUser.addresses = [newUserAddress];

  await validateOrReject(newUser, { validationError: { target: false } });

  await userRepository.save(newUser);

  return newUser;
}

interface UserId {
  id: string;
}

async function readUser(requestBody: UserId) {
  const { id } = requestBody;

  const user = await userRepository
    .createQueryBuilder('user')
    .leftJoin('user.addresses', 'address')
    .leftJoin('address.city', 'city')
    .leftJoin('address.street', 'street')
    .select([
      'user.id',
      'user.email',
      'user.phoneNumber',
      'user.password',
      'city.name',
      'street.name',
      'address.buildingNumber',
    ])
    .where('user.id = :userId', { userId: id })
    .getOne();

  return user;
}

export { createNewUser, readUser };
