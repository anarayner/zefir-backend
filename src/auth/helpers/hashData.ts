import * as bcrypt from 'bcrypt';

export async function hashData(data: string) {
  const saltRounds = 10;
  return await bcrypt.hash(data, saltRounds);
}
