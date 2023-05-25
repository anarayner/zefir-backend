import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './model/users.model';
import { CreateUserDto } from './model/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(dto: CreateUserDto) {
    const candidate = await this.userModel.findOne({ email: dto.email });
    if (candidate) {
      throw new NotAcceptableException('User with this email already exist');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);
    const newUser = new this.userModel({ ...dto, password: hashedPassword });
    await newUser.save();
    return newUser;
  }
}
