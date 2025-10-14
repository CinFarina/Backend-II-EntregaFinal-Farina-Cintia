const TicketDAO = require('../dao/TicketDAO');

class TicketRepository {
  constructor() {
    this.dao = new TicketDAO();
  }

  async createTicket(data) {
    return await this.dao.create(data);
  }
}

module.exports = TicketRepository;
