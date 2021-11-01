import { getRepository } from 'typeorm';
import { User } from '../entity/User';

async function signUpUser(id: string, password: string, nickname: string) {
  const userRepository = getRepository(User);
  const user: User = new User();
  user.user_id = id;
  user.password = password;
  user.nickname = nickname;

  const result = await userRepository.save(user);

  return result;
}

async function findUser(id: string) {
  const userRepository = getRepository(User);
  const foundOne = await userRepository.findOne({ user_id: id });

  return foundOne;
}

export default {
  signUpUser,
  findUser,
};
