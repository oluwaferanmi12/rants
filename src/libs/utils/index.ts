import {DateTime} from 'luxon';
import EncryptedStorage from 'react-native-encrypted-storage';
import ImageCropPicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';

export const onMediaPickerOpen = async (
  type: 'photo' | 'video' | 'any',
  onComplete: (res: ImageOrVideo) => void,
  options: Options = {},
  onError?: (err: any) => void,
  pickerType: 'camera' | 'filesystem' = 'camera',
) => {
  try {
    const PickerType =
      pickerType === 'camera'
        ? ImageCropPicker.openCamera
        : ImageCropPicker.openPicker;
    const response = await PickerType({
      cropping: false,
      mediaType: type ?? 'photo',
      useFrontCamera: false,
      ...options,
    });
    if (response.size > 2000000) {
      //10mb
      throw new Error('File size is too large');
    }
    onComplete(response);
  } catch (error: any) {
    onError?.(error);
  }
};

export const getFileExtension = (path: string) => {
  return path.match(/\.([^.]+)$/)?.[0];
};

export function formatCurrency(amount: number) {
  return amount.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  });
}

export const timeAgo = (date: string) => {
  const diff = DateTime.now().toMillis() - DateTime.fromISO(date).toMillis();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximate month
  const years = Math.floor(days / 365); // Approximate year

  if (years > 0) {
    return years === 1 ? '1 year ago' : `${years} years ago`;
  }
  if (months > 0) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
  if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }
  return seconds <= 5 ? 'just now' : `${seconds} seconds ago`;
};

const setItem = async (key: string, value: string) => {
  try {
    await EncryptedStorage.setItem(
      key,
      JSON.stringify({value, type: typeof value}),
    );
  } catch (error) {}
};

const getItem = async (key: string) => {
  try {
    const session = await EncryptedStorage.getItem(key);

    if (session) {
      const stored = JSON.parse(session);
      return stored.value;
    }
  } catch (error) {}
};

const removeItem = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {}
};

const clear = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (error) {}
};

export const LocalStorage = {getItem, setItem, removeItem, clear};
