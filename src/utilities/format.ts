export const formatPrice = (price: number) => `${new Intl.NumberFormat('he-IL').format(price)} ₪`
