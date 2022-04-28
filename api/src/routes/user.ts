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


router.get ('/:userID', (req: Request, res: Response, next: NextFunction) => {
	const userID = req.params.userID;
	User.findByPk(userID)
	.then((user) => {
		if (user) return res.status(202).send(user);
		else res.status(404).send ('The user does not exist');
	})
	.catch ((err) => {
		return res.status(err.code).send(err.message);
	})
})



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

export default router;