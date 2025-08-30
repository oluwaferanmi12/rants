import {
  ADD_A_POST,
  ADD_COMMENT,
  APP_BOTTOM_NAVIGATOR,
  ATTENDEE_LIST,
  AUTH_NAVIGATOR,
  CHAT,
  CREATE_ATTENDEE_SECTION,
  CREATE_PROFILE_CATEGORY,
  CUSTOMISE_EVENTS,
  EDIT_EO_PROFILE,
  EDIT_PROFILE,
  EDIT_VENDOR_PROFILE,
  EO_PORTFOLIO,
  EO_PROFILE,
  EO_PROFILE_SETUP,
  Event,
  EVENT_ATTENDANCE_LIST,
  EVENT_LIST,
  EVENT_NAVIGATOR,
  EventOwnerType,
  FORGOT_PASSWORD,
  GLOBAL_NAVIGATOR,
  HOME_EVENTS,
  IMPORT_LIST,
  INTRODUCTION,
  INVITATION_LIST,
  INVITATIONS,
  LOGIN,
  PORTFOLIO_PREVIEW,
  PROFILE,
  PROFILE_EVENT_DETAILS,
  PROFILE_EVENTS,
  PROFILE_NAVIGATOR,
  PROFILE_RATINGS,
  RATING_DETAILS,
  RATING_EVENT,
  REGISTER,
  Section,
  SECTION_LIST,
  SectionInfo,
  TICKET_LIST,
  TICKET_SECTIONING,
  TICKETS,
  VENDOR_CATEGORY_SELECTION,
  VENDOR_PORTFOLIO,
  VENDOR_PROFILE,
  VENDOR_PROFILE_SETUP,
  VendorCategory,
  VendorType,
} from '@library';
import {NavigatorScreenParams} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AppStackParamList = {
  [GLOBAL_NAVIGATOR]: {
    username: string;
  };
  [AUTH_NAVIGATOR]: undefined;
};

export type AuthenticationStackParamList = {
  [LOGIN]: undefined;
  [REGISTER]: undefined;
  [INTRODUCTION]: undefined;
  [FORGOT_PASSWORD]: undefined;
  [PROFILE_NAVIGATOR]: undefined;
  [EVENT_NAVIGATOR]: undefined;
  [EDIT_PROFILE]: undefined;
};

export type GlobalStackParamList = {
  [PROFILE_NAVIGATOR]: undefined;
  [EVENT_NAVIGATOR]: undefined;
  [APP_BOTTOM_NAVIGATOR]: undefined;
};

export type ProfileStackParamList = {
  [PROFILE]: {profilePixUri: string; bannerUri: string} | undefined;
  [VENDOR_PROFILE]: {profilePixUri: string; bannerUri: string} | undefined;
  [EO_PROFILE]: {profilePixUri: string; bannerUri: string} | undefined;
  [EDIT_PROFILE]:
    | {
        profilePixUri: string;
        bannerUri: string;
      }
    | undefined;
  [EDIT_VENDOR_PROFILE]:
    | {
        profilePixUri: string;
        bannerUri: string;
      }
    | undefined;
  [EDIT_EO_PROFILE]:
    | {
        profilePixUri: string;
        bannerUri: string;
      }
    | undefined;
  [CREATE_PROFILE_CATEGORY]: undefined;
  [VENDOR_CATEGORY_SELECTION]:
    | {
        type: undefined | VendorType;
        category: undefined | VendorCategory;
      }
    | undefined;
  [VENDOR_PROFILE_SETUP]: {
    vendorType: undefined | VendorType | EventOwnerType;
    vendorCategory: VendorCategory;
  };
  [EO_PROFILE_SETUP]: undefined;
  [ATTENDEE_LIST]: {
    event: Event;
    sections: Section[];
  };
  [EVENT_ATTENDANCE_LIST]: {
    event: Event;
    section: Section;
    sections: Section[];
  };
  [TICKET_SECTIONING]: undefined;
  [VENDOR_PORTFOLIO]: {editMode: boolean; index: number} | undefined;
  [EO_PORTFOLIO]: {editMode: boolean; index: number} | undefined;
  [PORTFOLIO_PREVIEW]: {index: number};
  [PROFILE_EVENTS]: undefined;
  [PROFILE_RATINGS]: undefined;
  [PROFILE_EVENT_DETAILS]: {
    event: Event;
  };
  [ADD_A_POST]: {
    eventId: string;
  };
  [ADD_COMMENT]: {
    postId: string;
    eventId: string;
  };
  [RATING_DETAILS]: undefined;
  [RATING_EVENT]: undefined;
  [CREATE_ATTENDEE_SECTION]: {
    event: Event;
    category: AttendeeType;
    sections: Section[];
  };
  [IMPORT_LIST]: {
    event: Event;
    section: Section;
    sections: Section[];
    wasCreated?: boolean;
  };
  [INVITATIONS]: undefined;
  [INVITATION_LIST]: undefined;
  [TICKETS]: undefined;
  [TICKET_LIST]: undefined;
  [SECTION_LIST]: {
    event: Event;
    category: AttendeeType;
    sections: Section[];
  };
  [EVENT_NAVIGATOR]:
    | {
        screen: string;
        params: {eventCategory?: string; event?: Event};
      }
    | undefined;
  [APP_BOTTOM_NAVIGATOR]: {
    screen: string;
  };
};

