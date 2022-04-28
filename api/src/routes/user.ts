import { Response, Request, Router, NextFunction } from 'express';
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


router.post('/updateUser'),async(req:Request,res:Response, next: NextFunction)=>{
	



}
router.post('/:cuil'),async(req:Request,res:Response, next: NextFunction)=>{
	// cuil,name,lastName,password,phoneNumber,emailAddress,address,gender
    const cuil: number = parseInt(req.params.cuil, 10);

  	try {
    	const userUpdate: User = req.body;
		//ES NECESARIO RECIBIR LOS DATOS DESDE EL BODY
		
    	const existingUser = await User.findByPk(cuil);

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
					cuil: cuil,	
				}
			});

      		return res.status(200).json(userUpdate);
    	}
		else{
    		const newUser= await User.create(userUpdate);
			res.status(201).json(newUser);
		}

    
  	} catch (e) {
    res.status(400).send(e);
  }
}


export default router;