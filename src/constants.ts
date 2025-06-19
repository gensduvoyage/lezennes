/* vite only */
export const DEV = import.meta.env.DEV;

export const voteTypes = ['Pour', 'Contre'] as const;
true as AllValuesPresent<VoteType, typeof voteTypes>;
