export default class AviaApi {
  apiBase = 'https://aviasales-test-api.kata.academy/';

  async getSearchId() {
    let res = await fetch(`${this.apiBase}search`);
    res = await res.json();
    return res.searchId;
  }

  async getTickets(id, page = 1, sort = 'price') {
    let res = await fetch(`${this.apiBase}tickets?page=${page}&sort=${sort}&searchId=${id}`);
    res = await res.json();
    return res.tickets;
  }
}
