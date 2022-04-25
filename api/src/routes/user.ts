import { Response, Request, Router, NextFunction } from 'express';
import { User } from '../models/User';
const router = Router();


router.get('/', (req: Request, res: Response, next: NextFunction) => {
	User.findAll()
		.then((users) => {
			res.send(users);
		})
		.catch((error) => next(error));
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
	const user = req.body;
	User.create(user)
		.then((createdUser) => {
			res.send(createdUser);
		})
		.catch((error) => next(error));
});

router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
	const { userID } = req.body;
	const removedUser = await User.findByPk(userID);
	if (!removedUser) { res.status(404).send("User not found") }
	if (removedUser) {
		removedUser.destroy()
			.then(() => {
				res.status(202).send("Removed correctly")
			})
			.catch((error: any) => next(error));
	}
});

export default router;