/* eslint-disable no-undef */
/**
 * Global Jest setup. Mocks native modules that have no JS implementation in the
 * test environment so component/integration tests can render without a device.
 */

// In-memory MMKV mock (createMMKV factory API, react-native-mmkv v4).
jest.mock('react-native-mmkv', () => {
  const stores = new Map();
  const createMMKV = ({ id = 'default' } = {}) => {
    if (!stores.has(id)) {
      stores.set(id, new Map());
    }
    const map = stores.get(id);
    return {
      set: (key, value) => map.set(key, value),
      getString: key => map.get(key),
      getNumber: key => map.get(key),
      getBoolean: key => map.get(key),
      contains: key => map.has(key),
      remove: key => map.delete(key),
      clearAll: () => map.clear(),
    };
  };
  return { createMMKV };
});
