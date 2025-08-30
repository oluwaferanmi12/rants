import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  runTransaction,
  setDoc,
  where,
} from '@react-native-firebase/firestore';
import {DateTime} from 'luxon';
import {useContext, useEffect, useState} from 'react';
import {Image} from 'react-native-image-crop-picker';

import {
  deleteObject,
  getDownloadURL,
  ref,
  refFromURL,
} from '@react-native-firebase/storage';
import {
  EventOwnerType,
  TSectionAccess,
  VendorCategory,
  VendorType,
} from '../types';
import {getFileExtension} from '../utils';
import {
  auth,
  Collections,
  db,
  Documents,
  ImageRefs,
  SaveAttendance,
  SaveAttendanceWithAttendance,
  storage,
} from './';
import {AppContext} from '@data';
import {AttendeeType} from '@config/navigator/routeTypes';

export type VendorProfile = {
  bio?: string;
  name?: string;
  idNumber: string;
  idType: string;
  isActive: boolean;
  types?: string[];
  username: string;
  verified: boolean;
  cac: string;
  businessEmail: string;
  businessNumber: string;
  businessLocation: string;
  cps?: string;
  specialisation?: string[];
  vendorType: VendorType | EventOwnerType | undefined;
  availability?: Availability;
  vendorCategory: VendorCategory;
  socials?: {
    facebook: string;
    twitter: string;
    instagram: string;
    website: string;
  };
  portfolio?: Portfolio[];
};

export type EventOwnerProfile = {
  name: string;
  username: string;
  verified: boolean;
  isActive: boolean;
  cac: string;
  businessEmail: string;
  businessNumber: string;
  businessLocation: string;
  availability?: Availability;
  specialisation?: string[];
  bio?: string;
  socials?: {
    facebook: string;
    twitter: string;
    instagram: string;
    website: string;
  };
};

export type Section = {
  capacity: number;
  description: string;
  name: string;
  type: TSectionAccess;
  cost?: number;
  category: AttendeeType;
  sectionId?: string;
};

export type Event = {
  name: string;
  description: string;
  venue: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  ticketType: 'free' | 'priced';
  privacy: 'public' | 'private';
  userId: string;
  images: string[];
  capacity: {
    vendor: string;
    guest: string;
  };
  eventId: string;
  category: string;
};

export type Portfolio = {
  description: string;
  media: ImageRefs[];
  bannerUrl: string;
};

export enum Availability {
  ALWAYS = 'Always available',
  WEEKDAYS = 'Weekdays only',
  WEEKENDS = 'Weekends only',
  NOT_AVAILABLE = 'Not available',
}

export type User = {
  bio: string;
  email: string;
  isEventOwnwer: boolean;
  isVendor: boolean;
  name: string;
  username: string;
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    website: string;
  };
  vendorProfile?: VendorProfile;
  eventOwnerProfile?: EventOwnerProfile;
};

export type Post = {
  post: string;
  eventId: string;
  images: string[];
  likes: string[];
  postId: string;
  createdDate: string;
  comments: {
    id: string;
    username: string;
    comment: string;
    createdDate: string;
  }[];
};

export type TProfilePhotos = {
  regularDp: string;
  regularBanner: string;
  eoDp: string;
  eoBanner: string;
  vendorDp: string;
  vendorBanner: string;
};

