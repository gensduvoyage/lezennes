import {ReactiveController, state} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import {confirm} from './confirm.js';
import {FormBuilder} from './forms/FormBuilder.js';

@saveToLocalStorage('gensduvoyage:store')
export class AppStore extends ReactiveController {
	@state() voteType: VoteType | undefined = undefined;
	@state() remarks: string = '';
	@state() voted = false;

	constructor() {}

	canVote() {
		const hash = window.location.hash;
		if (hash.length === 1) {
			return false;
		}
		if (this.voted === true) {
			return false;
		}
		return true;
	}

	@confirm({
		headline: 'Êtes-vous sûr de continuer ?',
		content:
			"Vous ne pouvez voter qu'une seule fois et une fois votre vote pris en compte vous ne pourrez pas le modifier !",
	})
	submit() {
		console.log('test');
	}
}

const store = new AppStore();
const F = new FormBuilder(store);
export {F, store};
