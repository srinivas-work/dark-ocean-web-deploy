import {
  AboutUsCardType,
  EarthCoreScaleDataInfoType,
  JobItemType,
  PartnerDataItemType,
  PlaceItemType,
  PressItemType,
  TimelineItemType,
} from "../types/customDataTypes";

const navLinks = [
  { path: "/about", label: "About Us" },
  { path: "/services", label: "Products & Services" },
  { path: "/press-release", label: "Press Release" },
  { path: "/contact", label: "Contact" },
  { path: "/career", label: "Career" },
  { path: "/cq-web", label: "Timelessly etched by Crayon & Quill" },
];

const serviceList = [
  "Hydrography",
  "Geophysics",
  "2D/3D Seismic Survey",
  "Positioning (Surface & Subsea)",
  "ROV & Tooling",
  "AI & ML",
  "Robotics",
  "Geotechnical Solutions",
  "Vessel Management",
];

const jobsList: JobItemType[] = [
  {
    title: "Front Office Assistant",
    location: "Darkocean Marine Ltd., UK",
    category: "Front Desk",
    validity: "09 May",
    link: "https://in.linkedin.com/company/darkoceanmarine",
  },
  {
    title: "Human Resource Manager",
    location: "Darkocean, Doha, Qatar",
    category: "HR",
    validity: "05 Feb",
    link: "https://in.linkedin.com/company/darkoceanmarine",
  },
  {
    title: "Wordpress Developer",
    location: "Darkocean, Doha, Qatar",
    category: "IT",
    validity: "05 Feb",
    link: "https://in.linkedin.com/company/darkoceanmarine",
  },
];

//const servicesList = []

const missionData = [
  {
    id: "01",
    title: "Mission",
    description:
      "We strive to deliver innovative solutions that empower our customers to achieve excellence and efficiency in their operations.",
  },
  {
    id: "02",
    title: "Vision",
    description:
      "Our vision is to lead the industry with cutting-edge technology and sustainable solutions, ensuring long-term success for our partners.",
  },
  {
    id: "03",
    title: "Impact",
    description:
      "We are committed to making a positive impact by continuously improving our services, fostering innovation, and driving industry advancements.",
  },
];

const partnersData: PartnerDataItemType[] = [
  {
    id: 1,
    name: "EPIO",
    logo: "https://cdn.prod.website-files.com/65cf80f1c23738abc38826aa/660ed8a05fc08054ad62791b_q-refinish.webp",
    partnershipType: "Type of Partnership",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati praesentium soluta ipsum eligendi, magnam inventore Obcaecati praesentium soluta",
  },
  {
    id: 2,
    name: "Color Factory",
    logo: "https://cdn.prod.website-files.com/65cf80f1c23738abc38826aa/660ed95bf2a4f4bfde274d65_spray-one.webp",
    partnershipType: "Type of Partnership",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati praesentium soluta ipsum eligendi, magnam inventore Obcaecati praesentium soluta",
  },
  {
    id: 3,
    name: "Color Market",
    logo: "https://cdn.prod.website-files.com/65cf80f1c23738abc38826aa/660ed8a05fc08054ad62791b_q-refinish.webp",
    partnershipType: "Type of Partnership",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati praesentium soluta ipsum eligendi, magnam inventore Obcaecati praesentium soluta",
  },
  {
    id: 4,
    name: "The Thirty7",
    logo: "https://cdn.prod.website-files.com/65cf80f1c23738abc38826aa/660ed95bf2a4f4bfde274d65_spray-one.webp",
    partnershipType: "Type of Partnership",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati praesentium soluta ipsum eligendi, magnam inventore Obcaecati praesentium soluta",
  },
  {
    id: 5,
    name: "Spray One",
    logo: "https://cdn.prod.website-files.com/65cf80f1c23738abc38826aa/660ed8a05fc08054ad62791b_q-refinish.webp",
    partnershipType: "Type of Partnership",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati praesentium soluta ipsum eligendi, magnam inventore Obcaecati praesentium soluta",
  },
  {
    id: 6,
    name: "Color Factory",
    logo: "https://cdn.prod.website-files.com/65cf80f1c23738abc38826aa/660ed95bf2a4f4bfde274d65_spray-one.webp",
    partnershipType: "Type of Partnership",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati praesentium soluta ipsum eligendi, magnam inventore Obcaecati praesentium soluta",
  },
  {
    id: 7,
    name: "Color Market",
    logo: "https://cdn.prod.website-files.com/65cf80f1c23738abc38826aa/660ed8a05fc08054ad62791b_q-refinish.webp",
    partnershipType: "Type of Partnership",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati praesentium soluta ipsum eligendi, magnam inventore Obcaecati praesentium soluta",
  },
  {
    id: 8,
    name: "The Thirty7",
    logo: "https://cdn.prod.website-files.com/65cf80f1c23738abc38826aa/660ed95bf2a4f4bfde274d65_spray-one.webp",
    partnershipType: "Type of Partnership",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati praesentium soluta ipsum eligendi, magnam inventore Obcaecati praesentium soluta",
  },
];

