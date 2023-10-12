export const eventUtilFields = {
  id: true,
  title: true,
  description: true,
  remainingTickets: true,
  eventStartsAt: true,
  eventFinishAt: true,
  price: true,
  poster: true,
  authorId: true,
  totalTickets: true,
  author: {
    name: true,
    email: true,
  },
  address: {
    complement: true,
    houseNumber: true,
    cep: true,
    city: {
      name: true,
      state: {
        name: true,
        uf: true,
      },
    },
  },
};
