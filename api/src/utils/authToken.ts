import  jwt  from 'jsonwebtoken'
interface User {
    cuil: string;
    name: string;
    lastName: string;
    role: string;
    emailAddress: string;
}

export const genToken = (user: User) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ 
        id:user.cuil,
        name:user.name, 
        lastName:user.lastName,
        role:user.role,
        email:user.emailAddress
    },secretKey as string);

    return token;
    
}

