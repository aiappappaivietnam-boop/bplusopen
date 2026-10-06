import React from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { InlineEditableContent } from '../components/InlineEditableContent';
import { InlineEditableImage } from '../components/InlineEditableImage';

interface StoryPageProps {
  onNavigate: (page: PageId, extra?: { category?: string; collection?: string }) => void;
  onOpenCatalogModal?: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  return (
    <div className="bg-white text-[#1C1A17] selection:bg-[#5C3822] selection:text-white">
      {/* About Us cover: a lightweight editable visual replaces the remote autoplay video. */}
      <section className="relative w-full overflow-hidden bg-[#141414]">
        <div className="relative aspect-[16/7] min-h-[280px] w-full overflow-hidden bg-[#252522] sm:min-h-[380px] lg:min-h-[520px]">
          <InlineEditableImage
            record="collection"
            recordId="story-hero"
            field="heroImage"
            value="/about-us/about-us-hero.jpg"
            alt="B+OPEN outdoor living space"
            className="h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/15" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-7 sm:px-10 sm:pb-10 lg:px-16 lg:pb-14">
            <p className="max-w-3xl text-xs font-bold uppercase tracking-[0.24em] text-white/80 sm:text-sm">B+OPEN · ABOUT US</p>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="border-b border-[#EAE6E1] bg-white px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <InlineEditableContent
            contentKey="about.mission.label"
            value={isVi ? "SỨ MỆNH CỦA B+OPEN" : "B+OPEN'S MISSION"}
            as="div"
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1C1A17] sm:text-xs"
            label="About Us mission label"
          />
          <InlineEditableContent
            contentKey="about.mission.title"
            value={isVi ? 'MANG ĐẾN CHO KHÔNG GIAN NGOÀI TRỜI CỦA BẠN NỘI THẤT GỖ BỀN VỮNG CHẤT LƯỢNG CAO NHẤT THẾ GIỚI.' : 'BRINGING THE WORLD’S HIGHEST-QUALITY SUSTAINABLE WOOD FURNITURE TO YOUR OUTDOOR SPACE.'}
            as="h1"
            multiline
            className="mx-auto mt-4 max-w-3xl text-2xl font-bold uppercase leading-[1.25] tracking-tight text-[#1C1A17] sm:text-3xl md:text-4xl lg:text-[38px]"
            label="About Us mission statement"
          />
        </div>
      </section>

