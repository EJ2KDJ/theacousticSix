import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('comment_section')
            .select('*');

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
    }

    if (req.method === 'POST') {
        const { username, comment } = req.body;

        const { data, error } = await supabase
            .from('comment_section')
            .insert([{ username, comment }]);

        if (error) return res.status(500).json({ error: error.message });
        return res.status(201).json(data);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}