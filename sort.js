;(function(global, factory) {
	// ����amd��cmd��д��
	// ��������ʽ�� cmd ? cmd : amd ? amd : global || window
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : 
	typeof define === 'function' && define.amd ? define(factory) :
	(global.PAS = factory());
})(this, (function(){
	// �ж��Ƿ�����
	function isArray(arr) {
		return typeof Array.isArray === 'function' ? 
			          Array.isArray(arr) : 
					  Object.prototype.toString.call(arr) === '[object Array]';
	}
	
	// ��������Ԫ��
	function swap(v1, v2, context) {
		[context[v1], context[v2]] = [context[v2], context[v1]];
		return void 0;
	}
	
	// ð������
	function bubble(arr) {
		let len = arr.length;
		for(let i = 0; i < len; i++){
			for(let j = 0; j < len - 1 - i; j++){
				if (arr[j] > arr[j + 1]) {
					swap(j, j + 1, arr)
				}
			}
		}
		return arr;
	}
	
	// ��������
	function insert(arr) {
		let len = arr.length;
		let pIndex, current;  // ǰһ��Ԫ�ص���������ǰԪ�ص�ֵ
		for(let i = 1; i < len; i++){
			pIndex = i - 1;
			current = arr[i];
			
			// ���ΰѵ�ǰԪ�غ�ǰ���Ԫ�ؽ��бȽ�
			while(pIndex >= 0 && arr[pIndex] > current) {
				// �ȵ�ǰ��Ԫ�ش������һλ
				arr[pIndex + 1] = arr[pIndex];
				pIndex--;
			}
			// ���뵱ǰԪ�ص����ʵ�λ��
			arr[pIndex + 1] = current;
		}
		return arr;
	}
	
	// �������� -- ����������ı�ԭ����
	function quick(arr) {
		let len = arr.length;
		
		if(len < 2) {
			return arr;
		}
		
		let middleIndex = Math.floor(len / 2); // �м�Ԫ�ص�����ֵ
		let baseValue = arr.splice(middleIndex, 1); // ��׼ֵ
		 
		let left = [];  // ����С�ڻ�׼ֵԪ��
		let right = []; // ������ڻ���ڻ�׼ֵԪ��
		
		for(let i = 0; i < arr.length; i++) {
			if(arr[i] < baseValue) {
				left.push(arr[i]);
			} else {
				right.push(arr[i]);
			}
		}
		return quick(left).concat(baseValue, quick(right));
	}
	
	// ѡ������
	function selection(arr) {
		let len = arr.length;
		let minIndex = 0; // ���ڱ�����Сֵ������
		
		for(let i = 0; i < len - 1; i++) {
			minIndex = i;
			// ���������Ԫ�غ͵�ǰ��Ϊ����Сֵ���бȽ�
			for(let j = i + 1; j < len; j++) {
				if(arr[minIndex] > arr[j]){
					// ����Ϊ����СֵС ��������
					minIndex = j;
				}
			}
			// �ҵ���Сֵ�͵�ǰֵ����
			if(minIndex !== i) {
				swap(minIndex, i, arr);
			}
		}
		return arr;
	}
	
	// �鲢����
	function merge(arr) {
		let len = arr.length;
		if(len < 2) {
			return arr;
		}
		let middleIndex = Math.floor(len / 2); // ��ȡ�м�Ԫ�ص�����
		let left = arr.slice(0, middleIndex);  // ��ȡ��벿�ֵ�Ԫ��
		let right = arr.slice(middleIndex);    // ��ȡ�Ұ벿�ֵ�Ԫ��
		
		let merges = function(left, right) {
			// ������������
			let result = [];
			
			while(left.length && right.length) {
				if(left[0] < right[0]) {
					result.push(left.shift())
				} else {
					result.push(right.shift())
				}
			}
			
			// ������߻���Ԫ��
			while(left.length) {
				result.push(left.shift());
			}
			
			// ����Ұ�߻���Ԫ��
			while(right.length){
				result.push(right.shift());
			}
			
			return result;
		}
		
		return merges(merge(left), merge(right));
	}
	
	// ϣ������
	function shell(arr) {
		let len = arr.length,
			temp,
			gap = 1;
    
		while(gap < len / 3) {
			gap = gap * 3 + 1;
		}

		for(gap; gap > 0; gap = Math.floor(gap / 3)){
			for(let i = gap; i < len; i++){
				temp = arr[i];
				for(var j = i - gap; j >= 0 && arr[j] > temp; j-=gap){
					arr[j + gap] = arr[j];
				}
				arr[j + gap] = temp;
			}
		}
		return arr;		
	}
	
	// ������
	function heap(arr) {
		let len = arr.length;
		
		let heapify = function(
				arr  // �����������
				, x  // Ԫ�ص��±�
				, len // ����ĳ���
				) {
			let l = 2 * x + 1;
			let r = 2 * x + 2;
			let largest = x;
			
			if(l < len && arr[l] > arr[largest]) {
				largest = l;
			}
			
			if(r < len && arr[r] > arr[largest]) {
				largest = r;
			}
			
			if(largest !== x) {
				swap(x, largest, arr);
				heapify(arr, largest, len);
			}
		}
		
	    for(let i = Math.floor(len / 2); i >= 0; i--){
			heapify(arr, i, len);
		}
		
		for(let i = len - 1; i >= 1; i--) {
			swap(0, i, arr);
			heapify(arr, 0, --len);
		}
		return arr;
	}
	
	// ��������
	function radix(arr) {
		const SIZE = 10;
		let len = arr.length;
		let buckets = []; 
		let max = Math.max.apply(null, arr);  // �����е����ֵ
		let maxLength = String(max).length;   // ������ֵĳ���
		
		// ����ѭ����Ͱ�е�������������
		for(let i = 0; i < SIZE; i++) {
			buckets[i] = [];
		}
		
		// ����ѭ��--�����ݽ��в���--��Ͱ����Ϊ
		for(let i = 0; i < maxLength; i++) {
			// �ڶ���ѭ���ǽ����ݰ��ո�λ�����з���
			for(let j = 0; j < len; j++) {
				let value = String(arr[j]);
				// �жϳ���--���з���
				if(value.length >= i + 1){
					let num = Number(value[value.length - 1 - i]); // ���εĴ��ҵ����ȡ��������
					//�����Ӧ��Ͱ��
					buckets[num].push(arr[j]);
				} else {
					// ���Ȳ������ʱ�򣬾ͷ��ڵ�һ��Ͱ��
				    buckets[0].push(arr[i]);
				}
			}
			// ��ԭ�������
			 arr.length = 0;
			 
			 //���ѭ��������ȡ���������õ������ŵ�ԭ������
			 for(let j = 0; j < SIZE; j++) {
				 // ��ȡ����Ͱ�ĳ���
				 let l = buckets[j].length;
				 // ѭ��ȡ������
				 for(let k = 0; k < l; k++){
					 arr.push(buckets[j][k]);
				 }
				 // ����Ӧ��Ͱ��գ������´δ������
				 buckets[j] = [];
			 }
		}
		return arr;
	}
	
	// Ͱ���� -- ���ı�ԭ����
	function bucket(arr, size = 5) {
		let len = arr.length;
		if(len < 2) {
			return arr;
		}
		
		// ��ȡ���ֵ����Сֵ
		const max = Math.max.apply(null, arr);
		const min = Math.min.apply(null, arr);

		// �����Ͱ������  size�ǽؾ�
		const bucketCount = Math.floor((max - min) / size) + 1;
		// ����Ͱ�ĸ�������ָ�����ȵ�����
		const buckets = new Array(bucketCount);
		// ��ÿ��Ͱ������Ͱ����ȥ
		for(let i = 0; i < bucketCount; i++){
			buckets[i] = [];
		}
		// ����ӳ�亯�������ݷ��䵽����Ͱ����ȥ
		for(let i = 0; i < arr.length; i++){
			// ��size��1
			let index = Math.floor((arr[i] - min) / size);
			buckets[index].push(arr[i]);
		}
		//��ÿ��Ͱ�е����ݽ�������--�����ڿ��������㷨
		for(let i = 0; i < buckets.length; i++){
			buckets[i] = quick(buckets[i]);
		}
		
		// flatten����--�е㲻����ǻὫԭ�����е�String�ı�ΪNumber
		return buckets.join(',').split(',').filter(v => v !== '').map(Number);  
	}
	
	// ��������
	function count(arr) {
		let index = 0;
		let len = arr.length;
		let min = Math.min.apply(null, arr); // ��Сֵ
		let max = Math.max.apply(null, arr); // ���ֵ
		let result = []; // �������

		// �������������0
		for(let i = min; i <= max; i++) {
			result[i] = 0;
		}
		// �Ѹ��������ж�Ӧ��Ԫ�ؼ�����һ
		for(let i = 0; i < len; i++) {
			result[arr[i]]++;
		}
		// ���ռ�����Ԫ�ؽ�������
		for(let i = min; i <= max; i++){
			while(result[i]-- > 0){
				arr[index++] = i;
			}
		}
		return arr;
	}
	
	const PAS = {};
	
	[
	 bubble,
	 insert,
	 quick,
	 selection,
	 merge,
	 shell,
	 heap,
	 radix,
	 bucket,
	 count
	].forEach(function(func) {
		let name = func.name;
		//���Ӳ����װ���жϲ����ǲ�������
		Object.defineProperty(PAS, name, {
			get: function(){
				return function (args) {
					if(!isArray(args)) {
						throw new Error('the arguments of PAS.' + name + ' must be Array');
					}
					return func.call(null, args);
				}
			},
			configurable: true
		})
		
		// �������ԭ������ӷ���
		Object.defineProperty(Array.prototype, name, {
			get: function () {
				    var vm = this;
					return function() {
						return func.call(vm, vm);
					}
				},
			configurable: true
		})
	})
	
	return PAS;
}))