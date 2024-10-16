export const prerender = false;

import { supabase } from '../../utils/supabaseClient';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    let requestBody;

    try {
      // Parse the JSON body
      requestBody = await request.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'Invalid JSON format' }),
        { status: 400 }
      );
    }

    const { name, email, website } = requestBody;

    // Validate the data
    if (!name || !email || !website) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Insert data into Supabase
    const { error } = await supabase
      .from('reports')
      .insert([{ name, email, website }]);

    if (error) {
      return new Response(
        JSON.stringify({ message: 'Failed to submit. Please try again later.' }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Submitted successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'An unexpected error occurred. Please try again later.' }),
      { status: 500 }
    );
  }
};
