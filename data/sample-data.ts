import { UserRoles } from "@/constants/DefaultValues";
import { ModelProps, UserProps } from "./PropTypes";

export const Users = <UserProps[]>[
  {
    userID: "31c25d8b-ac10-4a50-99eb-82348de841d3",
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    username: "jondoe",
    emailID: "jon.doe@test.com",
    phone: "+11234567890",
    countryCode: "US",
    createdAt: "2025-03-22T15:23:07.8Z",
    modifiedAt: "2025-04-05T18:59:13.906Z",
    role: UserRoles.USER,
  },
  {
    userID: "06ae85e5-2ee4-40ff-93cb-c81321bd7fe6",
    firstName: "Matt",
    lastName: "Smith",
    fullName: "Matt Smith",
    username: "msmith",
    emailID: "msmith@test.com",
    phone: "+18882223336",
    countryCode: "AU",
    createdAt: "2025-04-19T09:13:50.39Z",
    modifiedAt: "2025-04-19T09:13:50.39Z",
    role: UserRoles.ADMIN,
  },
];

export const Models = <ModelProps[]>[
  {
    modelID: "47649a6d-efe0-45b1-bd07-2a6956f4844f",
    modelName: "pickachu1",
    createdBy: "31c25d8b-ac10-4a50-99eb-82348de841d3",
    createdAt: "2025-03-22T15:29:12.308Z",
    modifiedAt: "2025-03-31T09:08:52.41Z",
  },
  {
    modelID: "99cd7008-b2b2-455b-a8b5-acae8a9cd46e",
    modelName: "bulbasaur1",
    createdBy: "31c25d8b-ac10-4a50-99eb-82348de841d3",
    createdAt: "2025-03-31T09:06:17.353Z",
    modifiedAt: "2025-03-31T09:06:17.353Z",
  },
  {
    modelID: "40040ade-b0ad-4a5f-9a5e-9d954cea034f",
    modelName: "omnyx1",
    createdBy: "31c25d8b-ac10-4a50-99eb-82348de841d3",
    createdAt: "2025-03-31T09:10:12.331Z",
    modifiedAt: "2025-03-31T09:10:12.331Z",
  },
  {
    modelID: "57734bfb-aa5d-481c-8859-d3b984e7a446",
    modelName: "squirtle1",
    createdBy: "31c25d8b-ac10-4a50-99eb-82348de841d3",
    createdAt: "2025-03-31T09:11:24.549Z",
    modifiedAt: "2025-03-31T09:11:24.549Z",
  },
  {
    modelID: "91e2e8f2-cf7c-4c7f-a3b0-b5299e8ee355",
    modelName: "abra1",
    createdBy: "31c25d8b-ac10-4a50-99eb-82348de841d3",
    createdAt: "2025-03-31T09:18:14.802Z",
    modifiedAt: "2025-03-31T09:18:14.802Z",
  },
];
