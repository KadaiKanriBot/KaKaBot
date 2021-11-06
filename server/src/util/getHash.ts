import { hashSync } from 'bcrypt';

export const getHash = (str: string) => hashSync(str, 10);