      {/* Three editorial blocks shown in the supplied About Us references. */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-[#E5E2DC] border border-[#E5E2DC] shadow-xs">
            {/* Sustainability */}
            <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1B2A1B] md:aspect-auto md:min-h-[420px]">
                <InlineEditableImage
                  record="collection"
                  recordId="story-sustainability"
                  field="heroImage"
                  value="/about-us/about-us-sustainability.png"
                  alt="B+OPEN surrounded by a forest canopy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center bg-[#ECEBE6] p-8 text-left sm:p-12 lg:p-16">
                <InlineEditableContent
                  contentKey="about.sustainability.label"
                  value={isVi ? 'Phát triển bền vững (Sustainability)' : 'Sustainability'}
                  as="div"
                  className="mb-2 text-xs font-bold tracking-wide text-[#1C1A17]"
                  label="About Us sustainability label"
                />
                <InlineEditableContent
                  contentKey="about.sustainability.title"
                  value={isVi ? 'THIẾT KẾ CHO GIÁ TRỊ LÂU DÀI' : 'DESIGNED FOR LASTING VALUE'}
                  as="h2"
                  multiline
                  className="mb-4 text-xl font-bold uppercase leading-snug tracking-wide text-[#1C1A17] sm:text-2xl lg:text-[26px]"
                  label="About Us sustainability title"
                />
                <InlineEditableContent
                  contentKey="about.sustainability.description"
                  value={isVi
                    ? 'B+Open hướng đến những thiết kế có tính ứng dụng cao, phù hợp với nhu cầu sử dụng thực tế và không phụ thuộc vào xu hướng ngắn hạn. Sản phẩm được phát triển với nhiều tư duy về công năng và thẩm mỹ trong thời gian dài.'
                    : 'B+Open creates highly functional designs for real use, made to remain relevant beyond short-lived trends. Each product is developed with long-term thinking about both performance and aesthetics.'}
                  as="p"
                  multiline
                  className="mb-6 text-xs font-normal leading-relaxed text-[#1C1A17]/85 sm:text-sm"
                  label="About Us sustainability description"
                />
                <InlineEditableContent
                  contentKey="about.sustainability.link"
                  value={isVi ? 'Cam kết bền vững của chúng tôi' : 'Our Sustainability Promise'}
                  as="button"
                  className="inline-block w-fit cursor-pointer text-left text-xs font-bold text-[#1C1A17] underline underline-offset-4 transition-opacity hover:opacity-75 sm:text-sm"
                  label="About Us sustainability link"
                  onClick={() => onNavigate('sustainability')}
                />
              </div>
            </div>

            {/* Design */}
            <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
              <div className="order-2 flex flex-col justify-center bg-[#ECEBE6] p-8 text-left md:order-1 sm:p-12 lg:p-16">
                <InlineEditableContent
                  contentKey="about.design.label"
                  value={isVi ? 'Thiết kế (Design)' : 'Design'}
                  as="div"
                  className="mb-2 text-xs font-bold tracking-wide text-[#1C1A17]"
                  label="About Us design label"
                />
                <InlineEditableContent
                  contentKey="about.design.title"
                  value={isVi ? 'LỰA CHỌN VẬT LIỆU PHÙ HỢP' : 'CHOOSING THE RIGHT MATERIALS'}
                  as="h2"
                  multiline
                  className="mb-4 text-xl font-bold uppercase leading-snug tracking-wide text-[#1C1A17] sm:text-2xl lg:text-[26px]"
                  label="About Us design title"
                />
                <InlineEditableContent
                  contentKey="about.design.description"
                  value={isVi
                    ? 'Mỗi vật liệu được cân nhắc dựa trên đặc tính sử dụng, độ bền và khả năng đáp ứng điều kiện ngoài trời. Việc lựa chọn đúng vật liệu ngay từ đầu giúp sản phẩm ổn định hơn trong quá trình sử dụng và hạn chế nhu cầu thay mới.'
                    : 'Every material is considered for its performance, durability and ability to meet outdoor conditions. Choosing the right material from the beginning helps products perform consistently and reduces the need for replacement.'}
                  as="p"
                  multiline
                  className="mb-6 text-xs font-normal leading-relaxed text-[#1C1A17]/85 sm:text-sm"
                  label="About Us design description"
                />
                <InlineEditableContent
                  contentKey="about.design.link"
                  value={isVi ? 'Khám phá quy trình thiết kế' : 'Explore our Design Process'}
                  as="button"
                  className="inline-block w-fit cursor-pointer text-left text-xs font-bold text-[#1C1A17] underline underline-offset-4 transition-opacity hover:opacity-75 sm:text-sm"
                  label="About Us design link"
                  onClick={() => onNavigate('design')}
                />
              </div>
              <div className="relative order-1 aspect-[4/3] overflow-hidden bg-[#3A4736] md:order-2 md:aspect-auto md:min-h-[420px]">
                <InlineEditableImage
                  record="collection"
                  recordId="story-design"
                  field="heroImage"
                  value="/about-us/about-us-design-new.png"
                  alt="A woman enjoying an outdoor lounge chair"
                  className="h-full w-full object-cover object-center transition-transform duration-700"
                />
              </div>
            </div>

            {/* Materials */}
            <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#D7C5B2] md:aspect-auto md:min-h-[420px]">
                <InlineEditableImage
                  record="collection"
                  recordId="story-materials"
                  field="heroImage"
                  value="/about-us/about-us-materials-new.png"
                  alt="A hand working natural wood"
                  className="h-full w-full object-cover object-center transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col justify-center bg-[#ECEBE6] p-8 text-left sm:p-12 lg:p-16">
                <InlineEditableContent
                  contentKey="about.materials.label"
                  value={isVi ? 'Chất liệu (Materials)' : 'Materials'}
                  as="div"
                  className="mb-2 text-xs font-bold tracking-wide text-[#1C1A17]"
                  label="About Us materials label"
                />
                <InlineEditableContent
                  contentKey="about.materials.title"
                  value={isVi ? 'TỐI ƯU TRONG QUÁ TRÌNH SẢN XUẤT' : 'OPTIMIZED THROUGH PRODUCTION'}
                  as="h2"
                  multiline
                  className="mb-4 text-xl font-bold uppercase leading-snug tracking-wide text-[#1C1A17] sm:text-2xl lg:text-[26px]"
                  label="About Us materials title"
                />
                <InlineEditableContent
                  contentKey="about.materials.description"
                  value={isVi
                    ? 'B+Open chú trọng kiểm soát các bước từ phát triển sản phẩm đến gia công và hoàn thiện, nhằm sử dụng nguồn lực hiệu quả và hạn chế phát sinh không cần thiết trong quá trình sản xuất. Tư duy tối ưu được đưa vào cả thiết kế, kỹ thuật và quy trình thực hiện.'
                    : 'B+Open focuses on every stage from product development through fabrication and finishing, using resources efficiently and avoiding unnecessary waste. Optimization is built into the design, engineering and production process.'}
                  as="p"
                  multiline
                  className="mb-6 text-xs font-normal leading-relaxed text-[#1C1A17]/85 sm:text-sm"
                  label="About Us materials description"
                />
                <InlineEditableContent
                  contentKey="about.materials.link"
                  value={isVi ? 'Tìm hiểu về vật liệu' : 'Learn About Our Materials'}
                  as="button"
                  className="inline-block w-fit cursor-pointer text-left text-xs font-bold text-[#1C1A17] underline underline-offset-4 transition-opacity hover:opacity-75 sm:text-sm"
                  label="About Us materials link"
                  onClick={() => onNavigate('materials')}
                />
              </div>
            </div>

            {/* Product lifecycle */}
            <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
              <div className="order-2 flex flex-col justify-center bg-[#ECEBE6] p-8 text-left md:order-1 sm:p-12 lg:p-16">
                <InlineEditableContent contentKey="about.lifecycle.label" value={isVi ? 'Vòng đời sản phẩm' : 'Product lifecycle'} as="div" className="mb-2 text-xs font-bold tracking-wide text-[#1C1A17]" label="About Us lifecycle label" />
                <InlineEditableContent contentKey="about.lifecycle.title" value={isVi ? 'HƯỚNG ĐẾN VÒNG ĐỜI SẢN PHẨM DÀI HƠN' : 'TOWARD A LONGER PRODUCT LIFE'} as="h2" multiline className="mb-4 text-xl font-bold uppercase leading-snug tracking-wide text-[#1C1A17] sm:text-2xl lg:text-[26px]" label="About Us lifecycle title" />
                <InlineEditableContent contentKey="about.lifecycle.description" value={isVi ? 'Chúng tôi quan tâm đến giá trị của sản phẩm trong suốt quá trình sử dụng, từ độ bền đến khả năng bảo trì và duy trì chất lượng theo thời gian. Mục tiêu là tạo ra những sản phẩm có thể đáp ứng nhu cầu trong nhiều năm.' : 'We consider a product’s value throughout its life, from durability and maintenance to its ability to retain quality over time. The goal is to create products that meet real needs for many years.'} as="p" multiline className="mb-6 text-xs font-normal leading-relaxed text-[#1C1A17]/85 sm:text-sm" label="About Us lifecycle description" />
              </div>
              <div className="relative order-1 aspect-[4/3] overflow-hidden bg-[#D7C5B2] md:order-2 md:aspect-auto md:min-h-[420px]">
                <InlineEditableImage record="collection" recordId="story-lifecycle" field="heroImage" value="/about-us/about-us-technique-new.png" alt="Crafted outdoor furniture detail" className="h-full w-full object-cover object-center transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
