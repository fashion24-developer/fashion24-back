export const FANCY_FIND_ALL_SELECT = {
  id: true,
  name: true,
  costPrice: true,
  price: true,
  discountRate: true,
  status: true,
  fancyImages: { select: { id: true, imageUrl: true }, where: { order: 1 } },
  fancyOptions: {
    select: { option: { select: { id: true, name: true } } },
    orderBy: { optionId: 'asc' }
  },
  fancySubOptions: {
    select: {
      subOption: { select: { id: true, optionId: true, name: true, additionalPrice: true } }
    },
    orderBy: { subOptionId: 'asc' }
  },
  looks: { select: { id: true, name: true, imageUrl: true } },
  tags: { select: { id: true, name: true }, orderBy: { id: 'asc' } }
} as const;
