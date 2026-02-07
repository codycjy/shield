import { useNavigate } from 'react-router-dom';

const plans = [
  { duration: '3-month', months: 3, price: 0.99, popular: false },
  { duration: '6-month', months: 6, price: 0.99, popular: true },
  { duration: '12-month', months: 12, price: 0.99, popular: false },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">MindShield</span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Shield Orb */}
          <div className="flex justify-center mb-8">
            <div className="shield-orb" data-state="green">
              <div className="shield-orb-glow" />
              <div className="shield-orb-trail" />
              <div className="shield-orb-ripple" />
              <div className="shield-orb-ripple shield-orb-ripple-delay" />
              <div className="shield-orb-core">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            You create. We take the hit.
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            MindShield quietly filters your comments and DMs in the background.
            When abnormal attacks are detected, it switches to crisis mode, deploying
            top-tier models and maximum compute to protect you until the attack ends.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const total = (plan.price * plan.months).toFixed(2);
            return (
              <div
                key={plan.duration}
                className={`bg-white rounded-xl shadow-sm border-2 p-6 flex flex-col relative transition-shadow hover:shadow-md ${
                  plan.popular ? 'border-green-500' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {plan.duration} coverage
                </h3>

                <div className="mb-5">
                  <div className="text-gray-900">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-500 text-sm"> / month</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Total: ${total}
                  </div>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Includes <strong>1 Crisis Mode</strong> activation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Full protection during a single incident
                    </span>
                  </li>
                </ul>

                <div className="border-t border-gray-100 pt-4 mb-5">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Notes</div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">&#x2022;</span>
                      <span className="text-xs text-gray-500">
                        Once the Crisis Mode entitlement is used, the service ends.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">&#x2022;</span>
                      <span className="text-xs text-gray-500">
                        If Crisis Mode is <span className="underline">not used</span>, refunds are available and calculated{' '}
                        <span className="italic">pro-rata based on unused days</span>.
                      </span>
                    </li>
                  </ul>
                </div>

                <button
                  className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Purchase
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Guest Mode */}
      <section className="pb-16 px-6">
        <div className="max-w-md mx-auto text-center">
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="w-full py-3 px-6 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:border-green-500 hover:text-green-600 transition-colors bg-white"
          >
            Guest Mode
            <span className="text-gray-400 ml-2 text-sm font-normal">( for hackathon demo )</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>&copy; 2026 MindShield. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
