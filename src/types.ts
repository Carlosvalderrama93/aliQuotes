type Product = {
  id: string;
  url: string;
  image: string;
  title: string;
  hsCode: string;
  materials: string;
  moq: number;
  samplePrice: {
    value: number;
    quantity: number;
    shipment: { type: string; value: number };
  };
  packaging: { type: string; weight: number };
  privateLabel: { valid: boolean; moq: number };
  price: { value: number; incoterm: string; quantity: number };
  volume: { height: number; length: number; width: number };
  weight: number;
  carga: Carga;
};

type Carga = {
  // net weight vs gross weight
  box: {
    units: number;
    packaging: { type: string; weight: number };
    volume: {
      total: { net: number; gross: number };
      sizes: { height: number; width: number; lenght: number };
    };
    weight: { net: number; gross: number };
  };
  shipment: {
    frecuency: number;
    time: number;
    expense: {
      internationalFreight: number;
      Deconsolidation: number;
      Handling: number;
      portEntrance: number;
    };
  };
  notes: string;
  totalUnits: number;
};

type InternationalFreight = {};

type VolumetricWeight = {
  // Tonelada Metrica mayor a 1000kg o 1mt cubico
  // Carga suelta LCL --> Mercancia de varios importadores (Consolidación)
};

type PriceCost = {
  product: Product;
  packing: string;
  paymentTerms: string;
  incoterms: string;
  leadtime: string | number;
  dispatchPort: string;
  supplier: string;
};

type TariffClassification = {
  product: string;
  tariffSubheading: string;
  iva: number;
  LienGeneral: string;
  LienAgreement: string;
  tradeRegime: string;
  documentsAndSupports: string;
};

// HS Code - Partida arancelaria
//

// #12 8.10
// # gravemen 15
// # Iva
// ML --> $70000
// Partial --> $46556
// partial + env --> $46556 + $13000
// %ML --> $74445
