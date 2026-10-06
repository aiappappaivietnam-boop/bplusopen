import React from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { JensenLeafLogo } from '../components/JensenLeafLogo';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { InlineEditableImage } from '../components/InlineEditableImage';

interface DesignPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
}

export const DesignPage: React.FC<DesignPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // Exploration cards at the bottom matching official Jensen Outdoor site
  const storyCards = [
    {
      id: 'sustainability',
      title: 'SUSTAINABILITY',
      titleVi: 'PHÁT TRIỂN BỀN VỮNG',
      image: '/sustainability/cards/design.png',
      alt: 'B+Open design and outdoor living',
      action: () => onNavigate('sustainability'),
    },
    {
      id: 'materials',
      title: 'MATERIALS',
      titleVi: 'CHẤT LIỆU',
      image: '/sustainability/cards/materials.png',
      alt: 'B+Open outdoor furniture materials',
      action: () => onNavigate('materials'),
    },
    {
      id: 'craftsmanship',
      title: 'CRAFTSMANSHIP',
      titleVi: 'KỸ THUẬT CHẾ TÁC',
      image: '/sustainability/cards/craftsmanship.png',
      alt: 'B+Open craftsmanship and joinery',
      action: () => {
        onNavigate('story');
        setTimeout(() => {
          const el = document.getElementById('materials-ipe');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
    },
    {
      id: 'product-care',
      title: 'PRODUCT CARE',
      titleVi: 'BẢO QUẢN SẢN PHẨM',
      image: '/sustainability/cards/product-care.png',
      alt: 'B+Open product care',
      action: () => onNavigate('care'),
    },
  ];

  return (
    <div className="bg-white text-[#1C1A17] selection:bg-[#5C3822] selection:text-white font-sans animate-in fade-in duration-300">
      
      {/* 1. TOP BRAND HEADER / BREADCRUMB BAR */}
      <div className="bg-[#14232C] text-white py-3 px-4 border-b border-white/10 flex items-center justify-between">
        <button
          onClick={() => onNavigate('story')}
          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isVi ? 'Quay lại Câu chuyện thương hiệu' : 'Back to Our Story'}</span>
        </button>

        <div className="flex items-center gap-2 select-none">
          <img
            src="/logo-b-open.png"
            alt="B+Open Logo"
            className="h-6 w-auto object-contain"
          />
        </div>

        <div className="text-[11px] text-white/60 tracking-wider hidden sm:block">
          {isVi ? 'KHÁM PHÁ QUY TRÌNH THIẾT KẾ' : 'EXPLORE THE DESIGN PROCESS'}
        </div>
      </div>

      {/* 2. HERO BANNER: "OUR STORY: DESIGN" (Matching Screenshot 1) */}
      <section className="relative w-full overflow-hidden bg-[#24211E]">
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] lg:h-[680px]">
          {/* B+Open design process image supplied for the Design page */}
          <InlineEditableImage record="collection" recordId="design" field="heroImage" value="/design/design-banner.png" alt="B+Open furniture design sketches and material samples" className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-105" />
          {/* Subtle dark vignette overlay for typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />

          {/* Centered headline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center select-none">
            <span className="text-white text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] sm:tracking-[0.32em] uppercase mb-2 drop-shadow-md text-white/90">
              {isVi ? 'KHÁM PHÁ QUY TRÌNH' : 'EXPLORE THE PROCESS'}
            </span>
            <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.22em] sm:tracking-[0.28em] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              {isVi ? 'THIẾT KẾ' : 'DESIGN'}
            </h1>
          </div>
        </div>
      </section>

      {/* 3. SECTION: UNDERSTANDING HOW THE PRODUCT IS USED */}
      <section className="bg-white py-14 sm:py-20 border-b border-[#EAE6E1]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1C1A17]">
            {isVi ? 'ĐOẠN 1' : 'PART 1'}
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
            {isVi ? 'HIỂU NHU CẦU SỬ DỤNG' : 'UNDERSTANDING HOW THE PRODUCT IS USED'}
          </h2>
          
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal text-center max-w-2xl mx-auto">
            <div className="grid gap-8 text-left md:grid-cols-[auto_1fr] md:items-start md:gap-10">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1C1A17]">
                {isVi ? 'HIỂU NHU CẦU SỬ DỤNG' : 'UNDERSTANDING HOW THE PRODUCT IS USED'}
              </p>
              <p>
                {isVi
                  ? 'Mỗi thiết kế bắt đầu từ cách sản phẩm được sử dụng trong thực tế. B+Open nghiên cứu thói quen, không gian và đặc thù của nội thất ngoài trời để xác định yêu cầu về kích thước, công năng và trải nghiệm sử dụng.'
                  : 'Every design begins with how the product will be used in real life. B+Open studies habits, spaces and the specific demands of outdoor furniture to define the right dimensions, function and user experience.'}
              </p>
              <div className="mt-2 md:col-start-2">
                <InlineEditableContent
                  contentKey="design.part1.formTitle"
                  value={isVi ? 'HÌNH THỨC ĐI CÙNG CÔNG NĂNG' : 'FORM FOLLOWS FUNCTION'}
                  as="h3"
                  className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-[#1C1A17]"
                  label="Design part 1 form title"
                />
                <InlineEditableContent
                  contentKey="design.part1.formDescription"
                  value={isVi
                    ? 'Từ những yêu cầu ban đầu, thiết kế được phát triển với sự cân bằng giữa tỷ lệ, hình dáng và công năng. Các chi tiết không chỉ tạo nên ngôn ngữ riêng cho sản phẩm mà còn phục vụ trực tiếp cho sự thoải mái và khả năng sử dụng.'
                    : 'From the initial requirements, each design is developed with a balance of proportion, form and function. Details do more than create a distinct product language; they directly support comfort and usability.'}
                  as="p"
                  multiline
                  className="text-sm leading-relaxed text-[#2C2A29] sm:text-base"
                  label="Design part 1 form description"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IMAGE WITH OVERLAY BOX: "OUR PROCESS" (Matching Screenshot 2) */}
      <section className="bg-white pt-6 pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Photo with Floating Text Card */}
          <div className="relative w-full overflow-hidden shadow-sm border border-[#E8E4DD] rounded-xs">
            {/* Testing and refinement image supplied for the Design page */}
            <div className="relative h-[360px] sm:h-[480px] md:h-[560px] lg:h-[620px] overflow-hidden">
              <InlineEditableImage
                record="collection"
                recordId="design-testing"
                field="heroImage"
                value="/design/design-testing.png"
                alt="B+Open furniture prototype being tested and refined"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Floating White Overlay Card on top-left */}
            <div className="absolute top-6 left-6 sm:top-10 sm:left-10 max-w-[340px] sm:max-w-md bg-white/95 backdrop-blur-xs p-6 sm:p-8 shadow-lg border border-black/5">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1A17]">
                {isVi ? 'ĐOẠN 3' : 'PART 3'}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#1C1A17] uppercase tracking-[0.08em] mb-3">
                {isVi ? 'THỬ NGHIỆM VÀ ĐIỀU CHỈNH' : 'TESTING AND REFINEMENT'}
              </h3>
              <p className="text-xs sm:text-sm text-[#2C2A29] leading-relaxed font-normal">
                {isVi
                  ? 'Ý tưởng được kiểm tra qua mẫu thử và nhiều vòng đánh giá trước khi hoàn thiện. Từ cảm giác sử dụng, độ ổn định đến từng chi tiết kết cấu, mọi yếu tố đều được điều chỉnh để đảm bảo thiết kế hoạt động đúng như mục tiêu ban đầu.'
                  : 'Ideas are tested through prototypes and multiple rounds of review before completion. From the user experience and stability to every structural detail, each element is refined to ensure the design performs as intended.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. DARK CONTRAST SECTION: DESIGN CONNECTED TO ENGINEERING */}
      <section className="bg-[#141414] text-white py-16 sm:py-24 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            
            {/* Left Column: Text */}
            <div className="space-y-4 text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CDBAA8] block">
                {isVi ? 'ĐOẠN 4' : 'PART 4'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
                {isVi ? 'THIẾT KẾ GẮN VỚI KỸ THUẬT' : 'DESIGN CONNECTED TO ENGINEERING'}
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal pt-2">
                {isVi
                  ? 'Thiết kế và kỹ thuật được phát triển song song để đảm bảo sản phẩm có thể được sản xuất chính xác và ổn định. Các xử lý kết cấu, mối nối, bề mặt và các chi tiết lắp ráp được tính toán ngay từ quá trình thiết kế.'
                  : 'Design and engineering are developed in parallel to ensure products can be produced accurately and consistently. Structural solutions, joints, surfaces and assembly details are considered from the earliest stage of design.'}
              </p>
            </div>

            {/* Right Column: Photo of Designer Sketching Blueprints & Miniature Models */}
            <div className="relative overflow-hidden shadow-2xl border border-white/10 rounded-xs">
              <InlineEditableImage
                record="collection"
                recordId="design-technique"
                field="heroImage"
                value="/design/design-technique.png"
                alt="B+Open furniture being shaped with workshop tools"
                className="w-full h-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />
            </div>

          </div>
        </div>
      </section>

      {/* 6. CRAFTSMANSHIP */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12 text-center">
          
          {/* Part A: Our Craftsmanship */}
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
              {isVi ? 'TAY NGHỀ CHẾ TÁC CỦA CHÚNG TÔI' : 'OUR CRAFTSMANSHIP'}
            </h2>
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal max-w-2xl mx-auto">
              <p>
                {isVi
                  ? 'Tay nghề chế tác là cầu nối giữa ý tưởng thiết kế và sản phẩm hoàn thiện. Chúng tôi chú trọng độ chính xác trong gia công, sự ổn định của kết cấu và chất lượng của từng bề mặt để sản phẩm đáp ứng nhu cầu sử dụng lâu dài.'
                  : 'Craftsmanship connects a design concept to the finished product. We focus on precision, structural stability and the quality of every surface so each piece can serve its purpose over time.'}
              </p>
            </div>
          </div>

          {/* Part C: Call To Action (Ready to see, feel, and touch...) */}
          <div className="pt-10 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-[#1C1A17]">
              {isVi 
                ? 'Sẵn sàng để tự mình chiêm ngưỡng, cảm nhận và chạm vào B+Open?'
                : 'Ready to see, feel, and touch B+Open for yourself?'}
            </h3>
            <div>
              <button
                onClick={() => onNavigate('showrooms')}
                className="inline-block px-10 py-3.5 bg-[#D6C5B3] hover:bg-[#C5B29E] text-[#1C1A17] text-xs font-bold uppercase tracking-[0.2em] shadow-xs hover:shadow-md transition-all cursor-pointer rounded-xs"
              >
                {isVi ? 'TÌM ĐẠI LÝ PHÂN PHỐI' : 'FIND A RETAILER'}
              </button>
            </div>
            <p className="text-xs text-[#5C5955] tracking-wide">
              {isVi ? 'mua sắm tại cửa hàng hoặc đặt lịch hẹn trực tuyến' : 'shop in store or by virtual appointment'}
            </p>
          </div>

        </div>
      </section>

      {/* 7. BOTTOM EXPLORATION CARDS CAROUSEL (Matching Screenshot 3) */}
      <section className="bg-[#F8F6F2] py-14 sm:py-20 border-t border-[#EAE4DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {storyCards.map((card) => (
              <div
                key={card.id}
                onClick={card.action}
                className="group relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-xs cursor-pointer shadow-xs border border-black/10 hover:shadow-md transition-all duration-300"
              >
                {/* Background Image */}
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 group-hover:via-black/20 transition-colors" />

                {/* Optional Brand Logo on Sustainability card */}
                {card.hasLogo && (
                  <div className="absolute inset-0 flex items-center justify-center pb-6 pointer-events-none">
                    <img
                      src="/logo-b-open.png"
                      alt="B+Open Logo"
                      className="h-16 sm:h-20 w-auto max-w-[200px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                )}

                {/* Title Banner at Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-center">
                  <h3 className="text-white text-xs sm:text-sm font-bold tracking-[0.18em] uppercase drop-shadow-sm">
                    {isVi ? card.titleVi : card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Arrows on Sides as shown in screenshot */}
          <div className="hidden lg:flex items-center justify-between absolute -inset-x-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <button
              onClick={() => onNavigate('sustainability')}
              className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-black/70 hover:text-black shadow-md transition-all cursor-pointer"
              aria-label="Previous story section"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('materials')}
              className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-black/70 hover:text-black shadow-md transition-all cursor-pointer"
              aria-label="Next story section"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
