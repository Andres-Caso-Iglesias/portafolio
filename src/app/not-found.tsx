import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-neutral-100 dark:bg-slate-950 text-neutral-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-blue-600 dark:text-blue-400">404</h1>
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-slate-100">
            Pagina no encontrada / Page not found
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 text-base md:text-lg leading-relaxed">
            Lo sentimos, la pagina que buscas no existe. La URL puede haber cambiado o el enlace es
            incorrecto.
            <br />
            Sorry, the page you are looking for does not exist. The URL may have changed or the link
            is incorrect.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Volver al inicio / Go to home
        </Link>
      </div>
    </main>
  );
}
