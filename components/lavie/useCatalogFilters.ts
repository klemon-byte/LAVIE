'use client';

import { useEffect, useState } from 'react';
import { categories } from '@/lib/lavie-data';

type Filters = { category: string; q: string; price: string; color: string; sort: string; page: string };
const defaults: Filters = {category:'all', q:'', price:'all', color:'all', sort:'default', page:'1'};
function parse(query: string): Filters {
  const params = new URLSearchParams(query);
  const valid = (key: string, choices: string[], fallback: string) => choices.includes(params.get(key)||'') ? params.get(key)! : fallback;
  return {category:valid('category', categories.map(c=>c.id), 'all'), q:params.get('q')||'',
    price:valid('price',['all','under','over'],'all'), color:valid('color',['all','light','brown','other'],'all'),
    sort:valid('sort',['default','asc','desc'],'default'), page: String(Math.max(1, Math.min(100000, Math.floor(Number(params.get('page')) || 1))))};
}

export default function useCatalogFilters(catalog: boolean, initialQuery: string) {
  const [values, setValues] = useState(() => parse(initialQuery));
  useEffect(() => { setValues(parse(initialQuery)); }, [initialQuery]);
  useEffect(() => {
    if (!catalog) return;
    const restore = () => setValues(parse(window.location.search));
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [catalog]);

  function update(patch: Partial<Filters>, replace = false) {
    // Read the current URL so consecutive changes always retain the other filters.
    const next = {...(catalog ? parse(window.location.search) : values), ...patch, page: patch.page ?? '1'};
    setValues(next);
    if (!catalog) return;
    const params = new URLSearchParams();
    for (const key of Object.keys(defaults) as (keyof Filters)[]) {
      if (next[key] !== defaults[key]) params.set(key, next[key]);
    }
    const url = '/products' + (params.size ? '?' + params.toString() : '');
    if (url === window.location.pathname + window.location.search) return;
    if (replace) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
  }
  return {values, update, reset: () => update(defaults)};
}
