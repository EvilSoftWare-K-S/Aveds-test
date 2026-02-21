import { useEffect, useState } from 'react';
import { profileApi, useProfileApiQuery } from './profileApi';
import { ProfileResponse } from '../types/profileType';
import { useDispatch } from 'react-redux';

export const useCachedProfile = () => {
  const { data, error, isLoading } = useProfileApiQuery();
  const [cachedData, setCachedData] = useState<ProfileResponse | null>(() => {
    const stored = localStorage.getItem('profileData');
    if (data) {
      return data;
    }
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  });
  const dispatch = useDispatch();
  const clearCache = () => {
    dispatch(profileApi.util.resetApiState());
    setCachedData(null);
    localStorage.removeItem('profileData');
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem('profileData', JSON.stringify(data));
      setCachedData(data);
    }
    if (error) {
      const stored = localStorage.getItem('profileData');
      if (stored) {
        setCachedData(JSON.parse(stored));
      }
    }
    if (isLoading && !data) {
      const stored = localStorage.getItem('profileData');
      if (stored) {
        setCachedData(JSON.parse(stored));
      }
    }
  }, [data, error, isLoading]);

  return {
    data: data || cachedData,
    isLoading,
    error,
    clearCache,
  };
};
