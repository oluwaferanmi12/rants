import {AlertProps, AlertTypes} from '@components';
import {ProfileCategory, User} from '@library';

type ProfilePhotos = {
  regularDp: string;
  regularBanner: string;
  eoDp: string;
  eoBanner: string;
  vendorDp: string;
  vendorBanner: string;
};

export type AuthConfig = {
  isAuthenticated: boolean;
  user: User;
};

export interface InitialAppState {
  authConfig: AuthConfig;
  alertConfig: AlertProps;
  showAlert: boolean;
  dispatch: (item: Partial<InitialAppState>) => void;
  activeProfile: ProfileCategory;
  initialAppState?: InitialAppState;
  profilePhotos: ProfilePhotos;
}

const data: InitialAppState = {
  authConfig: {
    isAuthenticated: false,
    user: {} as User,
  },
  profilePhotos: {} as ProfilePhotos,
  alertConfig: {
    type: 'success' as AlertTypes,
    title: '',
  },
  showAlert: false,
  activeProfile: ProfileCategory.REGULAR,
  dispatch: () => {},
};

export const initialAppState: InitialAppState = {
  ...data,
  initialAppState: data,
};
