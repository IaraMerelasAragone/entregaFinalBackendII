import TicketModel from '../dao/models/ticket.model.js';

export default class TicketRepository {
    async create(ticketData) {
    return await TicketModel.create(ticketData);
    }

    async findAll() {
    return await TicketModel.find();
    }

    async findByCode(code) {
    return await TicketModel.findOne({ code });
    }
}