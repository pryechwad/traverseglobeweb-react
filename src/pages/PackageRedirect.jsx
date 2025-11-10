import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { packageDetails } from '../data/siteData';
import { slugify } from '../utils/slug';

function resolveCategoryFromId(id) {
  const num = Number(id);
  if (num >= 1 && num <= 10) return 'uae';
  if ((num >= 11 && num <= 15) || (num >= 26 && num <= 30)) return 'bali';
  if ((num >= 16 && num <= 20) || (num >= 36 && num <= 39)) return 'thailand';
  if ((num >= 21 && num <= 25) || (num >= 31 && num <= 35)) return 'singapore';
  return 'uae';
}

export default function PackageRedirect() {
  const { slug } = useParams();

  // Try to find the matching detail by slug of name or by numeric id
  let resolvedId = Number.isFinite(Number(slug)) ? Number(slug) : null;
  let detail = resolvedId ? packageDetails[resolvedId] : null;

  if (!detail && typeof slug === 'string') {
    const matchEntry = Object.entries(packageDetails).find(([, d]) => slugify(d?.name) === slug);
    if (matchEntry) {
      resolvedId = Number(matchEntry[0]);
      detail = matchEntry[1];
    }
  }

  if (!detail || !resolvedId) {
    // Could not resolve; send to home
    return <Navigate to="/" replace />;
  }

  const category = resolveCategoryFromId(resolvedId);
  return <Navigate to={`/${category}-packages/${slug}`} replace />;
}
