import { GlobalState } from 'little-state-machine';

export function updatePersonalInfo(state: GlobalState, payload) {
  return {
    ...state,
    personalInfo: {
      ...state.personalInfo,
      ...payload,
    },
  };
}

export function updateContactInfo(state: GlobalState, payload) {
  return {
    ...state,
    contactInfo: {
      ...state.contactInfo,
      ...payload,
    },
  };
}
