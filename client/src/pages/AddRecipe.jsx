import PageTransition from "../components/PageTransition";

export default function AddRecipe() {
  return (
    <PageTransition>
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-3">Add Recipe</h1>
        <p className="text-gray-600">
          Adding recipes to TheMealDB requires the premium API and is out of
          scope for this assessment. This app focuses on browsing, searching,
          and saving favorites as requested.
        </p>
      </div>
    </PageTransition>
  );
}
