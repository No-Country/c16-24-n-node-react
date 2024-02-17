import { useState } from "react";

export function Registro() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (email !== confirmEmail) {
      alert("Los correos electrónicos no coinciden");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setEmail("");
    setConfirmEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <article>
      <div className="flex flex-col items-center justify-center h-screen dark">
        <div className="w-full max-w-md bg-orange-200 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-black-200 mb-4">
            Crear cuenta
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex space-x-4 mb-4 ">
              <input
                placeholder="Nombre usuario"
                className="bg-gray-200 text-gray-100 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <input
              placeholder="Email"
              className="bg-gray-200 text-gray-100 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Confirmar Email"
              className="bg-gray-200 text-gray-100 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            <input
              placeholder="Contraseña"
              className="bg-gray-200 text-gray-100 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Confirmar Contraseña"
              className="bg-gray-200 text-gray-100 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <p className="text-white mt-4">
              Ya tienes cuenta?
              <a
                className="text-sm text-blue-500 -200 hover:underline mt-4 ml-4"
                href="/login"
              >
                Acceder
              </a>
            </p>
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              Crear
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
