import { createSupabaseServerClient } from './supabase-server'

export async function getAdminProfile() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('role, is_banned')
    .eq('id', user.id)
    .single()

  return data
}

export async function isAdmin() {
  const profile = await getAdminProfile()
  return profile?.role === 'admin'
}

export async function getAllUsers() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getAllBandsAdmin() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('bands_view')
    .select('id, name, created_at, user_id, province_name, city_name')
    .order('created_at', { ascending: false })
  return data ?? []
}
