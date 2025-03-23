import { NextResponse } from "next/server"
import baseUrl from "..";

// FETCH ALL CATEGORIES 
export const GET = async () => {
    try {
        const response = await fetch(`${baseUrl}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Error: Failed to fetch categories. Status: ${response.status}`);
            throw new Error('Failed to fetch categories');
        }
        
        const categories = await response.json();

        return new NextResponse(
            JSON.stringify(categories),
            { status: 200 }
        );
    } catch(err) {
        console.error('Fetch error:', err.message);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!"}),
            { status: 500 }
        );
    }
}