const homepageData = [
  {
    id: 0,
    subHeading: "Welcome to DarkOcean",
    heading: "Empowering maritime excellence for energy and beyond…",
    desc: "We are at the forefront of maritime excellence, pioneering innovative solutions, and delivering unparalleled services to our clients. Darkocean represents the union of expertise, dedication, and a shared vision for maritime success.",
  },
  {
    id: 1,
    subHeading: "Satellite Delivered Bathymetry",
    heading: "We specialize in Satellite derived bathymetry (SDB)",
    desc: "A relatively new technique in hydrography that allows to create nautical charts and bathymetric maps of shallow waters and coastal regions.",
  },
  {
    id: 2,
    subHeading: "Maritime Charters",
    heading: "Economically efficient and reliable maritime charters",
    desc: "We offer latest technologies in subsea robotics to enable expedited subsea surveys and monitoring. Intelligently Unmanned Surveying with multi-beam echo sounders for obtaining bathymetric data.",
  },
  {
    id: 3,
    subHeading: "Under Surface Bathymetry",
    heading:
      "Reliable and efficient subsea positioning, observation and intervention tools",
    desc: "Bridging the gap between Conventional manned data acquisition and completely unmanned operations, without losing capabilities.",
  },
  {
    id: 4,
    subHeading: "Subsea Positioning",
    heading:
      "We offer world-class electric ROVs, Positioning Equipment and machine vision gears",
    desc: "Reliable and efficient subsea positioning, observation and intervention tools.",
  },
  {
    id: 5,
    subHeading: "Underwater Robotic Solutions",
    heading:
      "Cutting-edge subsea robotics to enable expedited subsea surveys and monitoring",
    desc: "Reliable and efficient subsea positioning, observation and intervention tools.",
  },
  {
    id: 6,
    subHeading: "Geotechnical Solutions",
    heading:
      "High res (HR), Ultra high res. (UHR) and Deep seismic re-processing",
    desc: "We offer solutions tailored to customer needs by integrating conventional survey solutions and AI/ML.",
  },
  {
    id: 7,
    subHeading: "Geotechnical Investigations",
    heading: "Geotechnical Investigations (UHR) and Deep seismic re-processing",
    desc: "We offer solutions tailored to customer needs by integrating conventional survey solutions and AI/ML.",
  },
  {
    id: 8,
    subHeading: "High Resolution Seismic",
    heading:
      "High Resolution Seismic res. (UHR) and Deep seismic re-processing",
    desc: "We offer solutions tailored to customer needs by integrating conventional survey solutions and AI/ML.",
  },
  {
    id: 9,
    subHeading: "Ultra High Res. Seismic",
    heading:
      "Ultra High Res. Seismic res. (UHR) and Deep seismic re-processing",
    desc: "We offer solutions tailored to customer needs by integrating conventional survey solutions and AI/ML.",
  },
  {
    id: 10,
    subHeading: "Deep Seismic Re-processing",
    heading:
      "Deep Seismic Re-processing res. (UHR) and Deep seismic re-processing",
    desc: "We offer solutions tailored to customer needs by integrating conventional survey solutions and AI/ML.",
  },
];

