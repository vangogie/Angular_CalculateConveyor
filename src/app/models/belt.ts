import { BeltType } from "./belt-type";

export interface Belt {
    id?: number;
    name: string;
    cost: number;
    beltType: BeltType;
}
