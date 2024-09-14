export const FANCY_FIND_ALL_SELECT = {
  id: true,
  name: true,
  costPrice: true,
  price: true,
  discountRate: true,
  status: true,
  fancyImages: { select: { id: true, imageUrl: true }, where: { order: 1 } },
  fancyOptions: { select: { option: { select: { id: true, name: true } } } },
  fancySubOptions: {
    select: { subOption: { select: { id: true, name: true, additionalPrice: true } } }
  },
  looks: { select: { id: true, name: true, imageUrl: true } },
  tags: { select: { id: true, name: true } }
} as const;
