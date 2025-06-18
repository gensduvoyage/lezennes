import {Rest} from '@vdegenne/mini-rest';

class AppAPI extends Rest {
	async myIP() {
		const {json} = await this.get('my-ip', 'json');
		return json.ip;
	}

	vote(vote: Vote) {
		this.post();
	}
}
export const API = new AppAPI('http://54.36.99.179:41351/api');
