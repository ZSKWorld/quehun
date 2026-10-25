function quickSort1(arr: number[], left: number, right: number) {
	if (left >= right) return;
	const pivot = arr[right];
	let il = left - 1;
	for (let ir = left; ir < right; ir++) {
		if (arr[ir] < pivot) {
			il++;
			const temp = arr[il];
			arr[il] = arr[ir];
			arr[ir] = temp;
		}
	}
	const pivotIndex = il + 1;
	const temp = arr[pivotIndex];
	arr[pivotIndex] = arr[right];
	arr[right] = temp;
	quickSort1(arr, left, il);
	quickSort1(arr, pivotIndex + 1, right);
}

export function quickSort(arr: number[]) {
	quickSort1(arr, 0, arr.length - 1);
}