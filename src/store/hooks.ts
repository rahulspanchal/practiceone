import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store';

/**
 * Pre-typed Redux hooks. Always use these instead of the plain `useDispatch` /
 * `useSelector` so dispatch and state are fully typed across the app.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