const earthCoreScaleData: EarthCoreScaleDataInfoType[] = [
  {
    depth: 200,
    service: "Geotechnical Investigations",
    coreTexture: "/textures/underwater/earth_core/sedimentary_rock_tex1.jpg",
  },
  {
    depth: 600,
    service: "High Resolution Seismic",
    coreTexture: "/textures/underwater/earth_core/sedimentary_rock_tex2.jpg",
  },
  {
    depth: 1000,
    service: "Ultra High Res. Seismic",
    coreTexture: "/textures/underwater/earth_core/sedimentary_rock_tex3.jpg",
  },
  {
    depth: 1000,
    service: "Deep Seismic Re-processing",
    coreTexture: "/textures/underwater/earth_core/sedimentary_rock_tex4.jpg",
  },
];

const aboutUsCardList: AboutUsCardType[] = [
  {
    id: "logo-design",
    title: "About Us",
    path: "/assets/services-section/logo/logo-design",
    length: 7,
    description:
      "Your logo is your face to the world. We design logos that's unique, memorable, and captures the essence of your brand. Think of it as your superhero symbol, ready to conquer the market.",
    imgLink: "/assets/images/pic-1.jpg",
    backgroundColor: "#B3C9D9",
  },
  {
    id: "brochure-design",
    title: "Our Goals",
    path: "/assets/services-section/logo/logo-design",
    length: 8,
    description:
      "Forget boring pamphlets. We'll craft stunning, impactful brochures that tell your story in a way that resonates with your audience. Like a love letter to your brand, designed to win hearts and minds.",
    imgLink: "/assets/images/pic-2.jpg",
    backgroundColor: "#80A7C0",
  },
  {
    id: "social-media",
    title: "Our Approach",
    path: "/assets/services-section/social/social-media",
    urlGroup: [
      "https://www.instagram.com/barsanahotelkolkata/",
      "https://www.instagram.com/bajlacollection/",
      "https://www.instagram.com/primeluxeslg",
      "https://www.instagram.com/berliadevelopers",
      "https://www.instagram.com/azure_glitz",
    ],
    length: 5,
    description:
      "At our core, we specialize in social media management. Through meticulous strategy, we tailor content to your brand's voice, fostering connections with your audience & elevating your brand.",
    imgLink: "/assets/images/pic-3.jpg",
    backgroundColor: "#4D86A7",
  },
  {
    id: "printable-media",
    title: "Our Mission",
    path: "/assets/services-section/printable",
    itemGroup: [
      { groupTitle: "hoarding", groupLength: 6, backgroundColor: "#b4d6f5" },
      { groupTitle: "invites", groupLength: 6, backgroundColor: "#eeece9" },
      { groupTitle: "menu", groupLength: 3, backgroundColor: "#f3d7b8" },
      {
        groupTitle: "newspaper-ad",
        groupLength: 3,
        backgroundColor: "#ccb39d",
      },
      { groupTitle: "standee", groupLength: 3, backgroundColor: "#dae9f8" },
      {
        groupTitle: "visiting-card",
        groupLength: 3,
        backgroundColor: "#ebebeb",
      },
    ],
    description:
      "Dive into the realm of printable media. With precision and creativity, we craft tangible assets that capture attention, reflect your brand essence, and leave a lasting impression.",
    imgLink: "/assets/images/pic-4.jpg",
    backgroundColor: "#25668D",
  },
  {
    id: "website-development",
    title: "Our Vision",
    path: "/assets/services-section/web/website",
    length: 3,
    urlGroup: [
      "https://coloursuraksha.com/",
      "https://mkgroupslg.com/",
      "https://panchnaigroup.com/",
    ],
    description:
      "Your website is your online home. We'll create a user-friendly, visually stunning site that converts visitors into fans, showcasing your awesomeness.",
    imgLink: "/assets/images/pic-1.jpg",
    backgroundColor: "#004771",
  },
  {
    id: "production-design",
    title: "Our Values",
    path: "/assets/services-section/production/production-design",
    length: 6,
    description:
      "We craft captivating narratives and stunning visuals to ensure your brand shines. Whether showcasing luxury real estate or tantalizing cuisine, we guarantee an unforgettable presence.",
    imgLink: "/assets/images/pic-2.jpg",
    backgroundColor: "#00284F",
  },
];
const timelineData: TimelineItemType[] = [
  {
    year: 2022,
    heading: "Our heritage",
    desc: "In early 2022, the team that later founded Dark Ocean began working with first clients in public and commercial transport. Within two years, capabilities were expanded to include railway transportation. Gradually, we covered the general industrial sector.",
  },
  {
    year: 2023,
    heading: "Optimization through innovation",
    desc: "In 2023, we began manufacturing our own paint and coating products and equipment.",
  },
  {
    year: 2024,
    heading: "Time for growth",
    desc: "Our key achievement was to integrate high-level color applications and top-coat materials into the industrial sector. Previously, it was a common practice only in automotive refinishing. Multipurpose color mixing systems and factories were developed.",
  },
];

