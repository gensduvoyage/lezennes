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
		id?: number;
		type: VoteType;
		remarks?: string;
	}
	interface VoteWithIP extends Vote {
		IP: string;
	}

	type API_myIp = {ip: string};
	// type API_canVote = {canVote: boolean};
	type API_findVote = {vote: VoteWithIP | undefined};

	interface ApiRoutes {
		['my-ip']: API_myIp;
		// ['can-vote']: API_canVote;
		['find-vote']: API_findVote;
		['vote']: {};
	}
}

export {};
