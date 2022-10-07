import User from '../../database/models/user';

export interface IUserRepository {
  getAll(): Promise<User[]>
  getByEmail(email: string): Promise<User | null>
}

class UserRepository implements IUserRepository {
  private model = User;

  async getAll(): Promise<User[]> {
    return this.model.findAll();
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { email } });
    return user?.get();
  }
}

export default UserRepository;