const sustainabilityData: TimelineItemType[] = [
  {
    year: "01",
    heading: "Ocean Conservation",
    desc: "In early 2022, the team that later founded Dark Ocean began working with first clients in public and commercial transport. Within two years, capabilities were expanded to include railway transportation. Gradually, we covered the general industrial sector.",
    imgLink: "/img/sustainability/pic1.jpg",
  },
  {
    year: "02",
    heading: "Resilient Infrastructure",
    desc: "In 2023, we began manufacturing our own paint and coating products and equipment.",
    imgLink: "/img/sustainability/pic2.jpg",
  },
  {
    year: "03",
    heading: "Biodiversity Reservation",
    desc: "Our key achievement was to integrate high-level color applications and top-coat materials into the industrial sector. Previously, it was a common practice only in automotive refinishing. Multipurpose color mixing systems and factories were developed.",
    imgLink: "/img/sustainability/pic3.jpg",
  },
];

const categoryList = ["All", "News", "Events", "Collections", "Gallery"];
const pressReleaseList: PressItemType[] = [
  {
    imgLink: "/img/press-release/Rectangle-1.jpg",
    postDate: "4 years",
    category: "News",
    title:
      "Darkocean has taken delivery of two Heavy Work Class Triton XLS ROVs",
  },
  {
    imgLink: "/img/press-release/Rectangle-2.jpg",
    postDate: "3 months",
    category: "Events",
    title:
      "🌍 Darkocean at ADIPEC 2024: Advancing AI in Offshore Seismic Data Processing 🌊🤖",
  },
  {
    imgLink: "/img/press-release/Rectangle-3.jpg",
    postDate: "2 years",
    category: "Collections",
    title: "Our work shows real results from a wide range of clients. #2",
  },
  {
    imgLink: "/img/press-release/Rectangle-4.jpg",
    postDate: "2 months",
    category: "Gallery",
    title: "Our work shows real results from a wide range of clients. #3",
  },
  {
    imgLink: "/img/press-release/Rectangle-1.jpg",
    postDate: "4 years",
    category: "News",
    title:
      "Darkocean has taken delivery of two Heavy Work Class Triton XLS ROVs",
  },
  {
    imgLink: "/img/press-release/Rectangle-2.jpg",
    postDate: "3 months",
    category: "Events",
    title:
      "🌍 Darkocean at ADIPEC 2024: Advancing AI in Offshore Seismic Data Processing 🌊🤖",
  },
  {
    imgLink: "/img/press-release/Rectangle-5.jpg",
    postDate: "3 years",
    category: "Gallery",
    title: "Our work shows real results from a wide range of clients. #4",
  },
  {
    imgLink: "/img/press-release/Rectangle-4.jpg",
    postDate: "2 months",
    category: "Gallery",
    title: "Our work shows real results from a wide range of clients. #3",
  },
];

const jobCategoryList = ["All", "Front Desk", "HR", "IT"];

const placeList: PlaceItemType[] = [
  {
    place: "Qatar",
    phone: "+974 4442 6003",
    fax: "+974 4441 7003",
    address:
      "Darkocean, Office 9, Ground Floor, Building 2, Financial Square, Doha",
    shortAddress: "Darkocean, Doha, Qatar",
  },
  {
    place: "United Arab Emirates",
    phone: "+971 55542 8299",
    address: "Darkocean Geostar, Abu Dhabi, UAE",
  },
  {
    place: "United Kingdom",
    phone: "+44 7810 805096",
    address: "Darkocean Marine Ltd., UK",
  },
  {
    place: "India",
    phone: "+91 98929 62440",
    address: "Darkocean Marine Pvt. Ltd., India",
  },
];

export {
  categoryList,
  earthCoreScaleData,
  homepageData,
  missionData,
  navLinks,
  partnersData,
  placeList,
  pressReleaseList,
  serviceList,
  sustainabilityData,
  timelineData,
  aboutUsCardList,
  jobsList,
  jobCategoryList,
};
