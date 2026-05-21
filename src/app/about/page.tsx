import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="px-4 pb-10" style={{ background: "#F7F5F0", minHeight: "100%" }}>
      <div className="pt-4 mb-4">
        <Link href="/" className="text-sm text-gray-400">← Home</Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">About VeganEats China</h1>

      <div className="bg-white rounded-xl p-4 mb-4 space-y-3">
        <h2 className="font-semibold text-gray-800">What is this?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          A community tool for international participants at{" "}
          <strong>muShanghai 2026</strong> — helping vegans, vegetarians, and people with dietary restrictions
          find suitable food near Alibaba Hongqiao Center.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Each restaurant includes an <strong>ordering card</strong> with Chinese phrases you can show
          directly to your server — no Mandarin required.
        </p>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4 space-y-3">
        <h2 className="font-semibold text-gray-800">About Our Data</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Restaurant info is manually researched and verified by our team.
          We update it regularly during the event period.
        </p>
        <p className="text-sm text-gray-400 text-xs">Last updated: May 21, 2026</p>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4 space-y-3">
        <h2 className="font-semibold text-gray-800">Found an issue?</h2>
        <p className="text-sm text-gray-600">Wrong hours, closed restaurant, or have a suggestion?</p>
        <a href="mailto:zqhdingyue@163.com?subject=VeganEats Feedback"
          className="flex items-center justify-center rounded-xl py-3 text-sm font-semibold active:scale-95 transition-transform"
          style={{ border: "2px solid #2D6A4F", color: "#2D6A4F" }}>
          Send Feedback
        </a>
      </div>

      <footer className="text-center text-xs text-gray-300 mt-8 space-y-1">
        <p>© 2026 VeganEats China · Made with ♥ for muShanghai</p>
        <p>Independent community tool, not officially affiliated with muShanghai.</p>
      </footer>
    </div>
  );
}
