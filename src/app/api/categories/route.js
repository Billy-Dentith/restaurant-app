import { NextResponse } from "next/server"

// FETCH ALL CATEGORIES 
export const GET = async () => {
    try {
        const response = await fetch('http://localhost:9090/api/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Error: Failed to fetch categories. Status: ${response.status}`);
            throw new Error('Failed to fetch categories');
        }

        console.log(response)
        
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