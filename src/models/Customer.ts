import { CustomerStatus, RefillStatus } from "../constants";


export default interface Customer {
  pointValue: number;
  status: CustomerStatus;
  refillStatus: RefillStatus;
  order: string | null;
}
