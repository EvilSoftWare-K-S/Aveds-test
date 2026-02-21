import { useEffect, useState } from 'react';
import { useProfileApiQuery } from './profileApi';
import { ProfileResponse } from '../types/profileType';

export const useCachedProfile = () => {
  const { data, error, isLoading } = useProfileApiQuery();
  const [cachedData, setCachedData] = useState<ProfileResponse | null>(null);

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
    error
  };
};