import { UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";
import { JwTPayload } from "../interfaces/jwt-payload.interface";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";


// All strategyes are Providers
@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwTPayload): Promise<User > {
        const { uid } = payload;

        const user = await this.userRepository.findOneBy({ uid });
        if(!user) {
            throw new UnauthorizedException('User is not found');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('User is inactive, talk with the admin');
        }
        
        return user;
    }

}