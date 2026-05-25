import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://irebblvelfrbojgubzjq.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZWJibHZlbGZyYm9qZ3ViempxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MjQ1MzEsImV4cCI6MjA5NTIwMDUzMX0.I3qZEJ_Z86Ziq2mgdcnj-g9MyJY8WPeDaD4qL5NAjW8'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)