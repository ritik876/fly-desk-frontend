import { useEffect, useState } from 'react';

// Generic data hook. `fn` is an api.* call returning { data, meta }.
export function useFetch(fn, deps = []) {
  const [state, setState] = useState({ data: null, meta: null, loading: true, error: null });
  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then(({ data, meta }) => active && setState({ data, meta, loading: false, error: null }))
      .catch((err) => active && setState({ data: null, meta: null, loading: false, error: err.message }));
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}
