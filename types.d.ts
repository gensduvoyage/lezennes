declare global {
	type VoteType = 'Pour' | 'Contre';
	interface Vote {
		type: VoteType;
		remarks?: string;
	}
	interface VoteWithIP extends Vote {
		IP: string;
	}
}

export {};
