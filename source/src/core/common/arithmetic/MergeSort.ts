function mergeArr(arr: number[], left: number, mid: number, right: number) {
	const tempArr = new Array(right - left + 1);
	let i = left, j = mid + 1, k = 0;
	while (i <= mid && j <= right) {
		if (arr[i] < arr[j]) tempArr[k++] = arr[i++];
		else if (arr[i] > arr[j]) tempArr[k++] = arr[j++];
		else {
			tempArr[k++] = arr[i++];
			tempArr[k++] = arr[j++];
		}
	}

	while (i <= mid) tempArr[k++] = arr[i++];
	while (j <= right) tempArr[k++] = arr[j++];

	for (i = 0; i < tempArr.length; i++) {
		arr[left + i] = tempArr[i];
	}
}

function mergeSort1(arr: number[], left: number, right: number) {
	if (left >= right) return;

	const mid = Math.floor((left + right) / 2);
	mergeSort1(arr, left, mid);
	mergeSort1(arr, mid + 1, right);
	mergeArr(arr, left, mid, right);
}

export function mergeSort(arr: number[]) {
	mergeSort1(arr, 0, arr.length - 1);
}