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
            value={isVi ? 'MANG ĐẾN KHÔNG GIAN NGOÀI TRỜI CỦA BẠN MỘT BỘ SẢN PHẨM BỀN VỮNG' : 'BRINGING A SUSTAINABLE COLLECTION TO YOUR OUTDOOR SPACE'}
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
                  value={isVi ? 'LỰA CHỌN BỀN BỈ CHO GIÁ TRỊ DÀI LÂU' : 'DURABILITY THAT CREATES LASTING VALUE'}
                  as="h2"
                  multiline
                  className="mb-4 text-xl font-bold uppercase leading-snug tracking-wide text-[#1C1A17] sm:text-2xl lg:text-[26px]"
                  label="About Us sustainability title"
                />
                <InlineEditableContent
                  contentKey="about.sustainability.description"
                  value={isVi
                    ? 'B+Open là thương hiệu nội thất ngoài trời theo đuổi thiết kế chất lượng, bền bỉ và phù hợp với nhu cầu sử dụng lâu dài. Cùng khám phá định hướng của chúng tôi trong việc tạo nên những sản phẩm có giá trị bền vững theo thời gian.'
                    : 'B+Open is an outdoor furniture brand focused on quality, durability and designs made for long-term use. Discover our approach to creating products with lasting value over time.'}
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
                  value={isVi ? 'THIẾT KẾ BẮT ĐẦU TỪ NHU CẦU THỰC TẾ' : 'DESIGN STARTS WITH REAL NEEDS'}
                  as="h2"
                  multiline
                  className="mb-4 text-xl font-bold uppercase leading-snug tracking-wide text-[#1C1A17] sm:text-2xl lg:text-[26px]"
                  label="About Us design title"
                />
                <InlineEditableContent
                  contentKey="about.design.description"
                  value={isVi
                    ? 'B+Open phát triển thiết kế dựa trên nhu cầu sử dụng, công năng và đặc thù của nội thất ngoài trời. Mỗi sản phẩm được nghiên cứu, thử nghiệm và hoàn thiện qua nhiều bước, kết hợp giữa tư duy thiết kế và kỹ thuật sản xuất để đạt sự cân bằng giữa hình thức, công năng và độ bền.'
                    : 'B+Open develops designs around real use, function and the specific demands of outdoor furniture. Each product is researched, tested and refined through multiple steps, balancing design thinking with production expertise for form, function and durability.'}
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
                  value="/about-us/about-us-design.png"
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
                  value="/about-us/about-us-materials.png"
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
                  value={isVi ? 'VẬT LIỆU QUYẾT ĐỊNH CHẤT LƯỢNG' : 'MATERIALS DEFINE QUALITY'}
                  as="h2"
                  multiline
                  className="mb-4 text-xl font-bold uppercase leading-snug tracking-wide text-[#1C1A17] sm:text-2xl lg:text-[26px]"
                  label="About Us materials title"
                />
                <InlineEditableContent
                  contentKey="about.materials.description"
                  value={isVi
                    ? 'B+Open lựa chọn những vật liệu phù hợp với đặc thù sử dụng ngoài trời, từ gỗ teak tự nhiên đến thép sơn tĩnh điện và các vật liệu chuyên dụng khác. Mỗi vật liệu được cân nhắc về độ bền, tính ổn định và khả năng kết hợp để đáp ứng yêu cầu của từng thiết kế.'
                    : 'B+Open selects materials suited to outdoor use, from natural teak to powder-coated steel and other specialist materials. Each material is considered for durability, stability and how well it works within each design.'}
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
          </div>
        </div>
      </section>
    </div>
  );
};
