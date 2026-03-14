import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl text-white mb-4">
              ACHI ACHI MARATANG
            </h3>
            <p className="font-body text-sm leading-relaxed">
              정통 마라의 깊은 맛을 전하는
              <br />
              아치아치 마라탕
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body font-bold text-white mb-4">바로가기</h4>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <Link to="/menu" className="hover:text-white transition">
                  메뉴
                </Link>
              </li>
              <li>
                <Link to="/stores" className="hover:text-white transition">
                  매장안내
                </Link>
              </li>
              <li>
                <Link to="/partnership" className="hover:text-white transition">
                  가맹문의
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-bold text-white mb-4">고객센터</h4>
            <ul className="space-y-2 font-body text-sm">
              <li>전화: 1588-0000</li>
              <li>이메일: info@achiachi-maratang.com</li>
              <li>운영시간: 평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center font-body text-xs">
          <p>&copy; 2026 아치아치 마라탕. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
