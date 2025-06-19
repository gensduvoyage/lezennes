import {Rest} from '@vdegenne/mini-rest';

class AppAPI extends Rest<ApiRoutes> {
	async myIP() {
		const {json} = await this.get('my-ip');
		return (await json()).ip;
	}

	vote(vote: Vote) {
		this.post('vote', vote);
	}
}

export const API = new AppAPI('https://vdegenne.com:41352/api');
