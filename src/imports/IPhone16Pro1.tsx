import svgPaths from "./svg-a6cdtbew9j";
import imgUser from "figma:asset/dd51a8681595b8a38866d07abb324a31068eaf98.png";

function Logotipo() {
  return (
    <div className="h-[44px] relative shrink-0 w-[77.47px]" data-name="logotipo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 44">
        <g id="logotipo">
          <g id="path1">
            <path d={svgPaths.p1ee24300} fill="#CFFAFE" />
            <path clipRule="evenodd" d={svgPaths.p3a552b00} fill="#CFFAFE" fillRule="evenodd" />
          </g>
          <path d={svgPaths.paa02d00} fill="url(#paint0_linear_1_226)" id="path1_2" />
          <g id="path1_3">
            <path d={svgPaths.p92fd580} fill="#06B6D4" />
            <path d={svgPaths.p2f21ea00} fill="#06B6D4" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_226" x1="2.25445e-09" x2="53.1703" y1="28.8166" y2="28.8166">
            <stop stopColor="#06B6D4" />
            <stop offset="1" stopColor="#CFFAFE" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[24px] top-[64px] w-[354px]" data-name="Header">
      <Logotipo />
      <div className="relative shrink-0 size-[48px]" data-name="User">
        <img alt="" className="block max-w-none size-full" height="48" src={imgUser} width="48" />
      </div>
    </div>
  );
}

function MapMarkerAlt() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="map-marker-alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_223)" id="map-marker-alt">
          <path d={svgPaths.p208c0580} fill="var(--fill-0, #FBBF24)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_223">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-center flex flex-wrap gap-[8px] items-center justify-end left-[24px] top-[162px] w-[354px]">
      <MapMarkerAlt />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-gray-800 w-[330px]">Rua Abc, 123 - Bairro</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-gray-800 w-[330px]">Você está aqui</p>
    </div>
  );
}

function TitleAndLocal() {
  return (
    <div className="absolute contents left-[24px] top-[136px]" data-name="Title and Local">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[24px] not-italic text-[20px] text-gray-800 text-nowrap top-[136px] whitespace-pre">Hábitos diários</p>
      <Frame2 />
    </div>
  );
}

function Walking() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="walking">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_220)" id="walking">
          <path d={svgPaths.p3fdc1bf0} fill="var(--fill-0, #1F2937)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_220">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Walking />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-gray-800 text-nowrap whitespace-pre">Caminhada</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-amber-400 box-border content-stretch flex items-center justify-center px-[8px] py-[3px] relative rounded-[100px] shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[10px] text-gray-800 text-nowrap whitespace-pre">5 km</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[141px]">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-800 w-[96.461px]">
        <p className="leading-[normal]">Meta diária</p>
      </div>
      <Frame4 />
    </div>
  );
}

function Group() {
  return (
    <div className="font-['Inter:Light',sans-serif] font-light grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[normal] not-italic place-items-start relative shrink-0 text-[12px] text-gray-800">
      <p className="[grid-area:1_/_1] ml-0 mt-0 relative w-[69.953px]">-- : --</p>
      <p className="[grid-area:1_/_1] ml-[141px] mt-0 relative text-right translate-x-[-100%] w-[71.047px]">-- km</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-cyan-500 box-border content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[141px]" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-gray-800 text-nowrap whitespace-pre">Iniciar</p>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-purple-100 box-border content-start flex flex-wrap gap-[4px] h-[132px] items-start p-[12px] relative rounded-[8px] shrink-0 w-[165px]" data-name="Card">
      <Frame />
      <Frame1 />
      <Group />
      <Button />
    </div>
  );
}

function Water() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="water">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="water">
          <path d={svgPaths.p3272da40} fill="var(--fill-0, #1F2937)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Water />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-gray-800 text-nowrap whitespace-pre">Hidratação</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-amber-400 box-border content-stretch flex items-center justify-center px-[8px] py-[3px] relative rounded-[100px] shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[10px] text-gray-800 text-nowrap whitespace-pre">3 litros</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[141px]">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-800 w-[96.461px]">
        <p className="leading-[normal]">Meta diária</p>
      </div>
      <Frame5 />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[grid-area:1_/_1] font-['Inter:Light',sans-serif] font-light leading-[normal] ml-0 mt-0 not-italic relative text-[12px] text-gray-800 w-[69.953px]">-- : --</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-cyan-500 box-border content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[141px]" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-gray-800 text-nowrap whitespace-pre">Iniciar</p>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-purple-100 box-border content-start flex flex-wrap gap-[4px] h-[132px] items-start p-[12px] relative rounded-[8px] shrink-0 w-[165px]" data-name="Card">
      <Frame3 />
      <Frame6 />
      <Group1 />
      <Button1 />
    </div>
  );
}

function Running() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="running">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="running">
          <path d={svgPaths.p3fa02500} fill="var(--fill-0, #1F2937)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Running />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-gray-800 text-nowrap whitespace-pre">Exercício</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-amber-400 box-border content-stretch flex items-center justify-center px-[8px] py-[3px] relative rounded-[100px] shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[10px] text-gray-800 text-nowrap whitespace-pre">1 hora</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[141px]">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-800 w-[96.461px]">
        <p className="leading-[normal]">Meta diária</p>
      </div>
      <Frame8 />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[grid-area:1_/_1] font-['Inter:Light',sans-serif] font-light leading-[normal] ml-0 mt-0 not-italic relative text-[12px] text-gray-800 w-[69.953px]">-- : --</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-cyan-500 box-border content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[141px]" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-gray-800 text-nowrap whitespace-pre">Iniciar</p>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-purple-100 box-border content-start flex flex-wrap gap-[4px] h-[132px] items-start p-[12px] relative rounded-[8px] shrink-0 w-[165px]" data-name="Card">
      <Frame7 />
      <Frame9 />
      <Group2 />
      <Button2 />
    </div>
  );
}

function Bed() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="bed">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon â¢ bed">
          <path d={svgPaths.p1b277280} fill="var(--fill-0, #1F2937)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Bed />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-gray-800 text-nowrap whitespace-pre">Sono</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-amber-400 box-border content-stretch flex items-center justify-center px-[8px] py-[3px] relative rounded-[100px] shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[10px] text-gray-800 text-nowrap whitespace-pre">8 horas</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[141px]">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-800 w-[96.461px]">
        <p className="leading-[normal]">Meta diária</p>
      </div>
      <Frame11 />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[grid-area:1_/_1] font-['Inter:Light',sans-serif] font-light leading-[normal] ml-0 mt-0 not-italic relative text-[12px] text-gray-800 w-[69.953px]">-- : --</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-cyan-500 box-border content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[141px]" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-gray-800 text-nowrap whitespace-pre">Iniciar</p>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-purple-100 box-border content-start flex flex-wrap gap-[4px] h-[132px] items-start p-[12px] relative rounded-[8px] shrink-0 w-[165px]" data-name="Card">
      <Frame10 />
      <Frame12 />
      <Group3 />
      <Button3 />
    </div>
  );
}

function Cards() {
  return (
    <div className="absolute content-center flex flex-wrap gap-[24px] items-center left-[24px] top-[234px] w-[354px]" data-name="Cards">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

export default function IPhone16Pro() {
  return (
    <div className="bg-neutral-100 relative size-full" data-name="iPhone 16 Pro - 1">
      <Header />
      <TitleAndLocal />
      <Cards />
    </div>
  );
}