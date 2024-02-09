import inquirer from "inquirer";

import { basicInfoPrompt, type BasicInfoType } from "./basicInfo.js";
import { createProduct } from "../../dataFeatures.js";
import sampleProductPrompt from "./sample.js";
import variationsPrompt from "./variation.js";
import moreInfoPrompt from "./moreInfo.js";
import pricePrompt from "./price.js";

import type { PriceType } from "./price.js";
import type { SampleType } from "./sample.js";
import type { MoreInfoType } from "./moreInfo.js";
import type { VariationsType } from "./variation.js";

export type QuestionPromptType = {
  type: string;
  name: string;
  message: string;
  validate?(answer: string): string | true;
  default?: String | Number | Boolean | [] | Function;
};

export type Product = {
  id?: string;
  basic: BasicInfoType;
  moreInfo?: MoreInfoType;
  sample?: SampleType;
  variations?: VariationsType;
  price?: PriceType;
};

export default async function promptAddProducts(quantity = 1): Promise<void> {
  const basic: { basic: BasicInfoType } = await basicInfoPrompt();
  const moreInfo: { moreInfo: MoreInfoType } = await moreInfoPrompt();
  const sample: { sample: SampleType } = await sampleProductPrompt();
  const variations: { variations: VariationsType } = await variationsPrompt();
  const price: { price: PriceType } = await pricePrompt();

  const product: Product = {
    ...basic,
    ...moreInfo,
    ...sample,
    ...variations,
    ...price,
  };

  createProduct([product]);
}
