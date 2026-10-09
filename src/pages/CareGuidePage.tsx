import React, { useState } from 'react';
import { PageId } from '../types';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { InlineEditableImage } from '../components/InlineEditableImage';
import { useLanguage } from '../context/LanguageContext';
import { 
  Download, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Droplets,
  Sun,
  Layers,
  Wrench
} from 'lucide-react';

interface CareGuidePageProps {
  onNavigate: (page: PageId, extra?: { tab?: string; category?: string }) => void;
  onOpenCatalogModal?: () => void;
}

export const CareGuidePage: React.FC<CareGuidePageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // State for interactive modals
  const [activeModal, setActiveModal] = useState<
    'levels' | 'ipe-instructions' | 'viro-instructions' | 'supplies' | 'contact' | 'warranty' | null
  >(null);

  const [contactSuccess, setContactSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1A17] font-sans">
      {/* 1. HERO COVER SECTION */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        {/* Background Image matching Jensen Outdoor */}
        <div className="absolute inset-0 transition-transform duration-1000 scale-105">
          <InlineEditableImage
            record="collection"
            recordId="care-guide"
            field="heroImage"
            value="/care/care-hero.png"
            alt={isVi ? 'Bảo dưỡng nội thất ngoài trời' : 'Outdoor furniture care'}
            className="h-full w-full object-cover"
          />
          {/* Subtle vignette / dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Title */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.08em] uppercase text-white drop-shadow-md">
            {isVi ? 'Bảo Dưỡng & Chăm Sóc' : 'Care & Maintenance'}
          </h1>
          <div className="w-16 h-0.5 bg-[#C4A482] mx-auto mt-4" />
        </div>
      </section>

      {/* 2. INTRODUCTION BLOCK */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-serif font-medium leading-snug text-[#1C1A17] mb-6">
          {isVi
            ? 'Bảo dưỡng nội thất thật dễ dàng với các cấp độ chăm sóc phù hợp với từng nhu cầu của bạn.'
            : 'Maintaining your furniture is a breeze with levels of care to fit your needs.'}
        </h2>
        
        <p className="text-sm sm:text-base text-[#1C1A17]/80 leading-relaxed max-w-3xl mx-auto mb-10 font-light">
          {isVi
            ? 'Tại B+Open, chúng tôi tin rằng nội thất xa xỉ cũng phải mang lại sự xa xỉ của sự chăm sóc đơn giản. Duy trì vẻ đẹp và sự thoải mái cho nội thất của bạn sẽ vô cùng nhẹ nhàng khi bạn tuân thủ các nguyên tắc bảo dưỡng dễ dàng của chúng tôi.'
            : 'At B+Open, we believe that luxury furniture should offer the luxury of simple care. Maintaining the beauty and comfort of your Ipe furniture, cushion fabrics, and woven fibers will feel effortless when you follow our easy care guidelines.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href="https://www.jensenoutdoor.com/wp-content/uploads/2025/07/JensenOutdoor-EasyCareGuide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
          >
            <span>{isVi ? 'Tải Cẩm Nang Bảo Dưỡng Dễ Dàng' : 'Download the Easy Care Guide'}</span>
          </a>

          <button
            onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#1C1A17] hover:bg-[#1C1A17] hover:text-white text-[#1C1A17] font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer rounded-xs"
          >
            <span>{isVi ? 'Nơi Mua Dụng Cụ Bảo Dưỡng' : 'Where to Buy Care Supplies'}</span>
          </button>
        </div>
      </section>

      {/* 3. SPLIT SECTION: WEATHERED SILVER VS RESTORED CHOCOLATE BROWN (With Animated GIF) */}
      <section className="py-16 sm:py-24 bg-[#F2EDE4] border-y border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Animated GIF showing Silver Patina to Chocolate Restoration */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative rounded-xs overflow-hidden shadow-xl border border-[#DCD3C0] bg-black">
                <img
                  src="/care/teak-care.png"
                  alt="Natural teak care and maintenance"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-xs sm:text-[13px] text-[#5A524A] italic text-center sm:text-left leading-relaxed">
                {isVi
                  ? 'Gỗ Teak dần thay đổi sắc màu theo thời gian. Bốn cấp độ bảo dưỡng giúp bạn lựa chọn diện mạo và mức độ chăm sóc phù hợp.'
                  : 'Weathered Ipe wood takes on a silver glow before following the simple steps in the Ipe Aftercare Kit to return the wood to it’s chocolate-brown finish.'}
              </p>
            </div>

            {/* Right: Choose Your Path & 4 Levels of Care */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ae5c4a]">
                {isVi ? 'Chọn Con Đường Của Bạn' : 'Choose Your Path'}
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1A17] tracking-tight">
                {isVi ? '4 Cấp Độ Bảo Dưỡng' : '4 Levels of Care'}
              </h2>

              <p className="text-sm sm:text-base text-[#1C1A17]/80 leading-relaxed font-light">
                {isVi
                  ? 'Gỗ Teak có thể giữ sắc nâu ấm qua các bước chăm sóc phù hợp hoặc chuyển dần sang màu bạc xám tự nhiên theo thời gian. Khám phá 4 cấp độ bảo dưỡng để lựa chọn chăm sóc phù hợp với vẻ đẹp bạn mong muốn.'
                  : 'Not all care scenarios are created equal, that’s why we have created an easy guide to share how, when, and why to maintain your furniture.'}
              </p>

              <button
                onClick={() => setActiveModal('levels')}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
              >
                <span>{isVi ? 'Xem 4 Cấp Độ Bảo Dưỡng' : 'See Levels of Care'}</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SOLUTION-DYED ACRYLIC SECTION */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Image Tempo Swivel Rocker */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-xs overflow-hidden shadow-lg border border-[#EAE3D2]">
              <img
                src="/care/upholstery-care.png"
                alt="Solution-dyed acrylic outdoor upholstery"
                className="w-full h-auto object-cover hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ae5c4a]">
                SOLUTION-DYED ACRYLIC
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1A17] tracking-tight">
              {isVi ? 'Hướng dẫn bảo dưỡng vải bọc Solution-Dyed Acrylic' : 'Solution-Dyed Acrylic Upholstery Care'}
            </h3>

            <p className="text-sm sm:text-base text-[#1C1A17]/80 leading-relaxed font-light">
              {isVi
                  ? 'Vải Solution-Dyed Acrylic được lựa chọn cho nội thất ngoài trời nhờ khả năng duy trì màu sắc tốt dưới ánh nắng và cảm giác mềm mại khi sử dụng. Vệ sinh phù hợp giúp duy trì vẻ hoàn thiện của sản phẩm theo thời gian.'
                  : 'Solution-Dyed Acrylic is made for outdoor upholstery, combining colorfast performance with a soft hand. Simple, regular care keeps the fabric clean and looking its best.'}
            </p>

            <button
              onClick={() => setActiveModal('ipe-instructions')}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
            >
                <span>{isVi ? 'Hướng Dẫn Bảo Dưỡng Vải Bọc' : 'Upholstery Care Instructions'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 5. POWDER-COATED FINISH SECTION */}
      <section className="py-20 sm:py-28 bg-[#F8F5EE] border-t border-[#EAE3D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ae5c4a]">
                POWDER-COATED FINISH
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1A17] tracking-tight">
                {isVi ? 'Bề mặt sơn tĩnh điện' : 'Powder-Coated Finish'}
              </h2>

              <p className="text-sm sm:text-base text-[#1C1A17]/80 leading-relaxed font-light">
                {isVi
                  ? 'Lớp sơn tĩnh điện giúp bảo vệ bề mặt nhôm và thép, đồng thời mang đến màu sắc và độ hoàn thiện cho nội thất ngoài trời. Với cách vệ sinh và chăm sóc phù hợp, bạn có thể duy trì vẻ đẹp của lớp sơn và hạn chế những tác động từ môi trường theo thời gian.'
                  : 'Powder coating protects aluminum and steel while adding color and a refined outdoor finish. With simple care, the surface stays beautiful over time.'}
              </p>

              <button
                onClick={() => setActiveModal('viro-instructions')}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
              >
                <span>{isVi ? 'Hướng Dẫn Bảo Dưỡng Bề Mặt Sơn Tĩnh Điện' : 'Powder-Coated Finish Care'}</span>
              </button>
            </div>

            {/* Right: Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xs overflow-hidden shadow-lg border border-[#EAE3D2]">
                <img
                  src="/care/powder-coated-finish.png"
                  alt="Powder-coated outdoor furniture finish"
                  className="w-full h-auto object-cover hover:scale-102 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CARE SUPPLIES / THE RIGHT STUFF SECTION */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Image of Ipe Aftercare Kit */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xs overflow-hidden shadow-lg border border-[#EAE3D2] bg-white p-4">
              <img
                src="/care/care-supplies.png"
                alt="B+Open outdoor furniture care supplies"
                className="w-full h-auto object-contain hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#ae5c4a]">
              {isVi ? 'Dụng Cụ Bảo Dưỡng' : 'Care Supplies'}
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1A17] tracking-tight">
              {isVi ? 'Chăm Sóc Đúng Cách, Bền Đẹp Dài Lâu' : 'Care the Right Way, Keep It Beautiful'}
            </h2>

            <p className="text-sm sm:text-base text-[#1C1A17]/80 leading-relaxed font-light">
              {isVi
                ? 'Mỗi vật liệu outdoor cần một phương pháp chăm sóc riêng. B+Open tổng hợp các sản phẩm và hướng dẫn bảo dưỡng phù hợp cho gỗ Teak, kim loại sơn tĩnh điện và vải bọc ngoài trời.'
                : 'B+Open has worked with the leading care suppliers in the outdoor industry to create care products that make maintaining your furniture a breeze.'}
            </p>

            <button
              onClick={() => setActiveModal('supplies')}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
            >
              <span>{isVi ? 'Xem Các Sản Phẩm Bảo Dưỡng' : 'View Care Supplies'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 7. TO ORDER SUPPLIES BANNER */}
      <section className="py-16 bg-[#2B2723] text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide">
            {isVi ? 'Để Đặt Mua Vật Phẩm Bảo Dưỡng' : 'To Order Supplies'}
          </h2>
          <p className="text-sm text-white/70 tracking-wider uppercase font-sans">
            {isVi ? 'Liên hệ cửa hàng đối tác tại địa phương của bạn' : 'Contact your local store'}
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#ae5c4a] hover:bg-[#974b3a] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer rounded-xs"
            >
              <span>{isVi ? 'Tìm Đại Lý Gần Nhất' : 'Find a Retailer'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM 6 TOUCHPOINT GRID (Matches jensenoutdoor.com/product-care/ & Help Center) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D2]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          
          {/* Card 1: Retail Stores */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Cửa Hàng Bán Lẻ' : 'Retail Stores'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                {isVi
                  ? 'Ghé thăm một trong những đối tác bán lẻ thân thiện và am hiểu của B+Open.'
                  : 'Visit one of B+Open’s friendly, knowledgeable retail partners.'}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('showrooms', { tab: 'retailers' })}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#ae5c4a] hover:text-[#8C3F30] cursor-pointer"
              >
                <span>{isVi ? 'Tìm Cửa Hàng' : 'Find a Store'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Design Showrooms */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Showroom Thiết Kế' : 'Design Showrooms'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                {isVi
                  ? 'Mở cửa theo lịch hẹn dành riêng cho giới kiến trúc sư và đối tác thiết kế.'
                  : 'Open by appointment to the trade.'}
              </p>
            </div>
            <div className="pt-6 flex items-center gap-6">
              <button
                onClick={() => onNavigate('showrooms', { tab: 'design-showrooms' })}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#ae5c4a] hover:text-[#8C3F30] cursor-pointer"
              >
                <span>{isVi ? 'Tìm Showroom' : 'Find a Showroom'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Contract / Hospitality */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Dự Án Nghỉ Dưỡng & Khách Sạn' : 'Contract / Hospitality'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                {isVi
                  ? 'Kết nối với đội ngũ phụ trách kinh doanh dự án của chúng tôi.'
                  : 'Get in touch with our trade sales team.'}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => setActiveModal('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#ae5c4a] hover:text-[#8C3F30] cursor-pointer"
              >
                <span>{isVi ? 'Mẫu Đơn Liên Hệ' : 'Contact Form'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4: Corporate Office */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Văn Phòng Trụ Sở' : 'Corporate Office'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                1900 Old Williamsburg Road<br />
                Sandston, VA 23150
              </p>
            </div>
            <div className="pt-6 text-xs text-[#8C7A6B]">
              {isVi ? 'Hoa Kỳ • Quản lý vận hành toàn cầu' : 'United States • Global Logistics'}
            </div>
          </div>

          {/* Card 5: Customer Service */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Dịch Vụ Khách Hàng' : 'Customer Service'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                {isVi
                  ? 'Giải đáp thắc mắc chung, thông tin sản phẩm, đăng ký tài khoản hoặc chế độ bảo hành.'
                  : 'For general inquiries, product questions, account setup, or warranties.'}
              </p>
              <div className="text-xs text-[#5A524A] pt-1">
                {isVi ? 'Thứ Hai – Thứ Sáu' : 'Monday – Friday'}<br />
                8:00AM – 5:00PM ET
              </div>
            </div>
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveModal('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#ae5c4a] hover:text-[#8C3F30] cursor-pointer"
              >
                <span>{isVi ? 'Liên Hệ Hỗ Trợ' : 'Contact Customer Service'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveModal('warranty')}
                className="text-xs font-bold uppercase tracking-[0.14em] text-[#8C7A6B] hover:text-[#1C1A17] underline cursor-pointer"
              >
                {isVi ? 'Bảo Hành' : 'Warranty'}
              </button>
            </div>
          </div>

          {/* Card 6: Connect With Us */}
          <div className="bg-white p-8 rounded-xs border border-[#EAE3D2] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-normal text-[#1C1A17]">
                {isVi ? 'Kết Nối Với Chúng Tôi' : 'Connect With Us'}
              </h3>
              <p className="text-sm text-[#5A524A] font-light leading-relaxed">
                {isVi
                  ? 'Theo dõi câu chuyện di sản, dự án ngoài trời và nguồn cảm hứng sống mới nhất.'
                  : 'Follow our heritage story, real project installations, and outdoor design inspiration.'}
              </p>
            </div>
            <div className="pt-6 flex items-center space-x-6 text-sm font-medium text-[#ae5c4a]">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Pinterest</a>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== MODALS ===================== */}

      {/* 1. MODAL: 4 LEVELS OF CARE */}
      {activeModal === 'levels' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                  {isVi ? 'Giao Thức Tiêu Chuẩn' : 'Maintenance Matrix'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1A17] mt-1">
                  {isVi ? '4 Cấp Độ Bảo Dưỡng Nội Thất Gỗ Teak' : 'The 4 Levels of Teak Care'}
                </h3>
                <p className="text-sm text-[#5A524A] mt-2">
                  {isVi 
                    ? 'Tùy thuộc vào việc bạn muốn giữ vẻ nâu hổ phách sẫm hay tôn vinh sắc xám bạc tự nhiên:'
                    : 'Depending on whether you wish to maintain the deep chocolate brown or celebrate the natural silver patina:'}
                </p>
              </div>

              <div className="space-y-4 text-left">
                {/* Level 1 */}
                <div className="p-5 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 bg-[#ae5c4a]/10 text-[#ae5c4a] font-bold text-xs uppercase tracking-wider rounded-xs">
                      {isVi ? 'Cấp Độ 1: Vệ Sinh Bề Mặt Định Kỳ' : 'Level 1: Routine Seasonal Wash'}
                    </span>
                    <span className="text-xs text-[#8C7A6B]">
                      {isVi ? 'Thường xuyên / khi cần' : 'Regularly / as needed'}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Loại Bỏ Bụi Bẩn Và Tạp Chất' : 'Surface Dust & Pollen Removal'}
                  </h4>
                  <p className="text-xs text-[#5A524A] leading-relaxed">
                    {isVi
                      ? 'Dùng khăn mềm hơi ẩm hoặc bàn chải lông mềm để loại bỏ bụi bẩn, lá cây và các vết bám thông thường. Với vết bẩn khó làm sạch, sử dụng một lượng nhỏ chất làm sạch dịu nhẹ phù hợp cho gỗ, sau đó để bề mặt khô tự nhiên.'
                      : 'Rinse with clean water and mild dish soap using a soft bristle brush. Rinse thoroughly and allow to air dry.'}
                  </p>
                </div>

                {/* Level 2 */}
                <div className="p-5 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 bg-[#ae5c4a]/10 text-[#ae5c4a] font-bold text-xs uppercase tracking-wider rounded-xs">
                      {isVi ? 'Cấp Độ 2: Làm Sạch Chuyên Sâu' : 'Level 2: Deep Cleansing'}
                    </span>
                    <span className="text-xs text-[#8C7A6B]">
                      {isVi ? '3–6 tháng/lần*' : 'Every 3–6 months*'}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1A17] mb-1">
                      {isVi ? 'Loại Bỏ Vết Bẩn Và Rêu Mốc Bề Mặt' : 'Remove Stains and Surface Mold'}
                  </h4>
                  <p className="text-xs text-[#5A524A] leading-relaxed">
                    {isVi
                      ? 'Khi bụi bẩn, vết ố hoặc đốm đen tích tụ, sử dụng dung dịch làm sạch chuyên dụng cho teak outdoor theo hướng dẫn của nhà sản xuất. Chà nhẹ theo chiều vân gỗ, rửa sạch phần dung dịch còn lại và để gỗ khô hoàn toàn. Tránh dùng máy rửa áp lực cao vì có thể làm hư hại bề mặt gỗ.'
                      : 'Apply Penofin Pro-Tech Cleaner to damp timber. Let dwell for 10-15 minutes, scrub with an abrasive pad along the grain, and rinse thoroughly.'}
                  </p>
                  <p className="text-xs italic text-[#5A524A] mt-2">{isVi ? '*Chu kỳ 3–6 tháng chỉ là mốc tham khảo để kiểm tra và vệ sinh sâu, không phải lịch bắt buộc. Tần suất thực tế phụ thuộc mức độ phơi nắng mưa, bụi bẩn, tán cây và môi trường sử dụng.' : '*The 3–6 month interval is a reference for inspection and deep cleaning, not a mandatory schedule. Actual frequency depends on exposure and surroundings.'}</p>
                </div>

                {/* Level 3 */}
                <div className="p-5 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 bg-[#ae5c4a]/10 text-[#ae5c4a] font-bold text-xs uppercase tracking-wider rounded-xs">
                      {isVi ? 'Cấp Độ 3: Bảo Vệ Bề Mặt & Duy Trì Màu Sắc' : 'Level 3: Protect and Maintain the Finish'}
                    </span>
                    <span className="text-xs text-[#8C7A6B]">
                      {isVi ? 'Theo nhu cầu' : 'As needed'}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1A17] mb-1">
                      {isVi ? 'Lựa Chọn Lớp Hoàn Thiện Phù Hợp' : 'Choose the Right Finish'}
                  </h4>
                  <p className="text-xs text-[#5A524A] leading-relaxed">
                    {isVi
                      ? 'Nếu muốn giữ sắc nâu ấm, có thể sử dụng teak sealer hoặc sản phẩm bảo dưỡng màu chuyên dụng sau khi làm sạch và để gỗ khô hoàn toàn. Nếu yêu thích màu bạc xám tự nhiên, có thể để teak chuyển màu tự nhiên hoặc sử dụng chất bảo vệ không màu tương thích để hạn chế vết bẩn. Không bắt buộc phải phủ dầu nếu muốn để gỗ mộc.'
                      : 'Ensure timber is completely dry. Apply a thin, even coat of Penofin Verde Rosewood Oil. After 20-30 minutes, thoroughly wipe off any excess standing oil.'}
                  </p>
                </div>

                {/* Level 4 */}
                <div className="p-5 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 bg-[#ae5c4a]/10 text-[#ae5c4a] font-bold text-xs uppercase tracking-wider rounded-xs">
                      {isVi ? 'Cấp Độ 4: Phục Hồi Bề Mặt Gỗ' : 'Level 4: Restore the Wood Surface'}
                    </span>
                    <span className="text-xs text-[#8C7A6B]">
                      {isVi ? 'Khi gỗ phong hóa rõ rệt' : 'When visibly weathered'}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Xử Lý Bạc Màu, Ố Đen Và Bề Mặt Thô Nhám' : 'Reverse Weathered Patina to As-New'}
                  </h4>
                  <p className="text-xs text-[#5A524A] leading-relaxed">
                    {isVi
                      ? 'Với gỗ bạc màu mạnh, xuất hiện vết ố hoặc bề mặt thô ráp, sử dụng bộ sản phẩm teak cleaner & brightener phù hợp để làm sạch và hỗ trợ khôi phục sắc nâu tự nhiên. Nếu cần, chà nhám nhẹ theo chiều vân gỗ bằng giấy nhám mịn; sau đó để gỗ khô hoàn toàn trước khi quyết định có phủ chất bảo vệ hay không. Thử trước trên vùng khuất và tuân thủ hướng dẫn của sản phẩm.'
                      : 'Utilize the 3-step Ipe Aftercare Kit: Step 1 Cleaner strip, Step 2 Brightener neutralizer, followed by Step 3 Penofin Oil penetration.'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#EAE3D2]">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 bg-[#1C1A17] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL: IPE CARE INSTRUCTIONS */}
      {activeModal === 'ipe-instructions' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                  {isVi ? 'Cẩm Nang Kỹ Thuật' : 'Official Guidelines'}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1C1A17] mt-1">
                  {isVi ? 'Hướng Dẫn Bảo Dưỡng Vải Bọc Solution-Dyed Acrylic' : 'Solution-Dyed Acrylic Upholstery Care'}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="font-bold text-[#1C1A17] mb-1">
                  {isVi ? '01. HƯỚNG DẪN VỆ SINH & TẦN SUẤT' : '01. CLEANING & FREQUENCY'}
                  </div>
                  <p>
                    {isVi
                      ? 'Vệ sinh nhẹ định kỳ hàng tuần hoặc khi có bụi bẩn. Dùng bàn chải lông mềm loại bỏ bụi, lá cây và tạp chất trên bề mặt. Khi xuất hiện vết bẩn, xử lý sớm bằng khăn sạch thấm nhẹ, tránh chà xát khiến vết bẩn lan rộng. Làm sạch khi cần: Dùng nước ấm pha chất làm sạch dịu nhẹ, chải nhẹ bằng bàn chải mềm, sau đó xả kỹ để loại bỏ cặn chất tẩy. Để vải khô tự nhiên hoàn toàn trước khi sử dụng lại hoặc cất giữ.'
                      : 'Clean lightly each week or whenever dust and debris appear. Use a soft brush to remove dust, leaves, and surface debris. Treat spills promptly with a clean, lightly damp cloth and avoid rubbing. When needed, use warm water with a mild cleaner, brush gently, rinse thoroughly, and allow the fabric to dry completely before use or storage.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="font-bold text-[#1C1A17] mb-1">
                  {isVi ? '02. CÁC LƯU Ý QUAN TRỌNG' : '02. IMPORTANT NOTES'}
                  </div>
                  <p>
                    {isVi
                      ? 'Xử lý vết bẩn sớm: Thấm nhẹ chất lỏng bằng khăn sạch, không chà mạnh. Với vết dầu mỡ hoặc kem chống nắng, cần áp dụng phương pháp làm sạch phù hợp với loại vết bẩn. Hạn chế ẩm kéo dài: Đảm bảo vải và ruột đệm khô hoàn toàn trước khi che phủ hoặc cất giữ. Khả năng kháng nấm mốc của sợi không đồng nghĩa với việc bụi bẩn và hơi ẩm không thể gây nấm mốc. Tránh làm hư hại sợi: Không dùng bàn chải cứng, chất tẩy mạnh tùy tiện hoặc dung môi khi chưa có hướng dẫn tương thích. Giặt vỏ đệm đúng cách: Chỉ tháo vỏ hoặc giặt máy khi cấu tạo sản phẩm cho phép; đóng khóa kéo, chọn chế độ giặt nhẹ và phơi khô tự nhiên theo hướng dẫn.'
                      : 'Treat spills promptly by blotting with a clean cloth and avoiding aggressive rubbing. For oils or sunscreen, use a cleaning method suited to the stain. Keep cushions dry before covering or storing; mildew resistance does not replace regular cleaning and ventilation. Avoid stiff brushes, harsh cleaners, or solvents unless approved for the fabric. Remove and machine-wash covers only when the product allows it, closing zippers and using a gentle cycle with natural drying.'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#EAE3D2]">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 bg-[#1C1A17] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  {isVi ? 'Đã Hiểu' : 'Got it'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL: VIRO FIBER CARE */}
      {activeModal === 'viro-instructions' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                  {isVi ? 'Bề Mặt Sơn Tĩnh Điện' : 'Powder-Coated Finish'}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1C1A17] mt-1">
                  {isVi ? 'Hướng Dẫn Bảo Dưỡng Bề Mặt Sơn Tĩnh Điện' : 'Powder-Coated Finish Care Guide'}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                <p>
                  {isVi
                    ? 'Sợi đan Viro® Fiber là loại sợi polyethylene cao cấp thân thiện với môi trường, có khả năng kháng tia UV, nước mặn clo và nhiệt độ khắc nghiệt.'
                    : 'Viro® Fiber is an eco-friendly high-density polyethylene weave that resists UV degradation, chlorinated water, and temperature swings.'}
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    {isVi
                      ? 'Dùng vòi nước xịt nhẹ hoặc khăn ẩm lau bụi bẩn bám giữa các khe đan.'
                      : 'Rinse with clean water or use a soft damp cloth to clear debris between weaves.'}
                  </li>
                  <li>
                    {isVi
                      ? 'Đối với vết thức ăn dầu mỡ, dùng dung dịch xà phòng loãng và bọt biển mềm chà nhẹ.'
                      : 'For food or oil spills, apply mild liquid detergent with a soft sponge and rinse.'}
                  </li>
                  <li>
                    {isVi
                      ? 'Không dùng máy xịt áp lực cao hoặc chất tẩy rửa có tính mài mòn mạnh.'
                      : 'Never use high-pressure power washers or harsh solvent-based abrasives.'}
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#EAE3D2]">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 bg-[#1C1A17] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: VIEW CARE SUPPLIES */}
      {activeModal === 'supplies' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                  {isVi ? 'Sản Phẩm Khuyên Dùng' : 'Official Supplies'}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1C1A17] mt-1">
                  {isVi ? 'Danh Mục Dụng Cụ Bảo Dưỡng Chính Hãng' : 'Certified Care Products'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
                  <div className="font-bold text-[#1C1A17] text-sm">
                    {isVi ? 'Bộ Phục Hồi Ipe Aftercare Kit' : 'Ipe Aftercare Kit'}
                  </div>
                  <p className="text-xs text-[#5A524A]">
                    {isVi
                      ? 'Bao gồm dung dịch làm sạch Ipe Cleaner, dung dịch làm sáng Brightener, dầu dưỡng Penofin Verde và miếng chà chuyên dụng.'
                      : 'Complete set with Cleaner, Brightener, Penofin Verde Oil, and specialty non-metallic abrasive scrub pads.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
                  <div className="font-bold text-[#1C1A17] text-sm">
                    {isVi ? 'Dầu Dưỡng Penofin® Verde Rosewood' : 'Penofin® Verde Rosewood Oil'}
                  </div>
                  <p className="text-xs text-[#5A524A]">
                    {isVi
                      ? 'Dầu dưỡng chiết xuất gỗ cẩm lai thân thiện với môi trường, lọc tia UV 99%, duy trì màu hổ phách chocolate đậm đà.'
                      : 'Brazilian Rosewood oil formula with 99% UV protection, zero VOC, highlighting deep grain tones.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
                  <div className="font-bold text-[#1C1A17] text-sm">
                    {isVi ? 'Dung Dịch Làm Sạch Penofin Pro-Tech' : 'Penofin Pro-Tech Cleaner'}
                  </div>
                  <p className="text-xs text-[#5A524A]">
                    {isVi
                      ? 'Tẩy sạch lớp dầu cũ bị ố, nấm mốc và cặn bẩn bám dính trên bề mặt gỗ ngoài trời.'
                      : 'Restores weathered timber, stripping dirt and environmental film without bleaching or stripping grain.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
                  <div className="font-bold text-[#1C1A17] text-sm">
                    {isVi ? 'Bạt Phủ Bảo Vệ Tùy Chỉnh' : 'Tailored Furniture Covers'}
                  </div>
                  <p className="text-xs text-[#5A524A]">
                    {isVi
                      ? 'Vải bạt chống nước thoáng khí, có dây rút cố định cho các mùa mưa tuyết kéo dài.'
                      : 'Breathable, water-resistant heavy-duty outdoor fabric covers designed to fit each B+Open seating and dining set.'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE3D2] flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveModal(null);
                    onNavigate('showrooms', { tab: 'retailers' });
                  }}
                  className="px-6 py-2.5 bg-[#ae5c4a] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-[#974b3a] transition-colors"
                >
                  {isVi ? 'Tìm Đại Lý Để Mua Hàng' : 'Find Retailer to Order'}
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 bg-gray-200 text-[#1C1A17] text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-gray-300"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL: CONTACT FORM */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => {
                setActiveModal(null);
                setContactSuccess(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {contactSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1C1A17]">
                  {isVi ? 'Cảm Ơn Bạn Đã Liên Hệ!' : 'Message Sent Successfully!'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A524A]">
                  {isVi
                    ? 'Đội ngũ Dịch Vụ Khách Hàng B+Open sẽ phản hồi lại bạn trong vòng 1 ngày làm việc.'
                    : 'A B+Open customer representative will follow up with you within 1 business day.'}
                </p>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setContactSuccess(false);
                  }}
                  className="px-6 py-2.5 bg-[#1C1A17] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSuccess(true);
                }}
                className="space-y-4 text-left"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                    {isVi ? 'Gửi Yêu Cầu Hỗ Trợ' : 'Get In Touch'}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#1C1A17] mt-1">
                    {isVi ? 'Liên Hệ Dịch Vụ Khách Hàng' : 'Contact Customer Service'}
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1A17] mb-1">
                    {isVi ? 'Họ và tên *' : 'Full Name *'}
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#DCD3C0] rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1C1A17] mb-1">
                      {isVi ? 'Email *' : 'Email Address *'}
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-2.5 text-xs bg-white border border-[#DCD3C0] rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1C1A17] mb-1">
                      {isVi ? 'Số điện thoại' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 text-xs bg-white border border-[#DCD3C0] rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1A17] mb-1">
                    {isVi ? 'Chủ đề quan tâm' : 'Inquiry Type'}
                  </label>
                  <select className="w-full px-4 py-2.5 text-xs bg-white border border-[#DCD3C0] rounded-xs focus:outline-none focus:border-[#ae5c4a]">
                    <option>{isVi ? 'Hướng dẫn bảo dưỡng gỗ Ipe' : 'Ipe Wood Maintenance'}</option>
                    <option>{isVi ? 'Đặt mua vật phẩm bảo dưỡng' : 'Ordering Care Supplies'}</option>
                    <option>{isVi ? 'Hỏi về chế độ bảo hành' : 'Warranty Questions'}</option>
                    <option>{isVi ? 'Chương trình Trade / Dự án' : 'Trade Program / Commercial'}</option>
                    <option>{isVi ? 'Khác' : 'Other General Inquiries'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1A17] mb-1">
                    {isVi ? 'Nội dung tin nhắn *' : 'Message *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#DCD3C0] rounded-xs focus:outline-none focus:border-[#ae5c4a]"
                    placeholder={isVi ? 'Vui lòng mô tả chi tiết thắc mắc của bạn...' : 'Please describe your request in detail...'}
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-gray-200 text-[#1C1A17] text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-gray-300"
                  >
                    {isVi ? 'Hủy' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#ae5c4a] hover:bg-[#974b3a] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer shadow-sm transition-colors"
                  >
                    {isVi ? 'Gửi Tin Nhắn' : 'Submit Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 6. MODAL: WARRANTY */}
      {activeModal === 'warranty' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#EAE3D2] max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE3D2] hover:bg-[#DCD3C0] flex items-center justify-center text-[#1C1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ae5c4a]">
                  {isVi ? 'Cam Kết Chất Lượng' : 'Warranty Policy'}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1C1A17] mt-1">
                  {isVi ? 'Chính Sách Bảo Hành Di Sản B+Open' : 'B+Open Limited Warranty'}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Bảo Hành Khung Gỗ Ipe (5 Năm Dân Dụng / 3 Năm Dự Án)' : 'Ipe Timber Frames (5-Year Residential / 3-Year Commercial)'}
                  </div>
                  <p>
                    {isVi
                      ? 'B+Open bảo hành mọi lỗi vật liệu và gia công liên kết mộng gỗ trong 5 năm đối với mục đích sử dụng dân dụng.'
                      : 'Warranted to be free from structural defects in materials and craftsmanship for 5 years in residential installations.'}
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs">
                  <div className="font-bold text-[#1C1A17] mb-1">
                    {isVi ? 'Vải Sunbrella® & Sợi Viro® (5 Năm Kháng Phai Màu)' : 'Sunbrella® Fabrics & Viro® Fiber (5-Year Fade Resistance)'}
                  </div>
                  <p>
                    {isVi
                      ? 'Được bảo hành 5 năm không bị mất màu do tiếp xúc ánh nắng mặt trời và thời tiết tự nhiên.'
                      : 'Warranted against becoming unserviceable due to color or strength loss from normal usage and exposure conditions.'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#EAE3D2]">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 bg-[#1C1A17] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
