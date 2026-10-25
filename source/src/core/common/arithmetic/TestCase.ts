import { mergeSort } from "./MergeSort";
import { quickSort } from "./QuickSort";


function randomArray(size: number, max: number) {
	const arr = new Array(size);
	for (let i = 0; i < size; i++)
		arr[i] = Math.floor(Math.random() * max);
	return arr;
}

function checkArraySorted(arr: number[]) {
	for (let i = 1; i < arr.length; i++)
		if (arr[i] < arr[i - 1]) return false;
	return true;
}

export class TestCase {
	static test() {
		this.testSort(quickSort, "quickSort");
		this.testSort(mergeSort, "mergeSort");
	}

	private static testSort(sortFunc: (arr: number[]) => void, mark: string) {
		for (let i = 0; i < 10; i++) {
			const arr = randomArray(10, 100);
			console.log("before " + mark + " :", arr.join());
			sortFunc(arr);
			console.log("after " + mark + " :", arr.join(), checkArraySorted(arr));
		}
	}
}