export const useFirebase = () => {
  const [user, setUser] = useState<User>({} as User);
  const [profilePhotos, setUserPhotos] = useState<TProfilePhotos>({
    regularDp: '',
    regularBanner: '',
    eoDp: '',
    eoBanner: '',
    vendorDp: '',
    vendorBanner: '',
  });
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const {dispatch, initialAppState} = useContext(AppContext);
  const id = auth.currentUser?.uid ?? '';
  const getMyDetails = () => {
    if (!auth.currentUser?.uid) return;
    const _ref = doc(db, Documents.USERS, auth.currentUser?.uid);
    return onSnapshot(_ref, _user => {
      if (!_user?.exists) {
        return;
      }
      dispatch({
        authConfig: {
          isAuthenticated: true,
          user: _user.data() as User,
        },
      });
      setUser(_user.data() as User);
    });
  };
  const getProfilePhotos = async (_id = id) => {
    const regularDp = await fetchFile(ImageRefs.REGULAR_PROFILES, _id!);
    const regularBanner = await fetchFile(ImageRefs.REGULAR_BANNER, _id!);
    const eoDp = await fetchFile(ImageRefs.EO_PROFILES, _id!);
    const eoBanner = await fetchFile(ImageRefs.EO_BANNER, _id!);
    const vendorDp = await fetchFile(ImageRefs.VENDOR_PROFILES, _id!);
    const vendorBanner = await fetchFile(ImageRefs.VENDOR_BANNER, _id!);
    setUserPhotos({
      regularDp: regularDp,
      regularBanner: regularBanner,
      eoDp: eoDp,
      eoBanner: eoBanner,
      vendorDp: vendorDp,
      vendorBanner: vendorBanner,
    });
    dispatch({
      profilePhotos: {
        regularDp: regularDp,
        regularBanner: regularBanner,
        eoDp: eoDp,
        eoBanner: eoBanner,
        vendorDp: vendorDp,
        vendorBanner: vendorBanner,
      },
    });
  };

  const getUser = async () => {
    const userRef = doc(db, Documents.USERS, id);
    const _user = await getDoc(userRef);
    return _user?.exists ? _user.data() : {};
  };

  const getVendors = async () => {
    const usersQuery = query(
      collection(db, Documents.USERS),
      where('isVendor', '==', true),
    );
    return usersQuery;
  };

  const getUserById = async (uid: string): Promise<User> => {
    const userRef = doc(db, Documents.USERS, uid);
    const userSnapshot = await getDoc(userRef);
    return (userSnapshot.exists ? userSnapshot.data() : {}) as User;
  };

  const fetchMyEvents = () => {
    return query(
      collection(db, Documents.EVENTS),
      where('userId', '==', id),
    ).onSnapshot(_event => {
      if (!_event) {
        return;
      }
      setMyEvents(
        _event.docs.map(_doc => ({
          ..._doc.data(),
          eventId: _doc.id,
        })) as Event[],
      );
    });
  };

  const getEvents = () => {
    return query(collection(db, Documents.EVENTS), limit(100)).onSnapshot(
      _event => {
        if (!_event) {
          return;
        }
        setEvents(
          _event.docs.map(_doc => ({
            ..._doc.data(),
            eventId: _doc.id,
          })) as Event[],
        );
      },
    );
  };

  const savePost = async (eventId: string, post: string, images?: Image[]) => {
    const postRef = doc(collection(db, Documents.EVENT_POSTS));
    images?.length &&
      (await Promise.all(
        images.map((img, i) => {
          return uploadFile(
            img.path,
            (ImageRefs.EVENT_POSTS + '/' + postRef.id) as ImageRefs,
            postRef.id + i,
          );
        }),
      ));

    const imageURLs = images?.length
      ? await Promise.all(
          images?.map((_img, i) => {
            return fetchMedia(
              (ImageRefs.EVENT_POSTS + '/' + postRef.id) as ImageRefs,
              postRef.id + i + (getFileExtension(_img.path) || ''),
            );
          }),
        )
      : [];

    return await postRef.set({
      post,
      images: imageURLs,
      eventId,
      likes: [],
      comments: [],
      createdDate: DateTime.now().toISO(),
    });
  };

  const getPost = (eventId: string) => {
    const eventPostsRef = collection(db, Documents.EVENT_POSTS);
    const eventPostsQuery = query(
      eventPostsRef,
      where('eventId', '==', eventId),
    );

    return eventPostsQuery;
  };

  const deletePost = async (postId: string) => {
    const _ref = doc(db, Documents.EVENT_POSTS, postId);
    const docSnap = await getDoc(_ref);
    const post = docSnap.data() as Post;

    const refs = post.images.map(image => {
      return refFromURL(storage, image);
    });

    await Promise.all(refs.map(rf => deleteObject(rf)));
    return deleteDoc(_ref);
  };

  const saveComment = async (
    pId: string,
    comment: string,
    uid: string,
    username: string,
  ) => {
    const _ref = doc(collection(db, Documents.EVENT_POSTS), pId);

    return await runTransaction(db, async transaction => {
      const docSnap = await transaction.get(_ref);

      if (docSnap.exists) {
        const comments = docSnap.data()?.comments ?? [];
        transaction.set(_ref, {
          ...docSnap.data(),
          comments: [
            ...comments,
            {id: uid, username, comment, createdDate: DateTime.now().toISO()},
          ],
        });
      }
    });
  };

  const updateLikes = async (postId: string, userId: string) => {
    const _ref = doc(db, Documents.EVENT_POSTS, postId);

    return await runTransaction(db, async transaction => {
      const docSnap = await transaction.get(_ref);

      if (docSnap.exists) {
        const likes = docSnap.data()?.likes ?? [];
        const tmp = [...likes];

        if (tmp.includes(userId)) {
          tmp.splice(tmp.indexOf(userId), 1);
        } else {
          tmp.push(userId);
        }

        transaction.set(_ref, {
          ...docSnap.data(),
          likes: tmp,
        });
      }
    });
  };

  const getEventByID = async (eventId: string) => {
    const eventRef = doc(db, Documents.EVENTS, eventId);
    const eventSnapshot = await getDoc(eventRef);
    return eventSnapshot.exists ? eventSnapshot.data() : {};
  };

  const checkUsernameUniqueness = async (username: string) => {
    const _ref = doc(db, Documents.USERNAMES, username);
    try {
      const docSnap = await getDoc(_ref);
      return !docSnap.exists;
    } catch (error) {
      return false;
    }
  };

  const saveUsername = async (username: string, reserved: boolean) => {
    const _ref = doc(db, Documents.USERNAMES, username);
    return await runTransaction(db, async transaction => {
      const docSnap = await transaction.get(_ref);
      if (docSnap.exists) {
        throw new Error('Username already taken');
      } else {
        await transaction.set(_ref, {reserved});
      }
    });
  };

  const getEventSections = async (eventId: string) => {
    const sectionsRef = collection(
      db,
      Documents.EVENTS,
      eventId,
      Collections.SECTIONS,
    );
    onSnapshot(sectionsRef, _sections => {
      const data: Section[] = [];
      if (!_sections.empty) {
        _sections.docs.forEach(section => {
          data.push({...section.data(), sectionId: section.id} as Section);
        });
      }
      setSections(data);
    });
  };

  const getSectionUsers = async (eventId: string, sectionId: string) => {
    const _query = query(
      collection(
        db,
        Documents.EVENTS,
        eventId,
        Collections.SECTIONS,
        sectionId,
        Collections.SECTION_USERS,
      ),
    );
    return _query;
  };

  const saveSectionWithAttendance: SaveAttendanceWithAttendance = async ({
    data,
    eventId,
    users,
  }) => {
    const colRef = collection(
      db,
      Documents.EVENTS,
      eventId,
      Collections.SECTIONS,
    );
    const docRef = await addDoc(colRef, data);
    await Promise.all(
      users.map(
        async _user =>
          await addDoc(collection(docRef, Collections.SECTION_USERS), _user),
      ),
    );
    return colRef.id;
  };

  const saveAttendance: SaveAttendance = async ({
    sectionId,
    eventId,
    users,
  }) => {
    const colRef = collection(
      db,
      Documents.EVENTS,
      eventId,
      Collections.SECTIONS,
      sectionId,
      Collections.SECTION_USERS,
    );
    const invitationsRef = collection(db, Documents.INVITATIONS);
    await Promise.all(users.map(async _user => await addDoc(colRef, _user)));
    return sectionId;
  };

  const saveUser = async (_id: string, data: User) => {
    const userRef = doc(db, Documents.USERS, _id);
    return await setDoc(userRef, data);
  };

  const fetchFile = async (_ref: ImageRefs, _id: string) => {
    try {
      const fileRef = ref(storage, `${_ref}/${_id}.png`);
      return await getDownloadURL(fileRef);
    } catch (error) {
      return '';
    }
  };

  const fetchMedia = async (_ref: ImageRefs, file: string) => {
    const fileRef = ref(storage, `${_ref}/${file}`);
    return await getDownloadURL(fileRef);
  };

  const uploadFile = async (path: string, _ref: ImageRefs, _id: string) => {
    const fileRef = ref(storage, `${_ref}/${_id}${getFileExtension(path)}`);
    return await fileRef.putFile(path);
  };

  const deleteFile = async (_ref: ImageRefs, _id: string) => {
    const fileRef = ref(storage, `${_ref}/${_id}.png`);
    return await deleteObject(fileRef);
  };

  const deleteMedia = async (url: string) => {
    const mediaRef = refFromURL(storage, url);
    return await deleteObject(mediaRef);
  };

  const signOut = async () => {
    await auth.signOut();
    dispatch(initialAppState!);
  };

  useEffect(() => {
    // const myDetailsSubscription = getMyDetails();
    const getMyEvents = fetchMyEvents();
    const allEvents = getEvents();
    return () => {
      // myDetailsSubscription?.();
      getMyEvents();
      allEvents();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    events,
    savePost,
    checkUsernameUniqueness,
    getMyDetails,
    getUser,
    saveUsername,
    saveUser,
    signOut,
    deleteFile,
    fetchFile,
    uploadFile,
    fetchMedia,
    getEventByID,
    deleteMedia,
    getUserById,
    updateLikes,
    saveComment,
    getPost,
    deletePost,
    id,
    getProfilePhotos,
    profilePhotos,
    sections,
    myEvents,
    saveSectionWithAttendance,
    getEventSections,
    getSectionUsers,
    getVendors,
    saveAttendance,
  };
};
