import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordHasherService {

    private readonly saltRounds = 10;

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compare(plainTextPassword: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hash);
    }

}
