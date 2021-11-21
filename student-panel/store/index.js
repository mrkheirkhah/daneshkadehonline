export const state = () => ({
  bankResponse: null
});

export const getters = {};

export const mutations = {
  SET_BANK_RESPONSE_OBJECT(state, { bankResponseObject }) {
    state.bankResponse = bankResponseObject;
  }
};

export const actions = {
  saveBankResponseObject({ commit }, bankResponseObject) {
    commit("SET_BANK_RESPONSE_OBJECT", { bankResponseObject });
  }
};
