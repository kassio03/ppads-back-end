export const utilFields = {
  id: true,
  title: true,
  description: true,
  remainingTickets: true,
  eventStartsAt: true,
  eventFinishAt: true,
  price: true,
  poster: true,
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
