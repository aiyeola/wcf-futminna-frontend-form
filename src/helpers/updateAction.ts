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

export function updateAcademicInfo(state: GlobalState, payload) {
  return {
    ...state,
    academicInfo: {
      ...state.academicInfo,
      ...payload,
    },
  };
}

export function updateFellowshipInfo(state: GlobalState, payload) {
  return {
    ...state,
    fellowshipInfo: {
      ...state.fellowshipInfo,
      ...payload,
    },
  };
}