export enum AttendeeType {
  ATTENDEES = 'Attendees',
  VENDORS = 'Vendors',
}

export type EventStackParamList = {
  [EVENT_LIST]: undefined;
  [CUSTOMISE_EVENTS]: {
    eventCategory?: string;
    event?: Event;
  };
  [PROFILE_EVENT_DETAILS]: {
    event: Event;
  };
  [PROFILE_NAVIGATOR]: NavigatorScreenParams<ProfileStackParamList>;
};

export type BottomNavParamList = {
  [EVENT_NAVIGATOR]: undefined;
  [PROFILE_NAVIGATOR]: NavigatorScreenParams<ProfileStackParamList>;
  [HOME_EVENTS]: undefined;
  [CHAT]: undefined
};

export type EventListProps = NativeStackScreenProps<
  EventStackParamList,
  'Event_list'
>;

export type HomeEventProps = NativeStackScreenProps<
  BottomNavParamList,
  'HOME_EVENTS'
>;

export type CustomiseEventProps = NativeStackScreenProps<
  EventStackParamList,
  'Customise_events'
>;

export type LoginProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  'Login'
>;

export type RegisterProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  'Register'
>;

export type IntroductionProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  'Introduction'
>;

export type ForgotPasswordProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  'ForgotPassword'
>;

export type ProfileProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Profile'
>;

export type VendorPortfolioPreview = NativeStackScreenProps<
  ProfileStackParamList,
  'PortfolioPreview'
>;

export type VendorProfileProps = NativeStackScreenProps<
  ProfileStackParamList,
  'VendorProfile'
>;

export type EOProfileProps = NativeStackScreenProps<
  ProfileStackParamList,
  'EOProfile'
>;

export type EditProfileProps = NativeStackScreenProps<
  ProfileStackParamList,
  'EditProfile'
>;

export type EditVendorProfileProps = NativeStackScreenProps<
  ProfileStackParamList,
  'EditVendorProfile'
>;

export type EditEOProfileProps = NativeStackScreenProps<
  ProfileStackParamList,
  'EditEOProfile'
>;

export type CreateProfileCategoryProps = NativeStackScreenProps<
  ProfileStackParamList,
  'CreateProfileCategory'
>;

export type VendorCategorySelectionProps = NativeStackScreenProps<
  ProfileStackParamList,
  'VendorCategorySelection'
>;

export type VendorProfileSetupProps = NativeStackScreenProps<
  ProfileStackParamList,
  'VendorProfileSetup'
>;

export type EOProfileSetupProps = NativeStackScreenProps<
  ProfileStackParamList,
  'EOProfileSetup'
>;

export type VendorPortfolioProps = NativeStackScreenProps<
  ProfileStackParamList,
  'VendorPortfolio'
>;

export type EOPortfolioProps = NativeStackScreenProps<
  ProfileStackParamList,
  'EOPortfolio'
>;

export type ProfileEventProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ProfileEvents'
>;

export type EventAttendanceListProps = NativeStackScreenProps<
  ProfileStackParamList,
  'EVENT_ATTENDANCE_LIST'
>;

export type ProfileRatingsProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ProfileRatings'
>;

export type ProfileEventDetailsProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ProfileEventDetails'
>;

export type AttendeeListProps = NativeStackScreenProps<
  ProfileStackParamList,
  'AttendeeList'
>;

export type TicketSectioningProps = NativeStackScreenProps<
  ProfileStackParamList,
  'TICKET_SECTIONING'
>;

export type SectionListProps = NativeStackScreenProps<
  ProfileStackParamList,
  'SECTION_LIST'
>;

export type CreateAttendeeSectionProps = NativeStackScreenProps<
  ProfileStackParamList,
  'CreateAttendeeSection'
>;

export type ImportListProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ImportList'
>;

export type AddAPostProps = NativeStackScreenProps<
  ProfileStackParamList,
  'AddAPost'
>;

export type AddCommentProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ADD_COMMENT'
>;

export type RatingDetailsProps = NativeStackScreenProps<
  ProfileStackParamList,
  'RatingDetails'
>;

export type RateEventProps = NativeStackScreenProps<
  ProfileStackParamList,
  'RatingEvent'
>;

export type InvitationsProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Invitations'
>;

export type InvitationListProps = NativeStackScreenProps<
  ProfileStackParamList,
  'InvitationList'
>;

export type TicketListProps = NativeStackScreenProps<
  ProfileStackParamList,
  'TicketList'
>;

export type TicketsProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Tickets'
>;

export enum AttendanceStatus {
  PENDING = 'pending',
  REQUEST = 'request',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export type EventAttendee = {
  username?: string;
  name: string;
  email?: string;
  status: AttendanceStatus;
};
