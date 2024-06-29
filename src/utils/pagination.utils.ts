export const pagination = (page: number) => {
  return { limit: 6, skip: (page - 1) * 6 };
};
