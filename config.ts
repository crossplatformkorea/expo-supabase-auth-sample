import Constants from 'expo-constants';
import invariant from 'tiny-invariant';

const extra = Constants?.manifest?.extra;

invariant(extra?.SUPABASE_URL, 'SUPABASE URL not found');
invariant(extra?.SUPABASE_ANON_KEY, 'SUPABASE_ANON_KEY not found');

export const SUPABASE_URL = extra.SUPABASE_URL as string;
export const SUPABASE_ANON_KEY = extra.SUPABASE_ANON_KEY as string;
