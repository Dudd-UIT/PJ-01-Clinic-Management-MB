import {fetchDsClsByIdAction} from '../redux/action/fetchCLSAction';
import {fetchCTDTByIdAction} from '../redux/action/fetchCTDTById';
import {fetchPhieuKhamByIdAction} from '../redux/action/fetchPhieuKhamByIdAction';
import {fetchBenhByIdAction} from '../redux/action/fetchBenhByIdAction';
import {fetchLSKByIdBnAction} from '../redux/action/fetchPhieuKhamAction';

export const selectAction = (actionName: string): any | null => {
  switch (actionName) {
    case "CLSBYIDPK":
      return fetchDsClsByIdAction;
    case "CTDTBYIDPK":
      return fetchCTDTByIdAction;
    case "KQKHAMBYIDPK":
      return fetchPhieuKhamByIdAction;
    case "DSBENHBYIDPK":
      return fetchBenhByIdAction;
    case "LSKBYIDBN":
      return fetchLSKByIdBnAction;
    default:
      return null;
  }
};