import PageTransition from "../components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-700">
          404 | Page Not Found
        </h1>
      </div>
    </PageTransition>
  );
}
