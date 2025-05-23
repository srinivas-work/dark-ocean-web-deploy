export type EarthCoreScaleDataInfoType = {
  depth: number;
  service: string;
  coreTexture: string;
};

export type ServiceItemGroupType = {
  groupTitle: string;
  groupLength: number;
  backgroundColor: string;
};

export type AboutUsCardType = {
  id: string;
  title: string;
  path: string;
  itemGroup?: ServiceItemGroupType[];
  urlGroup?: string[];
  length?: number;
  description: string;
  imgLink: string;
  backgroundColor: string;
};

export type TimelineItemType = {
  year: number | string;
  heading: string;
  desc: string;
  imgLink?: string;
};

type PressCategory = "News" | "Events" | "Collections" | "Gallery";
export type PressItemType = {
  imgLink: string;
  postDate: string;
  category: PressCategory;
  title: string;
};

export type PartnerDataItemType = {
  id: number;
  logo: string;
  name: string;
  partnershipType: string;
  desc: string;
};

export type PlaceItemType = {
  place: string;
  phone: string;
  fax?: string;
  address: string;
  shortAddress?: string;
};

export type JobItemType = {
  title: string;
  location:
    | "Darkocean, Doha, Qatar"
    | "Darkocean Geostar, Abu Dhabi, UAE"
    | "Darkocean Marine Ltd., UK"
    | "Darkocean Marine Pvt. Ltd., India";
  category: "Front Desk" | "HR" | "IT";
  validity?: string;
  link: string;
};
