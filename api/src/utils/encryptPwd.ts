import bcrypt from "bcrypt";

export const encryptPwd = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(password, salt);
    return pass;
}