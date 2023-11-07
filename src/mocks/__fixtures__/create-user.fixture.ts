export interface CreateUserProps {
  id: number;
}

export function createUser({ id }: CreateUserProps) {
  const createdAt = new Date(2010, 0, 1);
  createdAt.setDate(createdAt.getDate() + id);

  return {
    id: `${id}`,
    name: `NAME_${id}`,
    surname: `SURNAME_${id}`,
    investmentsCount: id * 2,
    premium: id % 2 === 0,
    createdAt,
  };
}
