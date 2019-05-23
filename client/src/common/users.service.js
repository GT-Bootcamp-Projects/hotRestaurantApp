import ApiService from './api.service';

export const UsersService = {
  get(id) {
    if (typeof id !== 'number') {
      throw new Error('UsersService.get() requires an id to fetch a user');
    }

    return ApiService.get('users', id);
  },

  create(payload) {
    return ApiService.post('users', payload);
  },

  update(id, payload) {
    if (typeof id !== 'number') {
      throw new Error('UsersService.update() requires an id to update a user');
    }

    return ApiService.update('users', id, payload);
  },

  delete(id) {
    if (typeof id !== 'number') {
      throw new Error('UsersService.delete() requires an id to delete a user');
    }

    return ApiService.delete(`users/${id}`);
  },

  getReservations(id) {
    if (typeof id !== 'number') {
      throw new Error('UsersService.getReservations() requires an id!');
    }

    return ApiService.get('users/reservations', id);
  }
}

