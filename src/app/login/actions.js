'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '../../../backend/utils/supabase/server';

export async function login({ email, password }) {
  const supabase = await createClient();

  if (!email || !password) {
    redirect('/error');
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect('/error');
    return;
  }

  // Revalidate and redirect
  revalidatePath('/');
  redirect('/');
}

export async function signup({ email, password }) {
  const supabase = await createClient();

  if (!email || !password) {
    redirect('/error');
    return;
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect('/error');
    return;
  }

  // Revalidate and redirect
  revalidatePath('/');
  redirect('/');
}
