import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { validateOrReject } from "class-validator"

AppDataSource.initialize().then(async () => {
  try {
    console.log("Inserting a new user into the database...")
    const user = new User('John', 'Doe', 35)
    await validateOrReject(user)

    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)
  } catch (errors) {
    throw new Error(`ERROR: Validation failed with errors: ${errors}`)
  }
    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
