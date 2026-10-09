import React, { useRef, useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  BookOpen,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { StoryVideoModal } from '../components/StoryVideoModal';
import { LookbookModal } from '../components/LookbookModal';
import { VirtualShowroomModal } from '../components/VirtualShowroomModal';
import { CatalogDownloadModal } from '../components/CatalogDownloadModal';
import { InlineEditableText } from '../components/InlineEditableText';
import { InlineEditableImage } from '../components/InlineEditableImage';
import { useCatalogData } from '../context/CatalogDataContext';

interface HomePageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string; productId?: string; tab?: string }) => void;
}

interface CollectionCardData {
  id: string;
  name: string;
  nameVi: string;
  badge?: string;
  badgeVi?: string;
  description: string;
  descriptionVi: string;
  image: string;
  targetCollection: string;
}

interface CategoryCardData {
  id: string;
  title: string;
  titleVi: string;
  subtitle: string;
  subtitleVi: string;
  label: string;
  image: string;
  route: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const { collections, edits, isAdminAuthenticated, isEditMode, hideHomeCollection } = useCatalogData();

  // Modals state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);
  const [isCatalogDownloadOpen, setIsCatalogDownloadOpen] = useState(false);
  const [isVirtualShowroomOpen, setIsVirtualShowroomOpen] = useState(false);

  // Background Forest Video Auto-play State (Section 3: From our forest to your family)
  const forestVideoRef = useRef<HTMLVideoElement>(null);
  const [isForestVideoPlaying, setIsForestVideoPlaying] = useState(true);
  const [isForestVideoMuted, setIsForestVideoMuted] = useState(true);

  // Background Catalog Video Auto-play State (Section 5: The 2026 Season Catalog)
  const catalogVideoRef = useRef<HTMLVideoElement>(null);
  const [isCatalogVideoPlaying, setIsCatalogVideoPlaying] = useState(true);
  const [isCatalogVideoMuted, setIsCatalogVideoMuted] = useState(true);

