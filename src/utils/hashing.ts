import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

export async function verifyPassword(oldPassword: string, newPassword: string) {
    return await bcrypt.compare(oldPassword, newPassword);
}