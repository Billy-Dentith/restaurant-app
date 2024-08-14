import CategoryContent from "./content";

const getData = async (category) => {    
    try {
        const response = await fetch(`http://localhost:3000/api/products?category=${category}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch products:", error.message);
        throw error;
    }
};

const CategoryPage = async ({ params }) => {
    const { category } = params; 

    const data = await getData(category);

    return (
        <div>
            <CategoryContent data={data} />
        </div>
    );
};

export default CategoryPage;