import PErrors from 'src/prisma.errors';

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        return await this.prisma.users.findMany()
    }

    async getById(id: string) {
        const user = await this.prisma.users.findUnique({
            where: { id: +id }
        })

        if (!user) throw new NotFoundException("User not found!")

        return user
    }

    async create(dto: UsersDto) {
        return this.prisma.users.create({
            data: dto
        })
    }

    async delete(id: string) {
        try {
            await this.prisma.users.delete({
                where: { id: +id }
            })

            return this.sendSuccessResponse(
                "The user has been successfully deleted"
            )
        }
        catch (error) {
            this.checkErrors(error.code)
        }
    }

    async update(params: {
        id: string,
        data: UsersDto
    }) {
        try {
            const { id, data } = params
    
            await this.prisma.users.update({
                data,
                where: { id: +id }
            })

            return this.sendSuccessResponse(
                "The user has been successfully updated"
            )
        } 
        catch (error) {
            this.checkErrors(error.code)
        }
    }

    checkErrors(errorCode: string | number) {
        if (errorCode === PErrors.NOT_FOUND) 
            throw new NotFoundException('User not found');
        
        throw new InternalServerErrorException() 
    }

    sendSuccessResponse(message: string) {
        return {
            message: message,
            status: 200,
            ok: true
        }
    } 
}
