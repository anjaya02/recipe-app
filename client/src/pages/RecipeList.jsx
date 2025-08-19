import PageTransition from "../components/PageTransition";

export default function RecipeList() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold">Recipes</h1>
        <p className="text-gray-600">
          Use Dashboard to browse by category or search by name.
        </p>
      </div>
    </PageTransition>
  );
}
