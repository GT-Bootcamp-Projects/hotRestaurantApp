import ApiService from './api.service';

export const ReservationsService = {
  get(id) {
    if (typeof id !== 'number') {
      return ApiService.get('reservations');
    }

    return ApiService.get('reservations', id);
  },

  post(payload, id) {
    if (typeof id !== 'number') {
      return ApiService.post('reservations', payload);
    }

    return ApiService.update('reservations', id, payload);
  },

  remove(id) {
    if (!id || typeof id !== 'number') {
      throw new Error('ReservationsService.remove() requires an id to delete');
    }

    return ApiService.delete(`reservations/${id}`);
  }
}
