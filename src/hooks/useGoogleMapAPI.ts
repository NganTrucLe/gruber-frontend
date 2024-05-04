import { useMemo } from 'react';

/**
 * The hooks to get Google Map API key and map ID from environment variables.
 * Get rid of the need to import `process.env` in the component.
 * @returns {Object} apiKey, mapId
 */

export default function useGoogleMapAPI() {
  const apiKey = useMemo(() => process.env.NEXT_PUBLIC_NAME_GOOGLE_MAPS_API_KEY, []);
  const mapId = useMemo(() => process.env.NEXT_PUBLIC_NAME_GOOGLE_MAPS_ID, []);

  return { apiKey, mapId };
}
