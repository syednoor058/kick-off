import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const saltRoundes = 10;
        const hashedPass = await bcrypt.hash(password, saltRoundes);
        return hashedPass;
    } catch (error) {
        console.log(`Error hashing password, ${error}`);
    }
}

export const comparePassword = async (password, hashedPass) => {
    try {
        return bcrypt.compare(password, hashedPass);
    } catch (error) {
        console.log(`Error comparing password, ${error}`)
    }
}