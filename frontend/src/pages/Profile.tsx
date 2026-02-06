export default function Profile() {
  return (
    <div className="max-w-4xl space-y-6">
      {/* User Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">User Information</h2>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-white text-3xl font-bold">
            JK
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                defaultValue="Jennifer Kelly"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                defaultValue="jennifer.k@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            Update Profile
          </button>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Subscription</h2>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold mb-1">Pro Plan</div>
              <div className="text-green-100">$29.99/month</div>
            </div>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="flex justify-between text-sm">
            <span>Renewal Date: Feb 15, 2026</span>
            <span>Crisis Claims: 2/3 remaining</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Change Plan
          </button>
          <button className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            Purchase Extra Claims
          </button>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Connected Accounts</h2>
        <div className="space-y-4">
          {/* Twitter */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">𝕏</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Twitter</div>
                <div className="text-sm text-gray-500">@jennifer_k</div>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Disconnect
            </button>
          </div>

          {/* Instagram */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
              <div>
                <div className="font-medium text-gray-900">Instagram</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Connect
            </button>
          </div>

          {/* Facebook */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">f</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Facebook</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
