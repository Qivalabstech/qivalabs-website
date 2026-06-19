import { redirect } from 'next/navigation';

// This route immediately redirects to the standalone WaitJI AI platform.
// Opening in same tab (not new tab) — standard outbound navigation.
export default function WaitJIAIPage() {
  redirect('https://waitjiai.in');
}
