'use client';
import Image from 'next/image';
import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from '@/components/ui/progressive-carousel';

const items = [
  {
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1170&auto=format&fit=crop",
    title: 'Coleção Clássica',
    desc: 'Laços atemporais em cores neutras e suaves, ideais para o dia a dia e momentos especiais.',
    sliderName: 'classica',
  },
  {
    img: "https://images.unsplash.com/photo-1558000143-a621dbb80b7c?q=80&w=1170&auto=format&fit=crop",
    title: 'Laços de Veludo',
    desc: 'A elegância do veludo em laços sofisticados, perfeitos para celebrações de outono e inverno.',
    sliderName: 'veludo',
  },
  {
    img: "https://images.unsplash.com/photo-1602143431631-419b4ef3b3a6?q=80&w=1170&auto=format&fit=crop",
    title: 'Estampa Floral',
    desc: 'Delicadeza e alegria em estampas exclusivas que trazem a essência da primavera.',
    sliderName: 'floral',
  },
  {
    img: "https://images.unsplash.com/photo-1596073434685-5df18cc18928?q=80&w=1170&auto=format&fit=crop",
    title: 'Edição Limitada',
    desc: 'Peças sazonais com aplicações especiais e detalhes únicos feitos totalmente à mão.',
    sliderName: 'limitada',
  },
];

export function CollectionsCarousel() {
  return (
    <section id="colecoes" className="py-24 bg-background relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Nossas <span className="text-primary italic font-['Playfair_Display']">Coleções</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubra a magia de cada detalhe em nossas linhas exclusivas pensadas para sua pequena.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <ProgressSlider vertical={false} activeSlider='classica'>
            <SliderContent>
              {items.map((item, index) => (
                <SliderWrapper key={index} value={item.sliderName}>
                  <Image
                    className='rounded-2xl md:rounded-[2rem] h-[500px] md:h-[600px] w-full object-cover shadow-2xl'
                    src={item.img}
                    width={1900}
                    height={1080}
                    alt={item.title}
                  />
                </SliderWrapper>
              ))}
            </SliderContent>

            <SliderBtnGroup className='absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] text-black bg-white/75 backdrop-blur-xl overflow-hidden grid grid-cols-2 md:grid-cols-4 rounded-xl md:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40'>
              {items.map((item, index) => (
                <SliderBtn
                  key={index}
                  value={item.sliderName}
                  className='text-left cursor-pointer p-3 md:p-5 border-r border-black/5 last:border-r-0 hover:bg-white/40 transition-colors'
                  progressBarClass='bg-primary/20 h-full'
                >
                  <h3 className='relative px-3 py-1 rounded-full w-fit bg-primary text-primary-foreground mb-2 text-[10px] md:text-xs font-bold tracking-wider uppercase'>
                    {item.title}
                  </h3>
                  <p className='text-xs md:text-sm font-medium line-clamp-2 text-black/80 leading-relaxed'>
                    {item.desc}
                  </p>
                </SliderBtn>
              ))}
            </SliderBtnGroup>
          </ProgressSlider>
        </div>
      </div>
    </section>
  );
}
