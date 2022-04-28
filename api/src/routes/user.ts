import { Response, Request, Router, NextFunction } from 'express';
import { json } from 'stream/consumers';
import { User } from '../models/User';
const router = Router();


router.get('/', (req: Request, res: Response, next: NextFunction) => {
	User.findAll()
		.then((users) => {
			return res.send(users);
		})
		.catch((error) => {
			return res.status(404).send(error);
		});
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
	const user = req.body;
	User.create(user)
		.then((createdUser) => {
			return res.send(createdUser);
		})
		.catch((error) => {
			return res.status(404).send(error);
		});
});

router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const { userID } = req.body;
	const removedUser = await User.findByPk(userID);
	if (!removedUser) { res.status(404).send("User not found") }
	if (removedUser) {
		removedUser.destroy()
			.then(() => {
				return res.status(202).send("Removed correctly")
			})
			.catch((error: any) => {
				return res.status(404).send(error);
			});
	}
});




router.post('/update', async (req: Request, res: Response, next: NextFunction) => {
  	try {

    	const userUpdate: User = req.body;
		//ES NECESARIO RECIBIR LOS DATOS DESDE EL BODY
		
    	const existingUser = await User.findByPk(parseInt(userUpdate.cuil));
		
    	if (existingUser) {
			await User.update({
				cuil: userUpdate.cuil,
				name: userUpdate.name,
				lastName: userUpdate.lastName,
				phoneNumber: userUpdate.phoneNumber,
				emailAddress: userUpdate.emailAddress,
				address: userUpdate.address,

				//AQUI AGREGAR LOS CAMPOS QUE SE QUIERAN MODIFICAR

			}, {
				where: {
					cuil: userUpdate.cuil,	
				}
			});

      		return res.status(200).json(userUpdate);
    	}
		else{
    		
			res.status(400).send("User not found");
		}

    
  	} catch (e) {
    res.status(400).send("ERROR"+e);
  }
});


export default router;
