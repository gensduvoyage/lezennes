declare global {
	type AllKeysPresent<T, U extends readonly (keyof T)[]> =
		Exclude<keyof T, U[number]> extends never
			? true
			: ['❌ Missing keys', Exclude<keyof T, U[number]>];

	type AllValuesPresent<T, U extends readonly T[]> =
		Exclude<T, U[number]> extends never
			? true
			: ['❌ Missing values', Exclude<T, U[number]>];

	type VoteType = 'Pour' | 'Contre';
	interface Vote {
		id: number;
		type: VoteType;
		remarks?: string;
	}
	interface VoteWithIP extends Vote {
		IP: string;
	}

	interface ApiRoutes {
		['my-ip']: {ip: string};
		['vote']: {};
	}
}

export {};
