export const userUtilFields = {
  id: true,
  name: true,
  email: true,
  //coment: tem q ter a senha pq o service é usado lá no modulo de auth
  password: true,
  events: {
    id: true,
    title: true,
    description: true,
    poster: true,
    //todo: se precisar adicionar aqui os eventos de começo e fim do evento
  },
  tickets: {
    id: true,
    eventId: true,
    qrCode: true,
    alreadyUsed: true,
    usedAt: true,
  },
};
