import { CountryNameAndCodeList, DeviceSizes } from "@/constants/DefaultValues";
import { useMediaQuery } from "react-responsive";

export const getPhoneCode = (phoneStr: string) => {
  let phone = phoneStr.split(" ");
  return phone.length == 2 ? phone[0] : "Unavailable";
};

export const getCountryNameFromCode = (code: string) => {
  let countryName = CountryNameAndCodeList.find(
    (country) => country.code === code
  );
  return countryName ? countryName.name : "Unknown";
};

export const getCountryCodeFromName = (name: string) => {
  let countryCode = CountryNameAndCodeList.find(
    (country) => country.name === name
  );
  return countryCode ? countryCode.code : "Unknown";
};

export const isXtraLargeDevice = () =>
  useMediaQuery({
    minDeviceWidth: DeviceSizes.xtraLarge.minWidth,
  });

export const isLargeDevice = () =>
  useMediaQuery({
    minDeviceWidth: DeviceSizes.large.minWidth,
  });

export const isMediumDevice = () =>
  useMediaQuery({
    minDeviceWidth: DeviceSizes.medium.minWidth,
  });

export const isSmallDevice = () =>
  useMediaQuery({
    minDeviceWidth: DeviceSizes.small.minWidth,
  });
