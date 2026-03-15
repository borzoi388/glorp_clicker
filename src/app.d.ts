// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare type Game = {
		score: number;
		shop: ShopItem[];
		persecond: number;
		perclick: number;
		multperclick: number;
		highScore: number;
	}
	declare type ShopItem = {
		name: string;
		icon: string;
		variety: string;
		value: number;
		price: number;
		description: string;
		hasPurchased?: boolean;
	}
	
}

export {};
