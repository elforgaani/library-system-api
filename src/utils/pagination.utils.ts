interface Pagination {
  limit: number,
  skip: number
}

export const pagination = (page: number, limit: number): Pagination => {
  return { limit: limit, skip: (page - 1) * limit };
};
