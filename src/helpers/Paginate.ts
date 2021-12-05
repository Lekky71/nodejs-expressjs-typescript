import { IPagination } from '../interfaces';

/**
 * Do pagination ops
 *
 * @param totalItems
 * @param resultTotal
 * @param page
 * @param size
 * @param name the object model name
 */
export const paginate = (totalItems: number, resultTotal: number, page: number, size: number, name?: string): IPagination => {
  const nextPage = page + 1;
  const pages = Math.ceil(totalItems / size);

  return {
    name,
    size: resultTotal,
    totalItems,
    nextPage: (nextPage > pages ? pages : nextPage) || 1,
    previousPage: page - 1 || page,
  };
};
