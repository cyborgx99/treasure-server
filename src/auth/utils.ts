import { User } from './dto/auth.dto';
import { v4 as uuid } from 'uuid';

export const generateUser = (name: string): User => {
  return {
    id: uuid(),
    name,
  };
};
