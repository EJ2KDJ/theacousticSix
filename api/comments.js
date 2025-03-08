import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('comments')
            .select('*');

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
    }

    if (req.method === 'POST') {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Comment text is required" });
        }

        const { data, error } = await supabase.from('comments').insert([{ text }]);

        if (error) {
            console.error("Error inserting comment:", error);
            return res.status(500).json({ error: error.message });
        }

        return res.status(201).json(data);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}