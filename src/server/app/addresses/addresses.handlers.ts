import { AppDataSource } from '../../../data-source';
import { Address } from '../../../entity/Address';
import { City } from '../../../entity/City';
import { Street } from '../../../entity/Street';

const addressRepository = AppDataSource.getRepository(Address);
const cityRepository = AppDataSource.getRepository(City);
const streetRepository = AppDataSource.getRepository(Street);

interface RequestBody {
  cityName: string;
  streetName: string;
  buildingNumber: string;
}

export async function createNewAddress(requestBody: RequestBody) {
  const { cityName, streetName, buildingNumber } = requestBody;

  const newAddress = new Address();
  newAddress.buildingNumber = buildingNumber;
  await addressRepository.save(newAddress);

  const newStreet = new Street();
  newStreet.name = streetName;
  newStreet.Addresses = [newAddress];
  await streetRepository.save(newStreet);

  const newCity = new City();
  newCity.name = cityName;
  newCity.streets = [newStreet];
  newCity.Addresses = [newAddress];
  await cityRepository.save(newCity);

  const addressId = await addressRepository
    .createQueryBuilder('address')
    .leftJoinAndSelect('address.city', 'city')
    .leftJoinAndSelect('address.street', 'street')
    .select('address.id')
    .where(
      'city.name = :cityName AND street.name = :streetName AND address.buildingNumber = :buildingNumber',
      { cityName, streetName, buildingNumber },
    )
    .getOne();

  return addressId;
}