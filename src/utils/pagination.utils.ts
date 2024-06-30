interface Pagination {
  limit: number,
  skip: number
}

export const pagination = (page: number, limit: number): Pagination => {
  return { limit: 6, skip: (page - 1) * 6 };
};
