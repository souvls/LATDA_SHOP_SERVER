import jwt from 'jsonwebtoken'

export const _genToken = (username: string, role: string) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ username: username, role: role }, secret, {
        //expiresIn: '1h', // Token หมดอายุใน 1 ชั่วโมง
    });
    
}