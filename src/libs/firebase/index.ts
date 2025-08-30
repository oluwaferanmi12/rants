import {EventAttendee} from '@config/navigator/routeTypes';
import {getAuth} from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';
import {getStorage} from '@react-native-firebase/storage';
import {Section} from './useFirebase';

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
export type FbError = {
  code: string;
  message: string;
};

export enum Collections {
  SECTION_USERS = 'section-users',
  SECTIONS = 'sections',
}

export enum Documents {
  USERS = 'users',
  USERNAMES = 'usernames',
  EVENTS = 'events',
  EVENT_POSTS = 'event-posts',
  ATTENDANCE_LIST = 'event-section-information',
  INVITATIONS = 'event-invitations',
}

export enum ImageRefs {
  REGULAR_PROFILES = '/images/regular/profile',
  REGULAR_BANNER = '/images/regular/banner',
  VENDOR_PROFILES = '/images/vendor/profile',
  EO_PROFILES = '/images/eventOwner/profile',
  VENDOR_BANNER = '/images/vendor/banner',
  EO_BANNER = '/images/eventOwner/banner',
  VENDOR_VERIFICATION = '/images/vendor/verification',
  PORTFOLIO = '/portfolio/vendor',
  EVENTS = '/events',
  EVENT_POSTS = '/event-posts',
}

export enum ImageType {
  PROFILE = 'profile',
  BANNER = 'banner',
}

// export type SectionInfo = {
//   name: string;
//   description: string;
//   type: TSectionAccess;
//   capacity: number;
//   category: AttendeeType;
// };

export type SaveAttendanceWithAttendance = ({
  data,
  eventId,
  users,
}: {
  data: Section;
  eventId: string;
  users: EventAttendee[];
}) => Promise<string>;

export type SaveAttendance = ({
  sectionId,
  eventId,
  users,
}: {
  sectionId: string;
  eventId: string;
  users: EventAttendee[];
}) => Promise<string>;
