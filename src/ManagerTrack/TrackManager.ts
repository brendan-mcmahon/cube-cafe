
interface Step {
    id: number;
    next: number[];
}

const steps: Step[] = [
    { id: 1, next: [2] },
    { id: 2, next: [3] },
    { id: 3, next: [4] },
    { id: 4, next: [5, 14] },
    { id: 5, next: [6] },
    { id: 6, next: [7] },
    { id: 7, next: [8] },
    { id: 8, next: [9, 15] },
    { id: 9, next: [10] },
    { id: 10, next: [11] },
    { id: 11, next: [12] },
    { id: 12, next: [13] }
]