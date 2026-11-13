export type GameStationId =
  | 'WELCOME'
  | 'CUSTOMER_1_ORDER'
  | 'CUSTOMER_1_DECORATE'
  | 'QUALITY_CHECK'
  | 'CUSTOMER_1_DELIVER'
  | 'CUSTOMER_2_ORDER'
  | 'CUSTOMER_2_DECORATE'
  | 'CUSTOMER_2_DELIVER'
  | 'CUSTOMER_3_ORDER'
  | 'CUSTOMER_3_DECORATE'
  | 'CUSTOMER_3_DELIVER'
  | 'CELEBRATION';

export type FruitId =
  | 'apple'
  | 'banana'
  | 'strawberry'
  | 'mango'
  | 'watermelon'
  | 'orange'
  | 'pineapple'
  | 'blueberry';

export type JamFlavor = 'strawberry' | 'chocolate' | 'maple' | 'blueberry' | 'none';

export interface FruitItem {
  id: FruitId;
  name: string;
  color: string;
  bgLight: string;
  borderColor: string;
  shapeDescription: string;
  iconSymbol?: string;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  characterImage: string;
  title: string;
  dialogue: string;
  audioText: string;
  requiredFruits: FruitId[];
  feedbackAccept: string;
  feedbackDecorateSuccess: string;
  feedbackCompleted: string;
}
