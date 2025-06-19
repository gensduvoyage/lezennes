import {Rest} from '@vdegenne/mini-rest';

class AppAPI extends Rest<ApiRoutes> {
	async myIP() {
		const {json} = await this.get('my-ip');
		return (await json()).ip;
	}

	async findVote() {
		const {json} = await this.get('find-vote');
		return (await json()).vote;
	}

	vote(vote: Vote) {
		return this.post('vote', vote);
	}
}

export const API = new AppAPI('https://vdegenne.com:41352/api');
