export type BillRecipient = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  billId: string;
  billSent: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Bill = {
  id: string;
  invoiceNumber: string;
  requestId: string;
  generateByUserId: string;
  generateByUserName: string;
  pdfGenerated: boolean;
  pdfUrl?: string;
  totalAmountDue: number;
  isConsolidated: boolean;
  startDate: Date;
  endDate: Date;
  recipientType: string;
  scope: string;
  areaId?: string;
  areaName?: string;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
  billRecipients?: BillRecipient[];
};

export type BillBreakdown = {
  id: string;
  areaId: string;
  areaName: string;
  createdAt: Date;
  updatedAt: Date;
  billId: string;
  meterId: string;
  location: string;
  meterNumber: string;
  lastReadDate: Date;
  firstReadDate: Date;
  firstReadKwh: string;
  lastReadKwh: string;
  totalConsumption: string;
  tariff: string;
  totalAmount: string;
}
