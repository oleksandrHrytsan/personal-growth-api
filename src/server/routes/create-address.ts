import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from '../../data-source';
import 'reflect-metadata';
import { Address } from '../../entity/Address';
import { City } from '../../entity/City';
import { Street } from '../../entity/Street';

const addressRepository = AppDataSource.getRepository(Address);
const cityRepository = AppDataSource.getRepository(City);
const streetRepository = AppDataSource.getRepository(Street);

export const createAddress = express.Router();

createAddress.use(bodyParser.json());

createAddress.post('/createAddresses', async (request, response) => {
  try {
    const { cityName, streetName, buildingNumber } = request.body;

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

    console.log(addressId);

    response.send(JSON.stringify(addressId));
    response.end();
  } catch (error) {
    response.send(error.message);
    throw error;
  }
});