  // Carousel refs
  const collectionsScrollRef = useRef<HTMLDivElement>(null);
  const categoriesScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forestVideoRef.current) {
      forestVideoRef.current.play().catch(() => {});
    }
    if (catalogVideoRef.current) {
      catalogVideoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleForestPlayback = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (forestVideoRef.current) {
      if (forestVideoRef.current.paused) {
        forestVideoRef.current.play();
        setIsForestVideoPlaying(true);
      } else {
        forestVideoRef.current.pause();
        setIsForestVideoPlaying(false);
      }
    }
  };

  const toggleForestMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (forestVideoRef.current) {
      forestVideoRef.current.muted = !forestVideoRef.current.muted;
      setIsForestVideoMuted(forestVideoRef.current.muted);
    }
  };

  const toggleCatalogPlayback = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (catalogVideoRef.current) {
      if (catalogVideoRef.current.paused) {
        catalogVideoRef.current.play();
        setIsCatalogVideoPlaying(true);
      } else {
        catalogVideoRef.current.pause();
        setIsCatalogVideoPlaying(false);
      }
    }
  };

  const toggleCatalogMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (catalogVideoRef.current) {
      catalogVideoRef.current.muted = !catalogVideoRef.current.muted;
      setIsCatalogVideoMuted(catalogVideoRef.current.muted);
    }
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Only the currently published B+OPEN collections are shown here.
  const COLLECTIONS_LIST: CollectionCardData[] = [
    {
      id: 'luma',
      name: 'LUMA',
      nameVi: 'LUMA',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'Natural teak, woven cord, and powder-coated metal for contemporary outdoor living.',
      descriptionVi: 'Gỗ teak tự nhiên, dây đan và kim loại sơn tĩnh điện cho không gian ngoài trời đương đại.',
      image: '/luma/scene-3.webp',
      targetCollection: 'luma',
    },
    {
      id: 'lumino',
      name: 'LUMINO',
      nameVi: 'LUMINO',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'Clean, lightweight aluminum seating and dining for modern outdoor spaces.',
      descriptionVi: 'Hệ sản phẩm nhôm gọn nhẹ cho không gian lounge và dining ngoài trời hiện đại.',
      image: '/lumino-profile/scene-2.webp',
      targetCollection: 'lumino',
    },
    {
      id: 'bloom',
      name: 'BLOOM',
      nameVi: 'BLOOM',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'Soft, rounded forms in durable molded composite for outdoor living.',
      descriptionVi: 'Dáng cong mềm mại từ composite đúc bền bỉ cho không gian ngoài trời.',
      image: '/poly-bloom/scene-2.webp',
      targetCollection: 'bloom',
    },
    {
      id: 'serenity',
      name: 'SERENITY',
      nameVi: 'SERENITY',
      badge: 'NEW',
      badgeVi: 'MỚI',
      description: 'Clean, refined aluminum furniture for peaceful contemporary outdoor living.',
      descriptionVi: 'Nội thất nhôm tinh gọn, thanh lịch cho không gian ngoài trời đương đại an yên.',
      image: '/serenity/catalog-02.jpg',
      targetCollection: 'serenity',
    },
  ];

  // 12 product categories supplied for the B+OPEN catalog navigation.
  const CATEGORIES_LIST: CategoryCardData[] = [
    {
      id: 'cat-coming-soon',
      title: '01. COMING SOON',
      titleVi: '01. COMING SOON',
      subtitle: 'New designs arriving soon ⇁',
      subtitleVi: 'Những thiết kế mới sắp ra mắt ⇁',
      label: '01',
      image: '/uploads/categories/coming-soon.png',
      route: () => onNavigate('furniture'),
    },
    {
      id: 'cat-special-story',
      title: '02. SPECIAL STORY',
      titleVi: '02. SPECIAL STORY',
      subtitle: 'A story behind every piece ⇁',
      subtitleVi: 'Câu chuyện phía sau từng thiết kế ⇁',
      label: '02',
      image: '/uploads/categories/special-story.png',
      route: () => onNavigate('story'),
    },
    {
      id: 'cat-coffee-table',
      title: '03. COFFEE TABLE',
      titleVi: '03. COFFEE TABLE',
      subtitle: 'Low tables for outdoor gathering ⇁',
      subtitleVi: 'Bàn thấp cho những cuộc gặp ngoài trời ⇁',
      label: '03',
      image: '/uploads/categories/coffee-table.png',
      route: () => onNavigate('furniture', { category: 'tables' }),
    },
    {
      id: 'cat-side-table',
      title: '04. SIDE TABLE',
      titleVi: '04. SIDE TABLE',
      subtitle: 'Refined accents for every setting ⇁',
      subtitleVi: 'Điểm nhấn tinh tế cho mọi không gian ⇁',
      label: '04',
      image: '/uploads/categories/side-table.png',
      route: () => onNavigate('furniture', { category: 'tables' }),
    },
    {
      id: 'cat-sofa',
      title: '05. SOFA',
      titleVi: '05. SOFA',
      subtitle: 'Deep comfort for open-air living ⇁',
      subtitleVi: 'Thư giãn sâu cho không gian ngoài trời ⇁',
      label: '05',
      image: '/uploads/categories/sofa.png',
      route: () => onNavigate('furniture', { category: 'deep-seating' }),
    },
    {
      id: 'cat-armchair-lounge-chair',
      title: '06. ARMCHAIR / LOUNGE CHAIR',
      titleVi: '06. ARMCHAIR / LOUNGE CHAIR',
      subtitle: 'Signature seating, made to linger ⇁',
      subtitleVi: 'Những thiết kế ghế đặc trưng để thư giãn ⇁',
      label: '06',
      image: '/uploads/categories/armchair-lounge-chair.png',
      route: () => onNavigate('furniture', { category: 'deep-seating' }),
    },
    {
      id: 'cat-bench',
      title: '07. BENCH',
      titleVi: '07. BENCH',
      subtitle: 'Versatile seating for shared moments ⇁',
      subtitleVi: 'Chỗ ngồi linh hoạt cho những khoảnh khắc sum vầy ⇁',
      label: '07',
      image: '/uploads/categories/bench.png',
      route: () => onNavigate('furniture', { category: 'accessories' }),
    },
    {
      id: 'cat-dining-chair',
      title: '08. DINING CHAIR',
      titleVi: '08. DINING CHAIR',
      subtitle: 'Comfort around the table ⇁',
      subtitleVi: 'Thoải mái quanh bàn ăn ⇁',
      label: '08',
      image: '/uploads/categories/dining-chair.png',
      route: () => onNavigate('furniture', { category: 'dining' }),
    },
    {
      id: 'cat-dining-table',
      title: '09. DINING TABLE',
      titleVi: '09. DINING TABLE',
      subtitle: 'A considered setting for every meal ⇁',
      subtitleVi: 'Không gian chỉn chu cho mọi bữa ăn ⇁',
      label: '09',
      image: '/uploads/categories/dining-table.png',
      route: () => onNavigate('furniture', { category: 'dining' }),
    },
    {
      id: 'cat-bar-stool',
      title: '10. BAR STOOL',
      titleVi: '10. BAR STOOL',
      subtitle: 'Elevated seating for relaxed entertaining ⇁',
      subtitleVi: 'Chỗ ngồi cao cho những buổi tiếp đãi thư thái ⇁',
      label: '10',
      image: '/uploads/categories/bar-stool.png',
      route: () => onNavigate('furniture', { category: 'dining' }),
    },
    {
      id: 'cat-bar-table',
      title: '11. BAR TABLE',
      titleVi: '11. BAR TABLE',
      subtitle: 'Gather, perch, and stay awhile ⇁',
      subtitleVi: 'Quây quần, trò chuyện và tận hưởng lâu hơn ⇁',
      label: '11',
      image: '/uploads/categories/bar-table.png',
      route: () => onNavigate('furniture', { category: 'tables' }),
    },
    {
      id: 'cat-daybed',
      title: '12. DAYBED',
      titleVi: '12. DAYBED',
      subtitle: 'Unwind in your own outdoor retreat ⇁',
      subtitleVi: 'Thư giãn trong không gian nghỉ riêng ngoài trời ⇁',
      label: '12',
      image: '/uploads/categories/daybed.png',
      route: () => onNavigate('furniture', { category: 'deep-seating' }),
    },
  ];

  return (
    <div className="space-y-0 bg-[#F8F6F2] text-[#1C1A17] selection:bg-[#9B522E] selection:text-white">
      {/* 1. HERO SLIDER SECTION (4 featured slides) */}
      <Hero onNavigate={onNavigate} />

      {/* 2. SECTION: DISCOVER OUR COLLECTIONS */}
      <section className="py-14 sm:py-20 lg:py-24 relative border-b border-[#DED9CD] bg-white">
        {/* Section Header matching exact website typography */}
        <div className="text-center max-w-3xl mx-auto px-4 mb-8 sm:mb-12">
          <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.14em] text-[#1C1A17] uppercase">
            {isVi ? 'KHÁM PHÁ CÁC BỘ SƯU TẬP' : 'DISCOVER OUR COLLECTIONS'}
          </h3>
          <p className="mt-3">
            <button
              onClick={() => onNavigate('collections')}
              className="inline-flex items-center text-sm sm:text-base uppercase tracking-wider text-[#1C1A17] hover:text-[#9B522E] underline underline-offset-4 font-bold cursor-pointer transition-colors min-h-[40px]"
            >
              {isVi ? 'Xem tất cả bộ sưu tập' : 'Or see them all'}
            </button>
          </p>
        </div>

        {/* Carousel Container with Edge Navigation Chevrons */}
        <div className="relative group/track max-w-[1520px] mx-auto">
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollContainer(collectionsScrollRef, 'left')}
            className="absolute left-2 sm:left-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-[#1C1A17] border border-[#DED9CD] shadow-md hover:shadow-xl flex items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100"
            aria-label="Previous collections"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollContainer(collectionsScrollRef, 'right')}
            className="absolute right-2 sm:right-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-[#1C1A17] border border-[#DED9CD] shadow-md hover:shadow-xl flex items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100"
            aria-label="Next collections"
          >
            <ChevronRight className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Horizontal Scrolling Card Track */}
          <div
            ref={collectionsScrollRef}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scroll-smooth px-4 sm:px-14 pb-4 pt-1 no-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {COLLECTIONS_LIST.filter((col) => !(edits.hiddenHomeCollectionIds || []).includes(col.id)).map((col) => (
              <div
                key={col.id}
                id={`home-collection-${col.id}`}
                onClick={() => onNavigate('collections', { collection: col.targetCollection })}
                className="relative w-[calc(100vw-3rem)] max-w-[300px] sm:w-[280px] sm:max-w-none lg:w-[295px] shrink-0 snap-start flex flex-col bg-[#F8F6F2] border border-[#DED9CD] rounded-xs overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                {isAdminAuthenticated && isEditMode && (
                  <button
                    type="button"
                    data-admin-ui
                    aria-label={isVi ? `Xóa collection ${col.name}` : `Delete collection ${col.name}`}
                    className="absolute right-3 top-3 z-40 inline-flex items-center gap-1.5 rounded-xs bg-red-700 px-3 py-2 text-xs font-bold text-white shadow-lg hover:bg-red-800"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      if (window.confirm(isVi
                        ? `Xóa thẻ "${col.name}" khỏi trang chủ? Có thể khôi phục trong CMS.`
                        : `Remove "${col.name}" from the home page? You can restore it in the CMS.`)) {
                        hideHomeCollection(col.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    {isVi ? 'Xóa' : 'Delete'}
                  </button>
                )}
                {(() => {
                  const catalogCollection = collections.find((item) => item.id === col.targetCollection);
                  const cardName = catalogCollection
                    ? (isVi && catalogCollection.nameVi ? catalogCollection.nameVi : catalogCollection.name)
                    : (isVi ? col.nameVi : col.name);
                  const cardDescription = catalogCollection
                    ? (isVi && catalogCollection.descriptionVi ? catalogCollection.descriptionVi : catalogCollection.description)
                    : (isVi ? col.descriptionVi : col.description);

                  return (
                    <>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE4D9]">
                  {catalogCollection ? (
                    <InlineEditableImage
                      record="collection"
                      recordId={catalogCollection.id}
                      field="heroImage"
                      value={catalogCollection.heroImage}
                      alt={cardName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <img
                      src={col.image}
                      alt={col.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  )}
                  {col.badge && (
                    <div className="absolute top-3 right-3 bg-[#1C1A17]/90 backdrop-blur-xs text-white text-[10.5px] uppercase font-bold tracking-wider px-3 py-1 rounded-xs shadow-sm">
                      {isVi ? col.badgeVi : col.badge}
                    </div>
                  )}
                </div>

                {/* Card Info Box */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-sans text-[17px] sm:text-lg font-bold tracking-wider text-[#1C1A17] group-hover:text-[#9B522E] transition-colors uppercase">
                      {catalogCollection ? (
                        <InlineEditableText
                          record="collection"
                          recordId={col.targetCollection}
                          field={isVi ? 'nameVi' : 'name'}
                          value={cardName}
                          as="span"
                          label={isVi ? 'Tên collection tiếng Việt' : 'Collection name'}
                        />
                      ) : (
                        cardName
                      )}
                    </h4>
                    <p className="text-[13.5px] text-[#554C42] mt-1.5 leading-relaxed line-clamp-2">
                      {catalogCollection ? (
                        <InlineEditableText
                          record="collection"
                          recordId={col.targetCollection}
                          field={isVi ? 'descriptionVi' : 'description'}
                          value={cardDescription}
                          as="span"
                          multiline
                          label={isVi ? 'Mô tả collection tiếng Việt' : 'Collection description'}
                        />
                      ) : (
                        cardDescription
                      )}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#DED9CD] flex items-center justify-between text-[12.5px] font-bold text-[#9B522E] uppercase tracking-wider">
                    <span>{isVi ? 'Xem chi tiết bộ sưu tập' : 'View collection'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2]" />
                  </div>
                </div>
                    </>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION: FULL-WIDTH CINEMATIC FOREST VIDEO BANNER */}
      <section className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0D1510]">
        {/* Authentic loop video from jensenoutdoor.com */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={forestVideoRef}
            autoPlay
            loop
            muted={isForestVideoMuted}
            playsInline
            preload="auto"
            poster="/luma/scene-18.webp"
            className="w-full h-full object-cover object-center scale-101 transition-opacity duration-1000"
          >
            <source src="/home/home-sustainability.mp4" type="video/mp4" />
          </video>
          {/* Scrim Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/70 pointer-events-none" />
        </div>

        {/* Center Content Overlay */}
        <div className="relative z-10 text-center text-white px-5 py-16 sm:py-20 max-w-3xl mx-auto flex flex-col items-center">
          {/* Play Icon Button */}
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="group flex flex-col items-center gap-2 mb-4 sm:mb-5 cursor-pointer min-h-[80px]"
            aria-label="Play documentary video"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/25 backdrop-blur-md border-2 border-white/80 flex items-center justify-center text-white group-hover:bg-[#9B522E] group-hover:border-[#9B522E] group-hover:scale-108 transition-all shadow-2xl">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
            </div>
            <span className="text-[12px] sm:text-[13px] uppercase tracking-[0.22em] font-bold text-white group-hover:text-[#DED9CD] transition-colors">
              {isVi ? 'XEM PHIM TƯ LIỆU' : 'Watch The Film'}
            </span>
          </button>

          {/* Earth / Sustainability Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#737D5A] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#EFECE6]" />
            {isVi ? 'NỘI THẤT NGOÀI TRỜI' : 'OUTDOOR FURNITURE'}
          </span>

          {/* Big Bold Headline */}
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[0.06em] text-white leading-tight mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {isVi ? 'ĐỂ THỜI GIAN TRỞ THÀNH MỘT PHẦN CỦA THIẾT KẾ' : 'LET TIME BECOME PART OF THE DESIGN'}
          </h2>

          {/* Subtitle with Air Tone */}
          <p className="text-[13.5px] sm:text-base uppercase tracking-[0.14em] text-[#EFECE6] font-medium mb-6 max-w-xl leading-relaxed">
            {isVi ? 'THIẾT KẾ TINH TẾ, VẬT LIỆU BỀN BỈ' : 'REFINED DESIGN, MATERIALS MADE TO LAST'}
          </p>

          {/* Read Our Story Link */}
          <button
            onClick={() => onNavigate('story')}
            className="inline-flex items-center text-[13.5px] sm:text-base uppercase tracking-[0.16em] font-bold text-white hover:text-[#9B522E] underline underline-offset-8 cursor-pointer transition-colors min-h-[44px]"
          >
            {isVi ? 'KHÁM PHÁ CÂU CHUYỆN CỦA CHÚNG TÔI' : 'Discover Our Story'}
          </button>
        </div>

        {/* Video Controls (Play/Pause & Mute/Unmute) */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/25">
          <button
            onClick={toggleForestPlayback}
            className="text-white hover:text-[#9B522E] p-1.5 transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
            aria-label={isForestVideoPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isForestVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <div className="w-px h-3.5 bg-white/25" />
          <button
            onClick={toggleForestMute}
            className="text-white hover:text-[#9B522E] p-1.5 transition-colors cursor-pointer flex items-center gap-1.5 min-h-[32px]"
            aria-label={isForestVideoMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isForestVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="text-[11px] uppercase font-bold hidden sm:inline text-white/90">
              {isForestVideoMuted ? (isVi ? 'Tắt tiếng' : 'Muted') : (isVi ? 'Bật âm thanh' : 'Sound On')}
            </span>
          </button>
        </div>
      </section>

      {/* 4. SECTION: EXPLORE OUR CATEGORIES */}
      <section className="py-14 sm:py-20 lg:py-24 relative border-b border-[#DED9CD] bg-white">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto px-4 mb-8 sm:mb-12">
          <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.14em] text-[#1C1A17] uppercase">
            {isVi ? 'DANH MỤC SẢN PHẨM' : 'EXPLORE OUR CATEGORIES'}
          </h3>
          <p className="mt-3">
            <button
              onClick={() => onNavigate('furniture')}
              className="inline-flex items-center text-sm sm:text-base uppercase tracking-wider text-[#1C1A17] hover:text-[#9B522E] underline underline-offset-4 font-bold cursor-pointer transition-colors min-h-[40px]"
            >
              {isVi ? 'Xem tất cả sản phẩm' : 'Or see them all'}
            </button>
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group/track max-w-[1520px] mx-auto">
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollContainer(categoriesScrollRef, 'left')}
            className="hidden sm:flex absolute left-2 sm:left-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-[#1C1A17] border border-[#DED9CD] shadow-md hover:shadow-xl items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100"
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollContainer(categoriesScrollRef, 'right')}
            className="hidden sm:flex absolute right-2 sm:right-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-[#1C1A17] border border-[#DED9CD] shadow-md hover:shadow-xl items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100"
            aria-label="Next categories"
          >
            <ChevronRight className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Horizontal Scrolling Category Track */}
          <div
            ref={categoriesScrollRef}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scroll-smooth px-4 sm:px-14 pb-4 pt-1 no-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CATEGORIES_LIST.map((cat) => (
              <div
                key={cat.id}
                onClick={cat.route}
                className="w-[calc(100vw-3rem)] max-w-[300px] sm:w-[270px] sm:max-w-none lg:w-[285px] shrink-0 snap-start flex flex-col bg-[#F8F6F2] border border-[#DED9CD] rounded-xs overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                {/* Square Image Container */}
                <div className="relative aspect-square overflow-hidden bg-[#EAE4D9]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Top-Right Badge */}
                  <div className="absolute top-3 right-3 bg-[#1C1A17]/90 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-xs shadow-sm">
                    {cat.label}
                  </div>
                </div>

                {/* Card Info Box */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-sans text-[15px] sm:text-base font-bold tracking-wider text-[#1C1A17] group-hover:text-[#9B522E] transition-colors uppercase">
                      {isVi ? cat.titleVi : cat.title}
                    </h4>
                    <p className="text-[13px] text-[#554C42] mt-1.5 leading-relaxed">
                      {isVi ? cat.subtitleVi : cat.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#DED9CD] flex items-center justify-between text-[11.5px] font-bold text-[#9B522E] uppercase tracking-wider">
                    <span>{isVi ? 'Khám phá ngay' : 'Explore'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION: FULL-WIDTH LUXURY PATIO CATALOG BANNER */}
      <section className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#16120E]">
        {/* Authentic video loop from jensenoutdoor.com */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={catalogVideoRef}
            autoPlay
            loop
            muted={isCatalogVideoMuted}
            playsInline
            preload="auto"
            poster="https://www.jensenoutdoor.com/wp-content/uploads/2022/06/Sorrento-Canvas-Persimmon-Lifestyle1.jpg"
            className="w-full h-full object-cover object-center scale-101 transition-opacity duration-1000"
          >
            <source src="https://www.jensenoutdoor.com/wp-content/uploads/2023/01/2023Products-Homepage-5s.mp4" type="video/mp4" />
          </video>
          {/* Subtle Scrim for Contrast & Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/70 pointer-events-none" />
        </div>

        {/* Center Content Overlay */}
        <div className="relative z-10 text-center text-white px-5 py-16 sm:py-20 max-w-3xl mx-auto flex flex-col items-center">
          {/* Book Icon Button */}
          <button
            onClick={() => setIsLookbookModalOpen(true)}
            className="group flex flex-col items-center gap-2 mb-4 sm:mb-5 cursor-pointer min-h-[80px]"
            aria-label="View 2026 Season Catalog"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/25 backdrop-blur-md border-2 border-white/80 flex items-center justify-center text-white group-hover:bg-[#9B522E] group-hover:border-[#9B522E] group-hover:scale-108 transition-all shadow-2xl">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <span className="text-[12px] sm:text-[13px] uppercase tracking-[0.22em] font-bold text-white group-hover:text-[#DED9CD] transition-colors">
              {isVi ? 'LẬT MỞ CATALOG' : 'Open Lookbook'}
            </span>
          </button>

          {/* Heading */}
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[0.06em] text-white leading-tight mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {isVi ? 'CATALOG MÙA MỚI 2026' : 'THE 2026 SEASON CATALOG'}
          </h2>

          {/* Subtitle */}
          <p className="text-[14px] sm:text-base text-[#EFECE6] font-medium tracking-wide mb-6 max-w-xl leading-relaxed">
            {isVi
              ? 'Lật mở từng trang ấn phẩm mùa mới với những thiết kế ngoại thất gỗ Ipe đỉnh cao.'
              : 'Engage with the pages of our latest brochure.'}
          </p>

          {/* Action Link */}
          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center text-[13.5px] sm:text-base uppercase tracking-[0.16em] font-bold text-white hover:text-[#9B522E] underline underline-offset-8 cursor-pointer transition-colors min-h-[44px]"
          >
            {isVi ? 'XEM TẤT CẢ CATALOG' : 'SEE ALL CATALOGS'}
          </button>
        </div>

        {/* Video Controls (Play/Pause & Mute/Unmute) */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/25">
          <button
            onClick={toggleCatalogPlayback}
            className="text-white hover:text-[#9B522E] p-1.5 transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
            aria-label={isCatalogVideoPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isCatalogVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <div className="w-px h-3.5 bg-white/25" />
          <button
            onClick={toggleCatalogMute}
            className="text-white hover:text-[#9B522E] p-1.5 transition-colors cursor-pointer flex items-center gap-1.5 min-h-[32px]"
            aria-label={isCatalogVideoMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isCatalogVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="text-[11px] uppercase font-bold hidden sm:inline text-white/90">
              {isCatalogVideoMuted ? (isVi ? 'Tắt tiếng' : 'Muted') : (isVi ? 'Bật âm thanh' : 'Sound On')}
            </span>
          </button>
        </div>
      </section>

      {/* 6. SECTION: RESOURCES */}
      <section className="py-14 sm:py-24 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.14em] text-[#1C1A17] uppercase">
              {isVi ? 'TƯ LIỆU & DỊCH VỤ' : 'RESOURCES'}
            </h3>
            <p className="text-[14px] sm:text-base text-[#554C42] mt-2 font-medium">
              {isVi ? 'Tìm kiếm những dịch vụ và hỗ trợ quý khách cần.' : "Find what you're looking for."}
            </p>
          </div>

          {/* 3 Authentic Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Card 1: FIND A RETAILER */}
            <div
              onClick={() => onNavigate('how-to-buy')}
              className="group flex flex-col bg-white border border-[#DED9CD] rounded-xs overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE4D9]">
                <img
                  src="/uploads/resource-retailer.png"
                  alt="Find a Retailer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 bg-[#9B522E] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-xs shadow-xs">
                  {isVi ? 'CÁCH MUA HÀNG' : 'HOW TO BUY'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans text-[17px] sm:text-lg font-bold tracking-wider text-[#1C1A17] uppercase group-hover:text-[#9B522E] transition-colors">
                    {isVi ? 'TÌM ĐẠI LÝ BÁN LẺ' : 'FIND A RETAILER'}
                  </h4>
                  <p className="text-[13.5px] text-[#554C42] mt-1.5 leading-relaxed">
                    {isVi ? 'Mua sắm trực tiếp tại các showroom đối tác ⇁' : 'Shop in-store ⇁'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-[13px] font-bold text-[#9B522E] uppercase tracking-wider">
                  <span>{isVi ? 'Tìm kiếm cửa hàng gần bạn' : 'Locate stores'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2]" />
                </div>
              </div>
            </div>

            {/* Card 2: 3D SHOWROOM (WATER ACCENT) */}
            <div
              onClick={() => onNavigate('3d-showroom')}
              className="group flex flex-col bg-white border border-[#DED9CD] rounded-xs overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE4D9]">
                <img
                  src="/uploads/resource-showroom-3d.png"
                  alt="3D Showroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 bg-[#798E9D] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-xs shadow-xs">
                  {isVi ? 'TƯƠNG TÁC 3D' : 'INTERACTIVE 3D'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans text-[17px] sm:text-lg font-bold tracking-wider text-[#1C1A17] uppercase group-hover:text-[#798E9D] transition-colors">
                    {isVi ? 'SHOWROOM 3D THỰC TẾ ẢO' : '3D VIRTUAL SHOWROOM'}
                  </h4>
                  <p className="text-[13.5px] text-[#554C42] mt-1.5 leading-relaxed">
                    {isVi ? 'Tham quan trung tâm thiết kế tương tác 360° ⇁' : 'Tour our Atlanta design center ⇁'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-[13px] font-bold text-[#798E9D] uppercase tracking-wider">
                  <span>{isVi ? 'Khám phá không gian ảo 3D' : 'Enter 3D Tour'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2]" />
                </div>
              </div>
            </div>

            {/* Card 3: HELP CENTER (EARTH ACCENT) */}
            <div
              onClick={() => onNavigate('help-center')}
              className="group flex flex-col bg-white border border-[#DED9CD] rounded-xs overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE4D9]">
                <img
                  src="/uploads/resource-care.png"
                  alt="Help Center"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 bg-[#737D5A] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-xs shadow-xs">
                  {isVi ? 'BẢO DƯỠNG & HỖ TRỢ' : 'CARE & SUPPORT'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans text-[17px] sm:text-lg font-bold tracking-wider text-[#1C1A17] uppercase group-hover:text-[#737D5A] transition-colors">
                    {isVi ? 'TRUNG TÂM HỖ TRỢ' : 'HELP CENTER'}
                  </h4>
                  <p className="text-[13.5px] text-[#554C42] mt-1.5 leading-relaxed">
                    {isVi ? 'Hướng dẫn bảo quản và giải đáp thắc mắc ⇁' : 'What can we help you with today ⇁'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-[13px] font-bold text-[#737D5A] uppercase tracking-wider">
                  <span>{isVi ? 'Xem cẩm nang & hỏi đáp' : 'Visit Help Center'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modals */}
      <StoryVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onReadStory={() => onNavigate('story')}
      />

      <LookbookModal
        isOpen={isLookbookModalOpen}
        onClose={() => setIsLookbookModalOpen(false)}
        onExploreProducts={() => onNavigate('furniture')}
      />

      <CatalogDownloadModal
        isOpen={isCatalogDownloadOpen}
        onClose={() => setIsCatalogDownloadOpen(false)}
      />

      <VirtualShowroomModal
        isOpen={isVirtualShowroomOpen}
        onClose={() => setIsVirtualShowroomOpen(false)}
        onNavigateToShowrooms={() => onNavigate('showrooms')}
      />
    </div>
  );
};
