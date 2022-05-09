import  jwt  from 'jsonwebtoken'
interface User {
    cuil: string;
    name: string;
    lastName: string;
    role: string;
}

export const genToken = (user: User) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ 
        id:user.cuil,
        name:user.name, 
        last_name:user.lastName,
        role:user.role
    },secretKey as string);

    return token;
    
}

