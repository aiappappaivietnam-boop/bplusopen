import React from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { JensenLeafLogo } from '../components/JensenLeafLogo';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { InlineEditableImage } from '../components/InlineEditableImage';

interface SustainabilityPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  // The 4 exploration cards at the bottom matching official Jensen Outdoor site
  const storyCards: {
    id: string;
    title: string;
    titleVi: string;
    image: string;
    alt: string;
    hasLogo?: boolean;
    action: () => void;
  }[] = [
    {
      id: 'design',
      title: 'DESIGN',
      titleVi: 'THIẾT KẾ',
      image: '/sustainability/cards/design.png',
      alt: 'Drafting and designing furniture prototypes',
      action: () => onNavigate('design'),
    },
    {
      id: 'materials',
      title: 'MATERIALS',
      titleVi: 'CHẤT LIỆU',
      image: '/sustainability/cards/materials.png',
      alt: 'Outdoor dining furniture and hardwood materials',
      action: () => onNavigate('materials'),
    },
    {
      id: 'craftsmanship',
      title: 'CRAFTSMANSHIP',
      titleVi: 'KỸ THUẬT CHẾ TÁC',
      image: '/sustainability/cards/craftsmanship.png',
      alt: 'Artisan wood bench and mortise joinery',
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
      alt: 'Outdoor patio lounge sofa furniture',
      action: () => onNavigate('care'),
    },
  ];

  return (
    <div className="bg-white text-[#1C1A17] selection:bg-[#9B522E] selection:text-white font-sans animate-in fade-in duration-300">
      
      {/* 1. TOP BRAND HEADER / BREADCRUMB BAR */}
      <div className="bg-[#1C241E] text-white py-3 px-4 border-b border-white/10 flex items-center justify-between">
        <button
          onClick={() => onNavigate('story')}
          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-[#DED9CD] transition-colors cursor-pointer"
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

        <div className="hidden sm:block">
          <span className="px-2.5 py-0.5 rounded-full bg-[#737D5A] text-white text-[10px] font-bold tracking-wider uppercase">
            {isVi ? 'CHỨNG NHẬN FSC® C013910' : 'FSC® C013910 CERTIFIED'}
          </span>
        </div>
      </div>

      {/* 2. HERO BANNER: "OUR STORY: SUSTAINABILITY" (Matching Screenshot 1) */}
      <section className="relative w-full overflow-hidden bg-[#1B271F]">
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] lg:h-[680px]">
          {/* Official Jensen Outdoor Chiquitania rainforest canopy photograph */}
          <InlineEditableImage record="collection" recordId="sustainability" field="heroImage" value="/sustainability/sustainability-slide-new.png" alt="Bolivian Chiquitania Rainforest Canopy at Dawn - B+Open" className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-105" />
          {/* Vignette & overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/45" />

          {/* Centered headline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center select-none">
            <span className="text-white text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] sm:tracking-[0.32em] uppercase mb-2 drop-shadow-md text-white/90">
              {isVi ? 'CÂU CHUYỆN CỦA CHÚNG TÔI:' : 'OUR STORY:'}
            </span>
            <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.22em] sm:tracking-[0.28em] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              {isVi ? 'PHÁT TRIỂN BỀN VỮNG' : 'SUSTAINABILITY'}
            </h1>
          </div>
        </div>
      </section>

      {/* 3. SECTION: DESIGN FOR LASTING VALUE */}
      <section className="bg-white py-14 sm:py-20 border-b border-[#EAE6E1]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
            {isVi ? 'THIẾT KẾ CHO GIÁ TRỊ LÂU DÀI' : 'DESIGNED FOR LASTING VALUE'}
          </h2>
          
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal text-center max-w-2xl mx-auto">
            <p>
              {isVi
                ? 'B+Open hướng đến những thiết kế có tính ứng dụng cao, phù hợp với nhu cầu sử dụng thực tế và không phụ thuộc vào xu hướng ngắn hạn. Sản phẩm được phát triển với mục tiêu duy trì giá trị về công năng và thẩm mỹ trong thời gian dài.'
                : 'B+Open creates highly functional designs for real use, made to remain relevant beyond short-lived trends. Each product is developed with long-term thinking about both performance and aesthetics.'}
            </p>
            <p>
              {isVi
                ? 'Giá trị của sản phẩm được xây dựng từ khả năng đồng hành lâu dài cùng không gian và người sử dụng.'
                : 'A product’s value is built through its ability to serve a space and its users for years to come.'}
            </p>
          </div>
        </div>
      </section>

      {/* 4. LANDSCAPE IMAGE: BOLIVIAN FSC® CERTIFIED FORESTS (Matching Screenshot 2) */}
      <section className="bg-white">
        <div className="w-full">
          <div className="relative w-full h-[320px] sm:h-[460px] md:h-[600px] lg:h-[720px] overflow-hidden">
            <img
              src="/sustainability/sustainability-slide-middle.png"
              alt="B+Open material moodboard"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Image caption */}
          <div className="py-3 px-4 text-center">
            <p className="text-xs sm:text-[13px] text-[#4A4744] italic tracking-wide">
                {isVi
                ? '(Không gian và chất liệu định hình nên thiết kế B+Open)'
                : '(Spaces and materials that shape B+Open design)'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. SECTION: WE KNOW THE SOURCE OF OUR TIMBER & FEEL GOOD FURNITURE (Matching Screenshot 2) */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12 text-center">
          
          {/* Part A: CHOOSING THE RIGHT MATERIALS */}
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
              {isVi ? 'LỰA CHỌN VẬT LIỆU PHÙ HỢP' : 'CHOOSING THE RIGHT MATERIALS'}
            </h2>
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal max-w-2xl mx-auto">
              <p>
                {isVi
                  ? 'Mỗi vật liệu được cân nhắc dựa trên đặc tính sử dụng, độ bền và khả năng đáp ứng điều kiện ngoài trời. Việc lựa chọn đúng vật liệu ngay từ đầu giúp sản phẩm ổn định hơn trong quá trình sử dụng và hạn chế nhu cầu thay mới.'
                  : 'Every material is considered for its performance, durability and ability to meet outdoor conditions. Choosing the right material from the beginning helps products perform consistently and reduces the need for replacement.'}
              </p>
              <p>
                {isVi
                  ? 'Chất liệu được chọn để cân bằng giữa vẻ đẹp, công năng và sự bền bỉ trong từng không gian sống.'
                  : 'Materials are selected to balance beauty, performance and durability in every living space.'}
              </p>
            </div>
          </div>

          {/* Part B: OPTIMIZED THROUGH PRODUCTION */}
          <div className="space-y-6 pt-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
              {isVi ? 'TỐI ƯU TRONG QUÁ TRÌNH SẢN XUẤT' : 'OPTIMIZED THROUGH PRODUCTION'}
            </h2>
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal max-w-2xl mx-auto">
              <p>
                {isVi
                  ? 'B+Open chú trọng các bước từ phát triển sản phẩm đến gia công và hoàn thiện, nhằm sử dụng nguồn lực hiệu quả và hạn chế phát sinh không cần thiết trong quá trình sản xuất. Tư duy tối ưu được đưa vào cả thiết kế, kỹ thuật và quy trình thực hiện.'
                  : 'B+Open focuses on every stage from product development through fabrication and finishing, using resources efficiently and avoiding unnecessary waste. Optimization is built into the design, engineering and production process.'}
              </p>
              <p>
                {isVi
                  ? 'Mỗi bước đều được cân nhắc để giữ trọn chất lượng sản phẩm và giá trị của vật liệu.'
                  : 'Every step is considered to preserve the quality of the product and the value of its materials.'}
              </p>
              <p>
                {isVi
                  ? 'Đó là cách chúng tôi tạo ra những sản phẩm có chất lượng ổn định và phù hợp với nhu cầu sử dụng thực tế.'
                  : 'This is how we create products with consistent quality for real-world use.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. PATIO DINING SET IMAGE (Matching Screenshot 3) */}
      <section className="bg-white">
        <div className="w-full">
          <div className="relative w-full h-[320px] sm:h-[460px] md:h-[600px] lg:h-[720px] overflow-hidden">
            <img
              src="/sustainability/sustainability-slide-final.png"
              alt="Detailed sustainable outdoor furniture construction"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Caption */}
          <div className="py-3 px-4 text-center">
            <p className="text-xs sm:text-[13px] text-[#4A4744] italic tracking-wide">
                {isVi
                ? '(Chi tiết vật liệu và kỹ thuật hoàn thiện của B+Open)'
                : '(B+Open material and finishing detail)'}
            </p>
          </div>
        </div>
      </section>

      {/* 7. SECTION: ACCOUNTABLY FSC®-CERTIFIED (Matching Screenshot 3) */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.08em] text-[#1C1A17]">
            {isVi ? 'HƯỚNG ĐẾN VÒNG ĐỜI SẢN PHẨM DÀI HƠN' : 'TOWARD A LONGER PRODUCT LIFE'}
          </h2>
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#2C2A29] font-normal max-w-2xl mx-auto">
            <p>
                {isVi
                ? 'Chúng tôi quan tâm đến giá trị của sản phẩm trong suốt quá trình sử dụng, từ độ bền đến khả năng bảo trì và duy trì chất lượng theo thời gian. Mục tiêu là tạo ra những sản phẩm có thể sử dụng lâu dài, thay vì chỉ đáp ứng nhu cầu trong ngắn hạn.'
                : 'We consider a product’s value throughout its life, from durability and maintenance to its ability to retain quality over time. The goal is to create products that meet real needs for many years.'}
            </p>
            <p>
                {isVi
                ? 'Từ thiết kế, lựa chọn vật liệu đến kỹ thuật sản xuất, mỗi quyết định đều hướng đến một vòng đời bền bỉ hơn và giảm nhu cầu thay mới.'
                : 'From design and material selection to production, every decision is made to support a longer product life and reduce the need for replacement.'}
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onNavigate('furniture')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1C1A17] hover:bg-[#3D2C22] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer rounded-xs"
            >
              <span>{isVi ? 'Khám Phá Các Bộ Sưu Tập FSC®' : 'Explore FSC® Certified Furniture'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM EXPLORATION CARDS CAROUSEL (Matching Screenshot 3) */}
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

                {/* Optional Brand Logo (like on Sustainability card) */}
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
              onClick={() => onNavigate('story')}
              className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-black/70 hover:text-black shadow-md transition-all cursor-pointer"
              aria-label="Previous story section"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('care')}
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
