import { LocationClient } from "../../../data/LocationClient";
import { findDropbox, findDropboxError, findDropboxSuccess, findHome, findHomeError, findHomeSuccess } from "../actions";

const locationClient = new LocationClient();

export const geocodeHome = (payload: string) => {
  return (dispatch: any): any => {
    dispatch(findHome());
    return locationClient.get(payload)
      .then((response) => {
        if (response.error) {
          dispatch(findHomeError());
        } else {
        dispatch(findHomeSuccess(response));
        }
      });
  }
}

export const geocodeDropbox = (payload: string) => {
  return (dispatch: any): any => {
    dispatch(findDropbox());
    return locationClient.get(payload)
      .then((response) => {
        if (response.error) {
          dispatch(findDropboxError());
        } else {
        dispatch(findDropboxSuccess(response));
        }
      });
  }
}
