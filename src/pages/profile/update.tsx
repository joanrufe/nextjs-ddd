export default function HomePage() {
  return (
    <div className="mt-28 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Update Your Profile</h1>

      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="name"
              type="text"
              placeholder="Jane Doe"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
              id="email"
              type="email"
              placeholder="email@example.com"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 text-right">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
